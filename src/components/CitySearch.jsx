
export default function CitySearch() {
    const API_direct = import.meta.env.VITE_API_PATH
    const API_key = import.meta.env.VITE_API_KEY

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        const city = formData.get("city")

        const url = new URL(API_direct)

        url.searchParams.set("q", city)
        url.searchParams.set("appid", API_key)

        const response = await fetch(url)
        const data = await response.json()
        console.log(data);

    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="city" id="city_input" placeholder="Søg efter en by her" />
                <button type="submit">Søg</button>
            </form>
        </>
    )
}
