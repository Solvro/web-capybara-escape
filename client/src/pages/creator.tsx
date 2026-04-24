import { useState } from "react";

import { CreatorBoard } from "../components/creator/creator-board/creator-board";
import { CreatorControl } from "../components/creator/creator-control/creator-control";
import { CreatorItemsSelect } from "../components/creator/creator-items-select/creator-items-select";
import { CreatorName } from "../components/creator/creator-name/creator-name";

export function Creator() {
  const [levelName, setLevelName] = useState<string>();
  const [dims, setDims] = useState<[number, number]>([7, 8]);
  const [activeBlock, setActiveBlock] = useState<{
    key: string;
    frame: number;
    label: string;
  } | null>(null);

  return (
    <div className="mx-[2dvw] mt-[2dvh] mb-[2dvh] flex w-auto flex-col gap-[2dvh] text-center">
      <div className="flex h-[14dvh] w-full items-stretch gap-[1dvw]">
        <div className="w-[30dvw]">
          <CreatorName levelName={levelName} setLevelName={setLevelName} />
        </div>
        <div className="w-[64dvw]">
          <CreatorControl dims={dims} setDims={setDims} />
        </div>
      </div>
      <div className="flex h-[80dvh] w-full items-stretch gap-[1dvw]">
        <div className="w-[30dvw]">
          <CreatorItemsSelect
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
        <div className="w-[64dvw]">
          <CreatorBoard dims={dims} activeBlock={activeBlock} />
        </div>
      </div>
    </div>
  );
}
