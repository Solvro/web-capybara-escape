import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import "./index.css";
import { RoomProvider } from "./lib/room-provider.tsx";

const rootElement = document.querySelector<HTMLDivElement>("#root");
if (rootElement == null) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <RoomProvider>
      <App />
    </RoomProvider>
  </StrictMode>,
);
