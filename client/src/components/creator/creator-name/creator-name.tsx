import { useState } from "react";

import { colorVariants } from "../../../constants/color-variants";
import { CustomInput } from "../../ui/custom-input";

interface CreatorNameProps {
  levelName?: string;
  setLevelName: (name: string) => void;
}

export function CreatorName({ levelName, setLevelName }: CreatorNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(levelName || "");

  const handleSave = () => {
    setLevelName(tempName.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempName(levelName || "");
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-2 rounded-lg bg-[#4b2a86] p-4 text-left shadow-lg">
      <label className="my-1 px-3 text-xs font-semibold tracking-wide whitespace-nowrap text-violet-200 uppercase">
        Level Name
      </label>

      {!isEditing ? (
        <div onClick={handleEdit} className="group w-full cursor-pointer">
          <p
            className="flex h-9 w-full items-center overflow-hidden rounded-md border-2 border-transparent px-3 text-left text-xs font-bold text-ellipsis whitespace-nowrap text-amber-300 transition-colors group-hover:text-amber-200 md:text-sm"
            title={levelName || "Untitled Level"}
          >
            {levelName || "Untitled Level"}
          </p>
        </div>
      ) : (
        <CustomInput
          value={tempName}
          setValue={setTempName}
          disabled={false}
          placeholder="Enter level name"
          textColor={colorVariants.text.slate}
          className="w-full"
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
        />
      )}
    </div>
  );
}
