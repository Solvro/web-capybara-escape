import { levelRepository } from "@/services/levels/level.repository";
import { screenSequenceRepository } from "@/services/screen-sequences/screen-sequences.repository";

import type { LoadedRoom } from "./room-loader";

export async function getSequenceLevels(
  screenSequenceSlug?: string,
): Promise<LoadedRoom[] | null> {
  const requestedSlug = screenSequenceSlug?.trim();
  if (!requestedSlug) {
    return null;
  }

  try {
    const plan = await screenSequenceRepository.getBySlug(requestedSlug);
    if (!plan) {
      console.warn(
        `[SequenceLoader] Screen sequence "${requestedSlug}" not found. Falling back to single-level mode.`,
      );
      return null;
    }

    const levelScreens = plan.screens
      .filter((screen) => screen.type === "level" && screen.levelSlug)
      .sort((a, b) => a.sequence - b.sequence);

    if (levelScreens.length === 0) {
      console.warn(
        `[SequenceLoader] Screen sequence "${requestedSlug}" has no level screens. Falling back to single-level mode.`,
      );
      return null;
    }

    const levels: LoadedRoom[] = [];

    for (const screen of levelScreens) {
      const level = await levelRepository.getBySlug(screen.levelSlug!, {
        publishedOnly: true,
      });

      if (!level?.data) {
        console.warn(
          `[SequenceLoader] Level "${screen.levelSlug}" (sequence #${screen.sequence}) not found or not published. Skipping it.`,
        );
        continue;
      }

      levels.push(level.data as LoadedRoom);
    }

    if (levels.length === 0) {
      console.warn(
        `[SequenceLoader] Screen sequence "${requestedSlug}" has no loadable published levels. Falling back to single-level mode.`,
      );
      return null;
    }

    return levels;
  } catch (error) {
    console.warn(
      `[SequenceLoader] Failed to load screen sequence "${requestedSlug}" from MongoDB. Falling back to single-level mode.`,
      error,
    );
    return null;
  }
}
