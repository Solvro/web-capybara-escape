import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

import type { Minigame } from "../types/minigames/minigame";

interface MinigameProps {
  minigame: Minigame | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MinigameContainer({
  minigame,
  isOpen,
  onClose,
}: MinigameProps) {
  if (!minigame) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="arcade-font fixed inset-0 flex items-center justify-center p-4 text-white">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-450"
            enterFrom="opacity-0 translate-y-5 scale-90"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-550"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-8 scale-90"
          >
            <DialogPanel className="mx-32 flex h-1/2 w-full items-center justify-center rounded-xl bg-linear-to-br from-indigo-700/97 to-fuchsia-800/97 p-8 shadow-xl">
              <div className="flex h-full w-full items-center justify-center">
                {minigame.content}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
