import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './global.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
