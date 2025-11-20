import './Success.css';

import Logo from '../components/Logo';

export default function Success() {
  return (
    <div className="success">
      <Logo />
      <div className="content">
        <h2>
          TEBRİKLER!<br />SİPARİŞİNİZ ALINDI!
        </h2>
      </div>
    </div>
  )
}