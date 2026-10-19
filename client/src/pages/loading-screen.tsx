import {
  LoadingAnimatorWrapper,
  useLoadingAnimator,
} from "@/components/loading-animator-wrapper";
import { Button } from "@/components/ui/button";

function Controls() {
  const { displayTransition, displayCounting } = useLoadingAnimator();

  const playSequence = async () => {
    await displayTransition(700, "counting");
    await displayCounting(3);
    await displayTransition(700, "content");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p>Game placeholder</p>
      <div className="flex gap-4">
        <Button disabled={false} onClick={() => void displayTransition(700)}>
          Transition
        </Button>
        <Button disabled={false} onClick={() => void displayCounting(3)}>
          Counting
        </Button>
        <Button disabled={false} onClick={() => void playSequence()}>
          Full sequence
        </Button>
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingAnimatorWrapper levelNumber={1} levelName="Cave Escape">
        <Controls />
      </LoadingAnimatorWrapper>
    </div>
  );
}
