import { levelRepository } from "../../levels/level.repository";
import fallbackRoom from "../json/examples/room1.json";

type LoadedRoom = typeof fallbackRoom;

export async function getRoomForGame(levelSlug?: string): Promise<LoadedRoom> {
  try {
    const requestedSlug =
      levelSlug?.trim() || process.env.DEFAULT_LEVEL_SLUG?.trim();

    if (requestedSlug) {
      const requested = await levelRepository.getBySlug(requestedSlug, {
        publishedOnly: true,
      });

      if (requested?.data) {
        return requested.data as LoadedRoom;
      }
    }

    const published = await levelRepository.listLevels({ publishedOnly: true });
    const firstPublished = published[0];

    if (firstPublished?.data) {
      return firstPublished.data as LoadedRoom;
    }
  } catch (error) {
    console.warn(
      "[RoomLoader] Failed to load level from MongoDB. Using fallback room.",
      error,
    );
  }

  return fallbackRoom;
}
