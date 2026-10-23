import { levelRepository } from "@/services/levels/level.repository";
import { questionRepository } from "@/services/questions/question.repository";
import { screenSequenceRepository } from "@/services/screen-sequences/screen-sequences.repository";

import type { LoadedRoom } from "./room-loader";

export type SequenceScreen =
  | { type: "level"; name: string; data: LoadedRoom }
  | { type: "question"; questionId: string };

export type SequenceLevel = Extract<SequenceScreen, { type: "level" }>;

export function isLevelScreen(screen: SequenceScreen): screen is SequenceLevel {
  return screen.type === "level";
}

export async function getSequenceScreens(
  screenSequenceSlug?: string,
): Promise<SequenceScreen[] | null> {
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

    const sortedScreens = [...plan.screens].sort(
      (a, b) => a.sequence - b.sequence,
    );

    const screens: SequenceScreen[] = [];

    for (const screen of sortedScreens) {
      if (screen.type === "question") {
        const question = screen.questionId
          ? await questionRepository.getById(screen.questionId)
          : null;

        if (!question) {
          console.warn(
            `[SequenceLoader] Question "${screen.questionId}" (sequence #${screen.sequence}) not found. Skipping it.`,
          );
          continue;
        }

        screens.push({ type: "question", questionId: question.id });
        continue;
      }

      const level = screen.levelSlug
        ? await levelRepository.getBySlug(screen.levelSlug, {
            publishedOnly: true,
          })
        : null;

      if (!level?.data) {
        console.warn(
          `[SequenceLoader] Level "${screen.levelSlug}" (sequence #${screen.sequence}) not found or not published. Skipping it.`,
        );
        continue;
      }

      screens.push({
        type: "level",
        name: level.name,
        data: level.data as LoadedRoom,
      });
    }

    if (!screens.some(isLevelScreen)) {
      console.warn(
        `[SequenceLoader] Screen sequence "${requestedSlug}" has no loadable published levels. Falling back to single-level mode.`,
      );
      return null;
    }

    return screens;
  } catch (error) {
    console.warn(
      `[SequenceLoader] Failed to load screen sequence "${requestedSlug}" from MongoDB. Falling back to single-level mode.`,
      error,
    );
    return null;
  }
}
