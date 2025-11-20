import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Success from "./pages/Success";
import Order from "./pages/Order";

function App() {

  const [orderData, setOrderData] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/success">
          <Success orderData={orderData} />
        </Route>
        <Route path="/order">
          <Order onPlaceOrder={setOrderData} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
