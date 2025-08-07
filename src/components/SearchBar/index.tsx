import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../../hooks/useDebounce";
import { weatherApiKey } from "../../constants";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState("");
  const debouncedCity = useDebounce(city);
  const [suggestions, setSuggestions] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedCity) return setSuggestions([]);

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedCity}&limit=5&appid=${weatherApiKey}`
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    };
    fetchSuggestions();
  }, [debouncedCity]);

  return (
    <div className="mb-4 w-full max-w-md">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="px-4 py-2 rounded border border-gray-300 w-full"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onSearch(city)}
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded mt-1 shadow">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setCity(s.name);
                setSuggestions([]);
                onSearch(s.name);
              }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
