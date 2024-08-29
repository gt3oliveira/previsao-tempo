import axios from "axios";

export async function SeachDayApi(city: string) {
  const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be2b2f551519803816d312f00105a3c4&lang=pt_br&units=metric`);

  return data.data
}

export async function SeachWeekApi(city: string) {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=be2b2f551519803816d312f00105a3c4&lang=pt_br&units=metric`);

  return data
}