import { getWeatherInfo } from "../../services/weatherCodes";
import "./weatherCard.css";

function WeatherCard({ date, index, daily, catalog }) {
  const condition = getWeatherInfo(daily.weather_code[index], catalog);
  const label = index === 0
    ? "Hoje"
    : index === 1
      ? "Amanhã"
      : new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long" });

  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit"
  });

  return (
    <article className="weather-card">
      <h3>{label}</h3>
      <span className="weather-card-date">{formattedDate}</span>
      <img src={`/icones/${condition.icon}`} alt={condition.description} />
      <p className="weather-card-condition">{condition.description}</p>
      <div className="temperature-range">
        <strong>{Math.round(daily.temperature_2m_max[index])}°</strong>
        <span>{Math.round(daily.temperature_2m_min[index])}°</span>
      </div>
      <p className="rain-chance">💧 {daily.precipitation_probability_max?.[index] ?? 0}% de chuva</p>
    </article>
  );
}

export default WeatherCard;
