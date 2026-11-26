import "./header.css";
import appConfig from "../../config/appConfig";

function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <a className="brand" href="/" aria-label={appConfig.name}>
          <img src={appConfig.logo} alt="" />
          <span>{appConfig.name}</span>
        </a>
        <span className="header-tagline">Previsão do tempo em tempo real</span>
      </div>
    </header>
  );
}

export default Header;
