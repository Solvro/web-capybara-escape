interface LoreCharacterProps {
  src: string;
  alt: string;
}

export function LoreCharacter({ src, alt }: LoreCharacterProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="pointer-events-none absolute top-0 left-1/4 h-full w-1/2 origin-top scale-125 object-contain object-top"
    />
  );
}
