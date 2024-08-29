/* eslint-disable prefer-const */
import { FormEvent, useState } from "react"
import { SeachDayApi, SeachWeekApi } from "./api/search-api"
import { InfoWeather } from "./components/InfoWeather"
import { InfoWeatherWeek } from "./components/InfoWeatherWeek"

export interface DetailsCityProps {
  weather: [{
    main: string,
    description: string,
    icon: string
  }],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  },
  visibility: number,
  sys: {
    country: string,
  },
  name: string,
}

export interface DetailsWeekCityProps {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
  },
  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }],
  sys: { pod: string },
  dt_txt: string
}

function App() {
  const [city, setCity] = useState('')
  const [detailsCity, setDetailsCity] = useState<DetailsCityProps>()
  const [detailsWeekCity, setDetailsWeekCity] = useState<DetailsWeekCityProps[]>([])

  async function handleSearchCity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const detailsDay = await SeachDayApi(city)
    const detailsWeek = await SeachWeekApi(city)

    let dailyForecast: { [key: string]: DetailsWeekCityProps } = {};

    for (let forecast of detailsWeek.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString()

      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast
      }
    }

    const arrayDetailsWeek = Object.values(dailyForecast).slice(1, 6)

    setDetailsCity(detailsDay)
    setDetailsWeekCity(arrayDetailsWeek as DetailsWeekCityProps[])
    setCity('')
  }

  return (
    <div className="flex flex-col justify-center items-center mt-6 gap-4 mx-52 mb-8">
      <h1 className="text-4xl font-bold text-white">
        Previsão do Tempo
      </h1>

      <form onSubmit={handleSearchCity} className="flex mb-10 items-center rounded-full w-[420px] overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={event => setCity(event.target.value)}
          className="flex-1 p-2 ml-2 outline-none font-semibold bg-transparent"
        />
        <button type="submit" className="bg-orange-400 hover:bg-orange-500 duration-200 shrink-0 px-8 py-2 font-semibold text-white text-lg">Buscar</button>
      </form>

      {detailsCity
        && <InfoWeather info={detailsCity} />
      }

      {detailsWeekCity.length > 0
        && (
          <div className="flex flex-col w-full justify-center items-center gap-6 text-zinc-700 bg-[rgba(255,255,255,0.8)] p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-center">
              Previsão para os próximos 5 dias
            </h1>
            <div className="flex flex-wrap items-center justify-around w-full">
              {detailsWeekCity.map((infoWeek, index) => (
                <InfoWeatherWeek key={index} infoWeek={infoWeek} />
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
