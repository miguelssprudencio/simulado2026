const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function findLocation(city) {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "pt",
    format: "json"
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Não foi possível localizar a cidade. Tente novamente.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Localidade não encontrada. Confira o nome e tente novamente.");
  }

  return data.results[0];
}

export async function getForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "uv_index",
      "is_day"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "sunrise",
      "sunset"
    ].join(","),
    forecast_days: "10",
    timezone: "auto"
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar a previsão do tempo.");
  }

  return response.json();
}
