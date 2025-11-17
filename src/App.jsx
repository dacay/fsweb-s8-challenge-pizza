import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Success from "./components/Success";
import Order from "./components/Order";

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
