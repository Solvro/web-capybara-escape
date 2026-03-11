import { useState } from "react";

interface CreatorNameProps {
  levelName?: string;
  setLevelName: (name: string) => void;
}

export function CreatorName({ levelName, setLevelName }: CreatorNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(levelName || "");

  const handleSave = () => {
    if (tempName.trim()) {
      setLevelName(tempName.trim());
      setIsEditing(false);
    }
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
    <div className="flex h-full flex-col items-start justify-center gap-2 rounded-lg bg-[#4b2a86] pt-5 pr-4 pb-3 pl-6 text-left shadow-lg">
      <label className="px-3 text-xs font-semibold tracking-wide whitespace-nowrap text-violet-200 uppercase">
        Level Name
      </label>

      {!isEditing ? (
        <div onClick={handleEdit} className="group w-full cursor-pointer">
          <p className="flex h-9 items-center rounded-md border-2 border-transparent px-3 text-left text-base font-bold text-amber-300 transition-colors group-hover:text-amber-200">
            {levelName || "Untitled Level"}
          </p>
        </div>
      ) : (
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
          className="h-9 w-full rounded-md border-2 border-amber-400 bg-white px-3 text-base font-bold text-gray-900 placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          placeholder="Enter level name"
        />
      )}
    </div>
  );
}
