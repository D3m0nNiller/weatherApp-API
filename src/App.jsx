import { useState } from "react"
import CitySearch from "./components/CitySearch"
import Header from "./components/Header"
import './style.css'
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
      </main>
    </>
  )
}

export default App
