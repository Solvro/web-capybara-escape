import { useEffect, useRef } from "react";

import { NOISE_FRAME_MS, NOISE_HEIGHT, NOISE_WIDTH } from "./constants";

export function StaticNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const image = ctx.createImageData(NOISE_WIDTH, NOISE_HEIGHT);
    const rowGain = new Float32Array(NOISE_HEIGHT).fill(1);
    const rowSmooth = new Uint8Array(NOISE_HEIGHT);
    let rafId = 0;
    let lastFrame = 0;

    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      if (time - lastFrame < NOISE_FRAME_MS) return;
      lastFrame = time;

      for (let y = 0; y < NOISE_HEIGHT; y++) {
        if (Math.random() < 0.15) {
          rowGain[y] = 0.55 + Math.random() * 0.75;
          rowSmooth[y] = Math.random() < 0.35 ? 1 : 0;
        }

        let prev = Math.random();
        for (let x = 0; x < NOISE_WIDTH; x++) {
          let value = Math.random();
          if (rowSmooth[y] === 1) {
            value = prev * 0.6 + value * 0.4;
            prev = value;
          }
          const shade = Math.min(255, value * 255 * rowGain[y]);
          const i = (y * NOISE_WIDTH + x) * 4;
          image.data.set([shade, shade, shade, 255], i);
        }
      }

      ctx.putImageData(image, 0, 0);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={NOISE_WIDTH}
      height={NOISE_HEIGHT}
      className="h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
