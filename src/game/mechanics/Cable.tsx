import React from "react";

export type CableData = {
  cableId: string;
  x: number;
  y: number;
  damage: boolean;
  damageDuration?: number;
  safeDuration?: number;
  timer?: number;
};

export function Cable({
  cable,
  tileSize = 64,
}: {
  cable: CableData;
  tileSize?: number;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: cable.x * tileSize,
    top: cable.y * tileSize,
    width: tileSize,
    height: tileSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    transition: "filter 150ms, transform 150ms, opacity 150ms",
    transform: cable.damage ? "scale(1.06)" : "scale(1)",
    filter: cable.damage ? "drop-shadow(0 0 12px rgba(0,200,255,0.9))" : "none",
    zIndex: 20,
  };

  const coreStyle: React.CSSProperties = {
    width: "60%",
    height: "60%",
    background: cable.damage
      ? "linear-gradient(180deg,#9be7ff,#2da8e2)"
      : "#3b4252",
    borderRadius: 6,
    boxShadow: cable.damage
      ? "0 0 18px rgba(45,168,226,0.9) inset"
      : "0 1px 0 rgba(0,0,0,0.2)",
    opacity: cable.damage ? 1 : 0.85,
  };

  return (
    <div style={style} data-cable-id={cable.cableId}>
      <div style={coreStyle} />
    </div>
  );
}
