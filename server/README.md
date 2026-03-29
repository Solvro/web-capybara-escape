# Capybara Server

Logic for multiplayer game
Run with capybara-client to test all functionalities

# Welcome to Colyseus!

This project has been created using [⚔️ `create-colyseus-app`](https://github.com/colyseus/create-colyseus-app/) - an npm init template for kick starting a Colyseus project in TypeScript.

[Documentation](http://docs.colyseus.io/)

## :crossed_swords: Usage

```
git clone
npm i
npm test
npm start
```

### Required env vars

Due to fact that levels are preferably read from MongDB database, the following enviromental variables are required:

- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `ADMIN_API_TOKEN`
- `DEFAULT_LEVEL_SLUG` (optional fallback slug)

You may find an example in .env.example ;)

### Import existing room JSON files into MongoDB

Room files from `src/rooms/json/examples` can be imported into `levels` with:

```bash
npm run import:levels
```

The importer creates or updates levels by slug (based on file name) and marks them as published.

## Structure

- `index.ts`: main entry point, register an empty room handler and attach [`@colyseus/monitor`](https://github.com/colyseus/colyseus-monitor)
- `src/rooms/MyRoom.ts`: an empty room handler for you to implement your logic
- `src/rooms/schema/MyRoomState.ts`: an empty schema used on your room's state.
- `loadtest/example.ts`: scriptable client for the loadtest tool (see `npm run loadtest`)
- `package.json`:
    - `scripts`:
        - `npm start`: runs `ts-node-dev index.ts`
        - `npm test`: runs mocha test suite
        - `npm run loadtest`: runs the [`@colyseus/loadtest`](https://github.com/colyseus/colyseus-loadtest/) tool for testing the connection, using the `loadtest/example.ts` script.
- `tsconfig.json`: TypeScript configuration file


## License

MIT
