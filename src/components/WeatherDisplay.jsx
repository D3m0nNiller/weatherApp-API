import { useEffect, useState } from "react"

export default function WeatherDisplay({ lat, lon }) {

    const [weather, setWeather] = useState(null)

    const API_key = import.meta.env.VITE_API_KEY //Insert own key here

    useEffect(() => {
        async function getWeather() {
            const url = new URL("https://api.openweathermap.org/data/2.5/weather")

            url.searchParams.set("lat", lat)
            url.searchParams.set("lon", lon)
            url.searchParams.set("appid", API_key)
            url.searchParams.set("units", "metric")

            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            setWeather(data)
        }

        getWeather()
    }, [lat, lon])

    if (!weather) {
        return <p>Loading weather...</p>
    }

    const countryNames = new Intl.DisplayNames(["en"], {
        type: "region"
    })

    const country = countryNames.of(weather.sys.country)

    return (
        <>
            <section id="weather_details">
                <h2>{weather.name}</h2>

                <p>Tempature: {weather.main.temp.toFixed(0)} &deg;C</p>
                <p>Feels like {weather.main.feels_like.toFixed(0)} &deg;C</p>
                <div>
                    <p>Max tempature: {weather.main.temp_max.toFixed(0)} &deg;C</p>
                    <p>Min tempature: {weather.main.temp_min.toFixed(0)} &deg;C</p>
                </div>
                <p>{weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind speed: {weather.wind.speed.toFixed(1)} m/s</p>
                <p>Land: {country}</p>
            </section>
        </>
    )
}
