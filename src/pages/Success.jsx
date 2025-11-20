import './Success.css';

import Logo from '../components/Logo';

export default function Success({ orderData }) {
  return (
    <div className="success">
      <Logo />
      <div className="content">
        <h2>
          SİPARİŞ ALINDI!
        </h2>
        {orderData && <hr />}
        {orderData && <div className="order-summary">
          <p>
            <strong>Position Absolute Acı Pizza</strong>
          </p>
          <p className="order-summary-details">
            <strong>Ad Soyad:</strong> <span className="bold">{orderData.name}</span><br />
            <strong>Boyut:</strong> <span className="bold">{orderData.size}</span><br />
            <strong>Hamur Kalınlığı:</strong> <span className="bold">{orderData.thickness}</span><br />
            <strong>Ek Malzemeler:</strong> <span className="bold">{orderData.additions.join(', ')}</span>
          </p>
          <p className="order-summary-details">
            <strong>Seçimler:</strong> <span className="bold">{orderData.cost.additions}₺</span><br />
            <strong>Toplam:</strong> <span className="bold">{orderData.cost.total}₺</span><br />
          </p>
        </div>}
      </div>
    </div>
  )
}