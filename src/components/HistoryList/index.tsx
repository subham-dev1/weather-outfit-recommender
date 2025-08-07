import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";

interface HistoryListProps {
  onSearch: (city: string) => void;
}

const HistoryList = ({ onSearch }: HistoryListProps) => {
  const { history } = useContext(WeatherContext);

  if (history.length === 0) return null;

  return (
    <div className="mb-6 text-center">
      <h3 className="font-medium mb-2">🔎 Recent Searches:</h3>
      <div className="flex gap-2 justify-center flex-wrap">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => onSearch(city)}
            className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
