import { useState, useEffect, useRef } from "react";
import { debounce } from "../../utils";

interface IAutoCompleteProps {
  onSelect: (value: string) => void;
}

const AutoComplete = ({ onSelect }: IAutoCompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef: any = useRef(null);

  const fetchCitySuggestions = (query: string) => {
    setLoading(true); // Start loading state
    return fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=8ab178e915e92e7447fe90901275d0fc`
    );
  };

  // Debounced version of the fetch function
  const debouncedFetchSuggestions = useRef(
    debounce(async (query: string) => {
      if (query.length > 0) {
        const response: any = await fetchCitySuggestions(query);
        const data = await response.json();
        setSuggestions(data);
        setLoading(false); // End loading state
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setLoading(false);
        setShowSuggestions(false);
      }
    }, 300) // 300ms debounce delay
  ).current;

  // UseEffect hook to handle the API call with debounce
  useEffect(() => {
    debouncedFetchSuggestions(inputValue);
  }, [inputValue, debouncedFetchSuggestions]);

  // UseEffect hook to handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler for input field changes
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  // Handler for when a suggestion is clicked
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-2 text-md border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
          placeholder="Type a city name..."
        />
      </div>

      {/* Conditional rendering for suggestions list and loading state */}
      {showSuggestions && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto">
          {loading ? (
            <p className="px-4 py-3 text-gray-500 animate-pulse">Loading...</p>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                  className="px-2 py-3 text-gray-800 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          ) : (
            inputValue.length > 0 && (
              <p className="px-4 py-3 text-gray-500">No cities found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
