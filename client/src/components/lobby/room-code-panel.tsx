import { CopyField } from "@/components/lobby/copy-field";
import { Button } from "@/components/ui/button";

interface RoomCodePanelProps {
  code: string;
  link: string;
  canPlay: boolean;
  hasReadied: boolean;
  onPlay: () => void;
}

export function RoomCodePanel({
  code,
  link,
  canPlay,
  hasReadied,
  onPlay,
}: RoomCodePanelProps) {
  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <p className="text-lg text-white tomorrow-font">KOD POKOJU ORAZ LINK:</p>

      <CopyField
        value={code}
        copiedMessage="Skopiowano kod!"
        className="w-64 mt-2"
      />

      <CopyField
        value={link}
        copiedMessage="Skopiowano link!"
        className="w-64 mt-2"
      />

      <Button
        onClick={onPlay}
        disabled={!canPlay || hasReadied}
        className="w-64 tomorrow-font font-bold py-2 my-4"
      >
        {hasReadied ? "Oczekiwanie" : "Graj"}
      </Button>
    </div>
  );
}
