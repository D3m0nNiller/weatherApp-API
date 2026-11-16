import { useQuery } from "@tanstack/react-query"

export default function WeatherDisplay({ lat, lon }) {

    const API_key = import.meta.env.VITE_API_KEY //Insert own key here from: "https://openweathermap.org"

    const { data: weather, isPending, error } = useQuery({
        queryKey: ["weather", lat, lon],

        queryFn: async () => {
            const url = new URL("https://api.openweathermap.org/data/2.5/weather")

            url.searchParams.set("lat", lat)
            url.searchParams.set("lon", lon)
            url.searchParams.set("appid", API_key)
            url.searchParams.set("units", "metric")
            url.searchParams.set("lang", "da")

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("Could not fetch weather data")
            }

            const data = await response.json()

            return data
        },
        staleTime: 1000 * 60 * 5

    })

    if (isPending) {
        return <p>Loading weather...</p>
    }

    if (error) {
        return <p>{error.message}</p>
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

            </section>

            <div id="extra_information">
                <p>fygtighed: {weather.main.humidity}%</p>
                <p>wind hastighed: {weather.wind.speed.toFixed(1)} m/s</p>
            </div>
        </>
    )
}
