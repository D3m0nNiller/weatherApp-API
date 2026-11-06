
import { useEffect } from "react"

export default function CitySearch({ setError, setWeather }) {
    const API_direct = import.meta.env.VITE_API_PATH
    const API_key = import.meta.env.VITE_API_KEY

    useEffect(() => {
        async function checkAPI() {
            try {
                const url = new URL(API_direct)

                url.searchParams.set("q", "Copenhagen")
                url.searchParams.set("appid", API_key)

                const response = await fetch(url)


                if (!response.ok) {
                    setError(true)
                }
            } catch {
                setError(true)
            }
        }

        checkAPI()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const city = formData.get("city")

        const url = new URL(API_direct)

        url.searchParams.set("q", city)
        url.searchParams.set("appid", API_key)

        try {
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            const lat = data[0].lat
            const lon = data[0].lon
            const city = data[0].name

            console.log(lat)
            console.log(lon)
            console.log(city)

            const weatherURL = new URL("https://api.openweathermap.org/data/2.5/weather")

            weatherURL.searchParams.set("lat", lat)
            weatherURL.searchParams.set("lon", lon)
            weatherURL.searchParams.set("appid", API_key)
            weatherURL.searchParams.set("units", "metric")

            const weatherResponse = await fetch(weatherURL)
            const weatherData = await weatherResponse.json()
            console.log(weatherData)
            console.log(weatherURL);



            if (!response.ok) {
                setError(true)
                setWeather(null)
                return
            }

            setWeather(data)
            setError(false)

        } catch (error) {
            setError(true)
            setWeather(null)
        }
    }

    return (
        <>
            <h1>Hvordan er vejret?</h1>

            <p>Søg efter en by, og få det aktuelle vejr med det samme.</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="city"
                    id="city_input"
                    placeholder="Skriv en by, fx København"
                />

                <button type="submit">Søg</button>
            </form>
        </>
    )
}