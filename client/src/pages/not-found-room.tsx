import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { IMAGE_LOBBY_PATHS } from "@/constants/global";

export function NotFoundRoom() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <img
        src={IMAGE_LOBBY_PATHS.NOT_FOUND_CAPYBARA}
        alt="Not Found Capybara"
        className="w-64 h-64 mb-12"
      />
      <h1 className="text-4xl font-bold mb-12">404</h1>
      <p className="text-2xl font-bold mb-8">
        No takiego pokoju to nie mamy :(
      </p>
      <Button
        disabled={false}
        onClick={() => {
          navigate("/");
        }}
      >
        Wróć do strony głównej
      </Button>
    </div>
  );
}
