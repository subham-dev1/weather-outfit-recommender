# 🌤️ Weather-Based Outfit Recommender

A simple React + Vite application that fetches real-time weather data and provides outfit recommendations based on the weather condition and temperature.

---

## 🚀 Features

- Search for weather by city name (with auto-suggestions)
- View temperature, humidity, wind speed, and weather condition
- Receive outfit suggestions (e.g., umbrella, jacket, sunglasses)
- View recent search history (last 5 cities)
- Responsive UI with light/dark theme toggle
- Weather card animation using Framer Motion
- State managed using React Context API
- Environment variables for API keys

---

## 🧩 Tech Stack

- [React + Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📦 Installation

```bash
git clone https://github.com/subham-dev1/weather-outfit-recommender.git
cd weather-outfit-recommender
npm install
```

---

## 🧪 Running the App Locally

1. Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

2. Start the development server:

```bash
npm run dev
```

3. Open in browser:

```
http://localhost:5173
```

---

## 📌 Assumptions & Decisions Made

- **State management:** Chose React Context API instead of Redux for simplicity, since the app has minimal global state.
- **Weather recommendation logic:** Basic conditions based on temperature and weather type (e.g., rain suggests umbrella).
- **Debounce + auto-suggest:** Implemented using a custom debounce hook and OpenWeather API (free tier).
- **Dark mode toggle:** Uses `dark` class to persist theme globally.
- **Styling:** TailwindCSS used for fast, responsive styling with dark mode support.
- **No persistent storage:** Search history is stored in memory (non-persistent).

---

## 📷 Screenshots

_Add screenshots here if needed_

---

## 🧑‍💻 Author

Made with ❤️ by [Subham Raj](https://github.com/subham-dev1)
