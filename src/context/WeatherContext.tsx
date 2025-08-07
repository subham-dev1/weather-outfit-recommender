import { createContext } from "react";

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

interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
  history: string[];
  addToHistory: (city: string) => void;
}

export const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  setWeather: () => {},
  history: [],
  addToHistory: () => {},
});
