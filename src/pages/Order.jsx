import Header from "../components/Header";
import OrderForm from "../components/OrderForm";

import './Order.css';

export default function Order({ onPlaceOrder }) {
  return (
    <div style={{ minHeight: '100vh', width: '100vw' }}>
      <Header />  
      <OrderForm onPlaceOrder={onPlaceOrder} />
    </div>
  )
}