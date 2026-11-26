import { useState } from "react";
import appConfig from "../../config/appConfig";
import "./search.css";

function Search({ onSearch, loading }) {
  const [city, setCity] = useState("");

  function submit(event) {
    event.preventDefault();
    onSearch(city);
  }

  function chooseCity(name) {
    setCity(name);
    onSearch(name);
  }

  return (
    <section className="search-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CONSULTE SUA CIDADE</span>
          <h2>Como está o tempo?</h2>
          <p>Pesquise uma localidade para ver as condições atuais e os próximos dias.</p>
        </div>
      </div>

      <form className="search-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="city-search">Nome da cidade</label>
        <input
          id="city-search"
          list="city-suggestions"
          type="text"
          placeholder="Digite o nome de uma cidade…"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          disabled={loading}
        />
        <datalist id="city-suggestions">
          {appConfig.quickCities.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      <div className="quick-search">
        <span>Busca rápida:</span>
        {appConfig.quickCities.map((name) => (
          <button
            className="city-chip"
            type="button"
            key={name}
            onClick={() => chooseCity(name)}
            disabled={loading}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Search;
