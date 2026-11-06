import { useEffect } from "react"

export default function CitySearch({ setError, setLocation }) {
    const API_direct = import.meta.env.VITE_API_PATH
    const API_key = import.meta.env.VITE_API_KEY //Insert own key here

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

        if (!city.trim()) {
            return
        }

        try {
            const response = await fetch(url)
            const data = await response.json()

            console.log(data)

            if (!response.ok || data.length === 0) {
                setError(true)
                setLocation(null)
                return
            }

            setLocation(data[0])
            setError(false)

        } catch (error) {
            setError(true)
            setLocation(null)
        }

        event.target.reset()
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