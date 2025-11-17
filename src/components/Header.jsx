import './Header.css';

import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <div className='header'>
      <div className='content'>
        <img src={logo} alt="logo" />
        <a>Anasayfa - <strong>Sipariş Oluştur</strong></a>
      </div>
    </div>
  )
}