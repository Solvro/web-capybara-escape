import type { LoreGlyph } from "@capybara/shared";

const COLOR_CLASSES: Record<number, string> = {
  0: "text-white",
  1: "text-blue-400",
  2: "text-red-400",
  3: "text-green-400",
  4: "text-yellow-400",
  5: "text-purple-400",
  6: "text-cyan-400",
  7: "text-stone-400",
};

interface LoreTextProps {
  glyphs: LoreGlyph[];
}

export function LoreText({ glyphs }: LoreTextProps) {
  return (
    <>
      {glyphs.map((glyph, index) => {
        const colorClass =
          typeof glyph.color === "number"
            ? (COLOR_CLASSES[glyph.color] ?? "text-white")
            : "";
        const style =
          typeof glyph.color === "string" ? { color: glyph.color } : undefined;

        return (
          <span key={index} className={colorClass} style={style}>
            {glyph.text}
          </span>
        );
      })}
    </>
  );
}
