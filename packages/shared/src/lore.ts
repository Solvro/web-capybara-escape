import { parse } from "yaml";

export interface LoreAnswer {
  text: string;
  next?: string;
}

export interface LoreDialogContent {
  text: string;
  pose?: string;
  answers: LoreAnswer[];
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: string[],
): boolean {
  return Object.keys(value).every((key) => allowed.includes(key));
}

export function parseLoreDialog(source: string): LoreDialogContent {
  return validateLoreDialog(parse(source));
}

export function validateLoreDialog(data: unknown): LoreDialogContent {
  if (
    !record(data) ||
    !hasOnlyKeys(data, ["_id", "text", "pose", "answers"]) ||
    !nonempty(data.text) ||
    !Array.isArray(data.answers) ||
    (data.pose !== undefined && !nonempty(data.pose))
  ) {
    throw new Error(
      "Dialog może zawierać tylko text, pose oraz listę answers.",
    );
  }

  const answers = data.answers.map((entry): LoreAnswer => {
    const answer = typeof entry === "string" ? { text: entry } : entry;
    if (
      !record(answer) ||
      !hasOnlyKeys(answer, ["text", "next"]) ||
      !nonempty(answer.text) ||
      (answer.next !== undefined &&
        (typeof answer.next !== "string" ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(answer.next)))
    ) {
      throw new Error(
        "Odpowiedź może zawierać tylko text i opcjonalny identyfikator next.",
      );
    }

    return {
      text: answer.text,
      ...(answer.next === undefined ? {} : { next: answer.next }),
    };
  });

  return {
    text: data.text,
    ...(data.pose === undefined ? {} : { pose: data.pose.trim() }),
    answers,
  };
}
