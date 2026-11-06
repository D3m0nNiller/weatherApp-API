import { useEffect, useState } from "react"

export default function WeatherDisplay({ lat, lon }) {

    const [weather, setWeather] = useState(null)

    const API_key = import.meta.env.VITE_API_KEY

    useEffect(() => {
        async function getWeather() {
            const url = new URL("https://api.openweathermap.org/data/2.5/weather")

            url.searchParams.set("lat", lat)
            url.searchParams.set("lon", lon)
            url.searchParams.set("appid", API_key)
            url.searchParams.set("units", "metric")

            const response = await fetch(url)
            const data = await response.json()

            setWeather(data)
        }

        getWeather()
    }, [lat, lon])

    if (!weather) {
        return <p>Loading weather...</p>
    }

    return (
        <>
            <section>
                <h2>{weather.name}</h2>

                <p>{weather.main.temp} &deg;C</p>
                <p>{weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed} m/s</p>
            </section>
        </>
    )
}
