import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { AuthProvider } from './Context/AuthContext';
import "./Styles/Global.scss"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;