import WeatherCard from "../WeatherCard/WeatherCard";
import "./forecast.css";

function Forecast({ daily, catalog }) {
  return (
    <section className="forecast-section">
      <div className="forecast-heading">
        <div>
          <span className="eyebrow">PRÓXIMOS DIAS</span>
          <h2>Previsão para 10 dias</h2>
        </div>
        <span className="forecast-note">Máximas e mínimas</span>
      </div>
      <div className="forecast-grid">
        {daily.time.map((date, index) => (
          <WeatherCard
            key={date}
            date={date}
            index={index}
            daily={daily}
            catalog={catalog}
          />
        ))}
      </div>
    </section>
  );
}

export default Forecast;
