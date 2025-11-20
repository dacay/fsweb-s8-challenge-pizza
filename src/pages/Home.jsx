import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <Logo />
      <p className="headline">
        <span>KOD ACIKTIRIR</span>
        <span>PİZZA, DOYURUR</span>
      </p>
      <Link to="/order" className="order-button">ACIKTIM</Link>
    </div>
  )
}