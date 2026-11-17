import { useState } from "react"
import CitySearch from "./components/CitySearch"
import Header from "./components/Header"
import './style.css'
import WeatherDisplay from "./components/WeatherDisplay"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

function App() {

  const [error, setError] = useState(false)
  const [location, setLocation] = useState(null)



  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          {error && !location ? (
            <p>Der skete en fejl med at hente vejr data. Genindlæs siden eller prøv igen senere</p>
          ) : (
            <CitySearch setError={setError} setLocation={setLocation} />
          )}

          {location && (
            <WeatherDisplay
              lat={location.lat}
              lon={location.lon}
              setLocation={setLocation}
            />
          )}
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
