// npm i react-router-dom

import React from "react";
import Navbar from "./navbar/Navbar";
import "./app.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from "./registration/Registration";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Switch>
            <Route path="/login" component={Registration} />
            <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
