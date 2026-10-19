import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/custom-input";

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

      <CustomInput
        value={code}
        placeholder="Twój kod pokoju"
        className="w-64 mt-2"
        setValue={() => {}}
        disabled={true}
      />

      <CustomInput
        value={link}
        placeholder="Twój kod pokoju"
        className="w-64 mt-2"
        setValue={() => {}}
        disabled={true}
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
