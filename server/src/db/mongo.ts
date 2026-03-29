import { Db, MongoClient } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!uri || !dbName) {
    console.warn("[MongoDB] Missing MONGODB_URI or MONGODB_DB_NAME. Mongo integration is disabled.");
    return null;
  }

  if (db) {
    return db;
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);

    console.log(`[MongoDB] Connected to '${dbName}'.`);
    return db;
  } catch (error) {
    console.warn("[MongoDB] Connection failed. Running without Mongo integration.", error);
    client = null;
    db = null;
    return null;
  }
}

export async function getMongoDb() {
  if (db) {
    return db;
  }

  return connectMongo();
}

export async function closeMongoConnection() {
  if (!client) {
    return;
  }

  await client.close();
  client = null;
  db = null;
}
