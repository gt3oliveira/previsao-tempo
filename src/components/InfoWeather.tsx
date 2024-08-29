import { DetailsCityProps } from "../App"

interface InfoWeatherProps {
  info: DetailsCityProps
}

export function InfoWeather({ info }: InfoWeatherProps) {

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-4 text-zinc-700 bg-[rgba(255,255,255,0.8)] shadow-[0px_0px_8px_4px] shadow-[rgba(255,255,255,0.8)] p-8 rounded-lg mb-4">
      <h1 className="text-3xl font-bold">
        {info.name}, {info.sys.country}
      </h1>
      <div className="flex gap-4 items-center justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${info.weather[0].icon}.png`}
          alt={info.weather[0].description}
          width={100}
        />
        <p className="text-5xl font-bold">
          {Math.round(info.main.temp)}ºC
        </p>
      </div>

      <span className="text-lg font-semibold">
        {info.weather[0].description}
      </span>

      <div className="flex w-full justify-around">
        <span>Sensação térmica: {Math.round(info.main.feels_like)}°</span>
        <span>Umidade: {info.main.humidity}%</span>
        <span>Pressão atm.: {info.main.pressure} hPa</span>
      </div>
    </div>
  )
}
