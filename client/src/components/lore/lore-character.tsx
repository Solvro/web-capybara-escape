interface LoreCharacterProps {
  src: string;
  alt: string;
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
}

export function LoreCharacter({
  src,
  alt,
  scaleX,
  scaleY,
  offsetX,
  offsetY,
}: LoreCharacterProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="pointer-events-none absolute top-0 left-1/4 h-full w-1/2 origin-top object-contain object-top"
      style={{
        transform: `translate(${offsetX}%, ${offsetY}%) scale(${scaleX}, ${scaleY})`,
      }}
    />
  );
}
