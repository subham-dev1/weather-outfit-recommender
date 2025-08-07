import { useState, type ReactNode } from "react";
import { WeatherContext } from "../context/WeatherContext";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
  wind: {
    speed: number;
  };
}

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (city: string) => {
    setHistory((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)];
      return updated.slice(0, 5);
    });
  };

  return (
    <WeatherContext.Provider
      value={{ weather, setWeather, history, addToHistory }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
