import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WeatherProvider } from "./provider/WeatherProvider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </StrictMode>
);
