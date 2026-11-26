import { getWeatherInfo } from "../../services/weatherCodes";
import "./currentWeather.css";

function formatTime(value) {
  if (!value) return "--:--";
  return new Date(value).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function CurrentWeather({ location, weather, catalog }) {
  const current = weather.current;
  const today = weather.daily;
  const condition = getWeatherInfo(current.weather_code, catalog);

  const details = [
    { label: "Sensação térmica", value: `${Math.round(current.apparent_temperature)}°C`, icon: "🌡️" },
    { label: "Umidade do ar", value: `${current.relative_humidity_2m}%`, icon: "💧" },
    { label: "Velocidade do vento", value: `${Math.round(current.wind_speed_10m)} km/h`, icon: "💨" },
    { label: "Precipitação", value: `${current.precipitation} mm`, icon: "🌧️" },
    { label: "Índice UV", value: current.uv_index ?? "—", icon: "☀️" },
    { label: "Nascer do sol", value: formatTime(today.sunrise?.[0]), icon: "🌅" },
    { label: "Pôr do sol", value: formatTime(today.sunset?.[0]), icon: "🌇" }
  ];

  return (
    <section className="current-section">
      <div className="current-main">
        <div>
          <span className="eyebrow">CLIMA ATUAL</span>
          <h2>{location.name}</h2>
          <p className="location-subtitle">
            {[location.admin1, location.country].filter(Boolean).join(", ")}
          </p>
          <div className="current-temperature">{Math.round(current.temperature_2m)}<span>°C</span></div>
          <p className="current-description">{condition.description}</p>
        </div>
        <img className="current-icon" src={`/icones/${condition.icon}`} alt={condition.description} />
      </div>

      <div className="details-grid">
        {details.map((item) => (
          <article className="detail-item" key={item.label}>
            <span className="detail-icon" aria-hidden="true">{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CurrentWeather;
