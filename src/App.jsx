import { useState } from "react"
import CitySearch from "./components/CitySearch"
import Header from "./components/Header"
import './style.css'
import WeatherDisplay from "./components/WeatherDisplay"
function App() {

  const [error, setError] = useState(false)
  const [weather, setWeather] = useState(null)

  return (
    <>
      <Header />
      <main>
        {error ? (
          <p>Der skete en fejl med at hente vejr data. Genindlæs siden eller prøv igen senere</p>
        ) : (
          <CitySearch setError={setError} setWeather={setWeather} />
        )}

        {weather && (
          <WeatherDisplay lat={weather.lat} lon={weather.lon} />
        )}
      </main>
    </>
  )
}

export default App
