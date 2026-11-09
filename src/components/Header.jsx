
export default function Header() {
    return (
        <>
            <header>
                <div id="weather_box">
                    <i className="fa-solid fa-cloud-sun weather_icon"></i>
                    <div>
                        <h3>Vejrblik</h3>
                        <p className="all_uppercase">Dit lokale vejr</p>
                    </div>
                </div>

                <div>
                    <div>
                        *
                    </div>
                    <p>Dansk vejr <span className='celcius'>* C</span></p>
                </div>
            </header>
        </>
    )
}
