import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Home";
import Success from "./pages/Success";
import Order from "./pages/Order";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
