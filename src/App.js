import React, { useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Login from './components/Login';
import Chat from './components/Chat';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  


  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route  path="/login" component={Login} />
        <Route  path="/home" component={Chat} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
