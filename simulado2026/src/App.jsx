import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";


import "./App.css";

function App() {

    return (
        <>
            <Header />
            <Search/>
            <CurrentWeather />
            <Forecast/>
        </>
    )
  }

export default App;