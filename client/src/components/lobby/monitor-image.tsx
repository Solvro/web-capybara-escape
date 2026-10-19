import { IMAGE_LOBBY_PATHS } from "@/constants/global";
import { cn } from "@/lib/utils";

export function MonitorImage({ selected }: { selected: boolean }) {
  return (
    <img
      src={IMAGE_LOBBY_PATHS.MONITOR}
      alt=""
      draggable={false}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-contain",
        "transition-[filter] duration-200",
        "group-hover:brightness-125 group-hover:saturate-150 group-hover:glow",
        selected && "brightness-125 saturate-150 glow",
      )}
    />
  );
}
