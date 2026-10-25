import { monitorMask } from "./monitor-mask";
import { StaticNoise } from "./static-noise";

export function NoiseLayer() {
  return (
    <div className="pointer-events-none absolute inset-0" style={monitorMask}>
      <StaticNoise />
    </div>
  );
}
