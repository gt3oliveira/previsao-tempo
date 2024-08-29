import { DetailsWeekCityProps } from "../App"


interface InfoWeatherWeekProps {
  infoWeek: DetailsWeekCityProps
}

export function InfoWeatherWeek({ infoWeek }: InfoWeatherWeekProps) {

  function formatDate(date: number): string {
    const newDate = new Date(date * 1000).toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
    }).replace('.', '')

    return newDate
  }

  return (
    <div className="flex flex-col min-w-[180px] gap-2 bg-slate-300 p-4 justify-center items-center rounded-lg shadow-md shadow-slate-400/70 hover:scale-105 hover:shadow-lg hover:shadow-slate-400 duration-200 m-2">
      <span>{formatDate(infoWeek.dt)}</span>
      <img
        src={`https://openweathermap.org/img/wn/${infoWeek.weather[0].icon}.png`}
        alt={infoWeek.weather[0].description}
        width={50}
      />

      <div className="text-xs flex w-full justify-center gap-2">
        <span>
          {Math.round(infoWeek.main.temp_min)}°C
        </span>
        {" / "}
        <span>
          {Math.round(infoWeek.main.temp_max)}°C
        </span>
      </div>
      <span className="font-semibold">
        {infoWeek.weather[0].description}
      </span>
    </div>
  )
}
