import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import config from "@colyseus/tools";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { createLevelsRouter } from "@/api/routes/levels/levels";
import { createQuestionsRouter } from "@/api/routes/questions/questions";

import { closeMongoConnection, connectMongo } from "./config/mongo";
import { swaggerSpec } from "./config/swagger";
/**
 * Import your Room files
 */
import { GameRoom } from "./rooms/game-room";
import { levelRepository } from "./services/levels/level.repository";
import { questionRepository } from "./services/questions/question.repository";

async function gracefulShutdown(signal: string) {
  console.log(`[Server] Received ${signal}. Closing MongoDB connection...`);
  await closeMongoConnection();
  console.log("[Server] MongoDB connection closed. Exiting.");
  process.exit(0);
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

export default config({
  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define("game_room", GameRoom);
  },

  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     * Read more: https://expressjs.com/en/starter/basic-routing.html
     */

    app.use(express.json({ limit: "1mb" }));
    app.use("/api", createLevelsRouter());
    app.use("/api", createQuestionsRouter());

    app.get("/hello_world", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground());
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/monitor", monitor());
  },

  beforeListen: async () => {
    /**
     * Before before gameServer.listen() is called.
     */
    await connectMongo();
    await levelRepository.ensureIndexes();
    await questionRepository.ensureIndexes();
  },
});
