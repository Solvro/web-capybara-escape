import { useEffect, useRef, useState } from "react";

import { CreatorBoard } from "../components/creator/creator-board/creator-board";
import { CreatorControl } from "../components/creator/creator-control/creator-control";
import { CreatorItemsSelect } from "../components/creator/creator-items-select/creator-items-select";
import { CreatorName } from "../components/creator/creator-name/creator-name";

export function Creator() {
  const [levelName, setLevelName] = useState<string>();
  const [dims, setDims] = useState<[number, number]>([7, 8]);

  return (
    <div className="mx-4 flex w-full flex-col gap-4 text-center">
      <div className="flex w-full items-stretch gap-4">
        <div className="w-2/5">
          <CreatorName levelName={levelName} setLevelName={setLevelName} />
        </div>
        <div className="w-3/5">
          <CreatorControl dims={dims} setDims={setDims} />
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-2/5">
          <CreatorItemsSelect />
        </div>
        <div className="w-3/5">
          <CreatorBoard dims={dims} />
        </div>
      </div>
    </div>
  );
}
