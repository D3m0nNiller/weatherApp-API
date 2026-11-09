import { useEffect, useState } from "react"

export default function WeatherDisplay({ lat, lon }) {

    const [weather, setWeather] = useState(null)

    const API_key = import.meta.env.VITE_API_KEY //Insert own key here from: "https://openweathermap.org"

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

    function getWeatherIcon(description) {
        if (description.includes("thunderstorm")) {
            return "⛈️"
        } else if (description.includes("rain")) {
            return "🌧️"
        } else if (description.includes("snow")) {
            return "❄️"
        } else if (description.includes("cloud")) {
            return "☁️"
        } else if (description.includes("clear")) {
            return "☀️"
        } else if (description.includes("mist") || description.includes("fog")) {
            return "🌫️"
        } else {
            return "🌤️"
        }
    }

    const countryNames = new Intl.DisplayNames(["da"], {
        type: "region"
    })

    const country = countryNames.of(weather.sys.country)

    return (
        <>
            <section id="weather_details">
                <div id="found_search">
                    <h2>{weather.name}</h2>
                    <h2>Land: {country}</h2>
                </div>

                <div id="tempature">
                    <p>temperatur: {weather.main.temp.toFixed(0)} &deg;C</p>
                    <p>føles som: {weather.main.feels_like.toFixed(0)} &deg;C</p>

                    <p>Max temperatur: {weather.main.temp_max.toFixed(0)} &deg;C</p>
                    <p>Min temperatur: {weather.main.temp_min.toFixed(0)} &deg;C</p>
                </div>

                <div id="weather_information">
                    <p id="city_weather">{weather.weather[0].description}</p>
                    <p>{getWeatherIcon(weather.weather[0].description)}</p>
                </div>

                <div id="extra_information">
                    <p>fygtighed: {weather.main.humidity}%</p>
                    <p>wind hastighed: {weather.wind.speed.toFixed(1)} m/s</p>
                </div>

            </section>
        </>
    )
}
