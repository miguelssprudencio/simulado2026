const fallback = {
  0: { description: "Céu limpo", icon: "sol.svg" },
  1: { description: "Predominantemente limpo", icon: "sol.svg" },
  2: { description: "Parcialmente nublado", icon: "nublado.svg" },
  3: { description: "Nublado", icon: "nublado.svg" },
  45: { description: "Neblina", icon: "neblina.svg" },
  48: { description: "Neblina com geada", icon: "neblina.svg" },
  51: { description: "Garoa fraca", icon: "chuva.svg" },
  53: { description: "Garoa moderada", icon: "chuva.svg" },
  55: { description: "Garoa intensa", icon: "chuva.svg" },
  56: { description: "Garoa congelante fraca", icon: "neve.svg" },
  57: { description: "Garoa congelante intensa", icon: "neve.svg" },
  61: { description: "Chuva fraca", icon: "chuva.svg" },
  63: { description: "Chuva moderada", icon: "chuva.svg" },
  65: { description: "Chuva forte", icon: "chuva.svg" },
  66: { description: "Chuva congelante fraca", icon: "neve.svg" },
  67: { description: "Chuva congelante forte", icon: "neve.svg" },
  71: { description: "Neve fraca", icon: "neve.svg" },
  73: { description: "Neve moderada", icon: "neve.svg" },
  75: { description: "Neve forte", icon: "neve.svg" },
  77: { description: "Grãos de neve", icon: "neve.svg" },
  80: { description: "Pancadas de chuva fracas", icon: "chuva.svg" },
  81: { description: "Pancadas de chuva moderadas", icon: "chuva.svg" },
  82: { description: "Pancadas de chuva fortes", icon: "chuva.svg" },
  85: { description: "Pancadas de neve fracas", icon: "neve.svg" },
  86: { description: "Pancadas de neve fortes", icon: "neve.svg" },
  95: { description: "Trovoada", icon: "tempestade.svg" },
  96: { description: "Trovoada com granizo fraco", icon: "tempestade.svg" },
  99: { description: "Trovoada com granizo forte", icon: "tempestade.svg" }
};

let catalogPromise;

export function loadWeatherCatalog() {
  if (!catalogPromise) {
    catalogPromise = fetch("/codigos_wmo.csv")
      .then((response) => {
        if (!response.ok) throw new Error("CSV indisponível");
        return response.text();
      })
      .then((text) => {
        const lines = text.trim().split(/\r?\n/);
        const catalog = {};
        lines.slice(1).forEach((line) => {
          const [code, description, icon] = line.split(";");
          if (code && description && icon) {
            catalog[Number(code)] = { description, icon };
          }
        });
        return { ...fallback, ...catalog };
      })
      .catch(() => fallback);
  }
  return catalogPromise;
}

export function getWeatherInfo(code, catalog = fallback) {
  return catalog[code] || {
    description: "Condição do tempo não identificada",
    icon: "nublado.svg"
  };
}
