import type {
  Character,
  ReserveRoomCodeResponse,
  RoomLookupResponse,
} from "@capybara/shared";
import { matchMaker } from "@colyseus/core";
import { Request, Response, Router } from "express";

import { generateRoomCode, normalizeRoomCode } from "@/utils/room-code";

const ROOM_NAME = "game_room";
const MAX_CODE_GENERATION_ATTEMPTS = 10;

interface GameRoomMetadata {
  code?: string;
  phase?: "lobby" | "playing";
  screenSequenceSlug?: string;
  players?: { name: string; character: string }[];
}

async function findRoomListingByCode(code: string) {
  const listings = await matchMaker.query({ name: ROOM_NAME });
  return (
    listings.find(
      (listing) => (listing.metadata as GameRoomMetadata)?.code === code,
    ) ?? null
  );
}

/**
 * REST endpoints backing the lobby flow. These are intentionally read-only /
 * best-effort helpers that let the client discover room state *before*
 * actually joining the Colyseus room (existence check, taken character...).
 * Real matchmaking still happens through Colyseus (`filterBy(["code"])`).
 */
export function createRoomsRouter() {
  const router = Router();

  /**
   * @swagger
   * /api/rooms/code:
   *   post:
   *     summary: Reserve a fresh, unique room join-code
   *     tags: [Rooms]
   *     responses:
   *       200:
   *         description: A unique code to use when creating a new game room
   *         content:
   *           application/json:
   *             example:
   *               code: "DFG32CDS"
   */
  router.post("/rooms/code", async (_req: Request, res: Response) => {
    let code = generateRoomCode();
    let attempts = 0;

    while (
      (await findRoomListingByCode(code)) !== null &&
      attempts < MAX_CODE_GENERATION_ATTEMPTS
    ) {
      code = generateRoomCode();
      attempts += 1;
    }

    const response: ReserveRoomCodeResponse = { code };
    return res.json(response);
  });

  /**
   * @swagger
   * /api/rooms/{code}:
   *   get:
   *     summary: Look up a room by its join-code without joining it
   *     tags: [Rooms]
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Room existence + lightweight lobby info
   *         content:
   *           application/json:
   *             example:
   *               exists: true
   *               code: "DFG32CDS"
   *               phase: "lobby"
   *               players:
   *                 - name: "ELEK"
   *                   character: "sol"
   */
  router.get("/rooms/:code", async (req: Request, res: Response) => {
    const rawCode = req.params.code;
    const code = normalizeRoomCode(typeof rawCode === "string" ? rawCode : "");

    if (!code) {
      return res.status(400).json({ error: "Invalid room code." });
    }

    const listing = await findRoomListingByCode(code);
    if (!listing) {
      const response: RoomLookupResponse = { exists: false };
      return res.json(response);
    }

    const metadata = (listing.metadata ?? {}) as GameRoomMetadata;

    const response: RoomLookupResponse = {
      exists: true,
      roomId: listing.roomId,
      code: metadata.code ?? code,
      phase: metadata.phase ?? "lobby",
      players: (metadata.players ?? []).map((player) => ({
        name: player.name,
        character: player.character as Character,
      })),
      screenSequenceSlug: metadata.screenSequenceSlug,
    };
    return res.json(response);
  });

  return router;
}
