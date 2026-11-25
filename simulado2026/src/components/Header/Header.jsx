import './Header.css'
import logo from "../../assets/solchuva.svg";


function Header() {
  return (
  <header className='header'>
    <img src={logo} alt="logo-site" />
    <h1>Sol e Chuva</h1>
  </header>
  )
}

export default Header;