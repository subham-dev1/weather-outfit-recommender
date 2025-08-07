import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { motion } from "framer-motion";

const WeatherCard = () => {
  const { weather } = useContext(WeatherContext);
  console.log(weather, "weather>>>");
  if (!weather) return null;

  const temp = weather.main.temp;
  const condition = weather.weather[0].main.toLowerCase();
  let outfit = "Dress comfortably 👕";

  if (condition.includes("rain")) outfit = "Take an umbrella ☔";
  else if (temp < 10) outfit = "Wear a jacket 🧥";
  else if (temp > 25) outfit = "Sunglasses suggested 😎";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-center"
    >
      <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
      <p>🌡️ Temperature: {weather.main.temp}°C</p>
      <p>☁️ Condition: {weather.weather[0].description}</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p className="mt-4 font-semibold">{outfit}</p>
    </motion.div>
  );
};

export default WeatherCard;
