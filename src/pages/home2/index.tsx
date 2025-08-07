import { useState, useContext } from "react";

import { WeatherContext } from "../../context/WeatherContext";
import HistoryList from "../../components/HistoryList";
import WeatherCard from "../../components/WeatherCard";
import SearchBar from "../../components/SearchBar";
import { weatherApiKey } from "../../constants";

const Home2 = () => {
  const { setWeather, addToHistory } = useContext(WeatherContext);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = async (city: string) => {
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      addToHistory(data.name);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-blue-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-start py-10 px-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 px-3 py-1 bg-gray-800 text-white dark:bg-white dark:text-black rounded"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
        <h1 className="text-2xl font-bold mb-4">
          🌤️ Weather Outfit Recommender
        </h1>
        <SearchBar onSearch={handleSearch} />
        <HistoryList onSearch={handleSearch} />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <WeatherCard />
      </div>
    </div>
  );
};

export default Home2;
