import { useState } from "react";

import { CreatorBoard } from "../components/creator/creator-board/creator-board";
import { CreatorControl } from "../components/creator/creator-control/creator-control";
import { CreatorItemsSelect } from "../components/creator/creator-items-select/creator-items-select";
import { CreatorName } from "../components/creator/creator-name/creator-name";

export function Creator() {
  const [levelName, setLevelName] = useState<string>();
  const [dims, setDims] = useState<[number, number]>([7, 8]);
  const [activeBlock, setActiveBlock] = useState<{ key: string; frame: number; label: string } | null>(null);

  return (
    <div className="mx-4 mt-[2dvh] mb-[2dvh] flex w-full flex-col gap-[2dvh] text-center">
      <div className="flex h-[14dvh] w-full items-stretch gap-4">
        <div className="w-2/5">
          <CreatorName levelName={levelName} setLevelName={setLevelName} />
        </div>
        <div className="w-3/5">
          <CreatorControl dims={dims} setDims={setDims} />
        </div>
      </div>
      <div className="flex h-[80dvh] w-full items-stretch gap-4">
        <div className="w-2/5">
          <CreatorItemsSelect activeBlock={activeBlock} setActiveBlock={setActiveBlock} />
        </div>
        <div className="w-3/5">
          <CreatorBoard dims={dims} activeBlock={activeBlock} />
        </div>
      </div>
    </div>
  );
}
