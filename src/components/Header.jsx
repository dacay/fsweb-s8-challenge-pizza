import Logo from './Logo';

import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='content'>
        <Logo />
        <a>Anasayfa - <strong>Sipariş Oluştur</strong></a>
      </div>
    </div>
  )
}