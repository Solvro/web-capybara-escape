import { Button } from "@/components/ui/button";

interface ReconnectingPanelProps {
  countdown: number;
  onCancel: () => void;
}

export function ReconnectingPanel({
  countdown,
  onCancel,
}: ReconnectingPanelProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-lg text-amber-200">
        Próba ponownego połączenia za {countdown}...
        <br />
      </p>
      <Button disabled={false} onClick={onCancel}>
        Anuluj ponowne połączenie.
      </Button>
    </div>
  );
}
