import { useState } from "react"
import CitySearch from "./components/CitySearch"
import Header from "./components/Header"
import './style.css'
import WeatherDisplay from "./components/WeatherDisplay"
function App() {

  const [error, setError] = useState(false)
  const [location, setLocation] = useState(null)

  return (
    <>
      <Header />
      <main>
        {error ? (
          <p>Der skete en fejl med at hente vejr data. Genindlæs siden eller prøv igen senere</p>
        ) : (
          <CitySearch setError={setError} setLocation={setLocation} />
        )}

        {location && (
          <WeatherDisplay lat={location.lat} lon={location.lon} />
        )}
      </main>
    </>
  )
}

export default App
