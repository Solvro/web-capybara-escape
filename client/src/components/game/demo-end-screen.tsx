import { monitorMask } from "@/components/loading-animator-wrapper/monitor-mask";
import { Button } from "@/components/ui/button";
import { IMAGE_ALERT_PATHS } from "@/constants/global";
import { LORE_TEXT_SIZE } from "@/constants/lore";
import { cn } from "@/lib/utils";

const DEMO_END_TITLE = "Ukonczono Demo!";
const DEMO_END_DESCRIPTION =
  "Co to była za gra? Wpadnij później, aby spróbować jeszcze raz!";
const DEMO_END_ACTION = "Powrót do menu";

interface DemoEndScreenProps {
  onExit: () => void;
}

export function DemoEndScreen({ onExit }: DemoEndScreenProps) {
  return (
    <section
      className="@container flex h-full w-full flex-col items-center justify-center gap-4 bg-background px-8 text-center text-white"
      style={monitorMask}
      aria-label={DEMO_END_TITLE}
    >
      <h2 className="arcade-font text-lg @2xl:text-2xl @4xl:text-4xl">
        {DEMO_END_TITLE}
      </h2>

      <img
        src={IMAGE_ALERT_PATHS.LEVEL_COMPLETE}
        alt=""
        className="h-1/2 object-contain"
      />

      <p className={cn("tomorrow-font max-w-xl", LORE_TEXT_SIZE)}>
        {DEMO_END_DESCRIPTION}
      </p>

      <Button
        onClick={onExit}
        disabled={false}
        className="tomorrow-font text-sm font-bold"
      >
        {DEMO_END_ACTION}
      </Button>
    </section>
  );
}
