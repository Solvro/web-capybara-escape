export interface LoreGlyph {
  text: string;
  color: number | string;
  pause: number;
}

export function stripLoreFormatting(text: string): string {
  return formatLoreText(text)
    .map((glyph) => glyph.text)
    .join("");
}

/**
 * Supported text modifiers:
 * - \C[n] or \C[#hex] changes the color
 * - \. pauses for 250 ms
 * - \| pauses for 1000 ms
 */
export function formatLoreText(text: string): LoreGlyph[] {
  const result: LoreGlyph[] = [];
  let color: number | string = 0;

  const append = (value: string) => {
    for (const character of Array.from(value)) {
      result.push({ text: character, color, pause: 0 });
    }
  };

  const commands = /\\(C\[(\d+|#[0-9a-fA-F]{3,8})\]|[.|])/g;
  let offset = 0;

  for (const match of text.matchAll(commands)) {
    append(text.slice(offset, match.index));
    const command = match[1];

    if (match[2] !== undefined) {
      color = /^\d+$/.test(match[2]) ? Number(match[2]) : match[2];
    } else {
      result.push({
        text: "",
        color,
        pause: command === "." ? 250 : 1000,
      });
    }

    offset = match.index + match[0].length;
  }

  append(text.slice(offset));
  return result;
}
