import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import { findLocation, getForecast } from "./services/weatherApi";
import { loadWeatherCatalog } from "./services/weatherCodes";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [catalog, setCatalog] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeatherCatalog().then(setCatalog);
  }, []);

  async function handleSearch(city) {
    const searchedCity = city.trim();

    if (!searchedCity) {
      setError("Digite o nome de uma cidade antes de buscar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const foundLocation = await findLocation(searchedCity);
      const forecastData = await getForecast(
        foundLocation.latitude,
        foundLocation.longitude
      );

      setLocation(foundLocation);
      setWeather(forecastData);
    } catch (err) {
      setError(err.message || "Não foi possível carregar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <Search onSearch={handleSearch} loading={loading} />

        {loading && (
          <div className="status-message loading-message" role="status">
            <span className="spinner" />
            Carregando dados do clima…
          </div>
        )}

        {error && (
          <div className="status-message error-message" role="alert">
            {error}
          </div>
        )}

        {weather && location && !loading && (
          <>
            <CurrentWeather
              location={location}
              weather={weather}
              catalog={catalog}
            />
            <Forecast daily={weather.daily} catalog={catalog} />
          </>
        )}

        {!weather && !loading && !error && (
          <div className="empty-state">
            <img src="/icones/nublado.svg" alt="" />
            <h2>Encontre a previsão da sua cidade</h2>
            <p>Digite o nome de uma localidade ou escolha uma das sugestões acima.</p>
          </div>
        )}
      </main>
      <footer className="site-footer">
        <p>Sol Chuva · Informações meteorológicas fornecidas pela Open-Meteo.</p>
      </footer>
    </>
  );
}

export default App;
