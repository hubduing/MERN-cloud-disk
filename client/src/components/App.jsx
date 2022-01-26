// npm i react-router-dom


import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import Disk from "./disk/Disk";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="wrap">
          {!isAuth ?
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/registration" component={Registration}/>
              <Redirect to="/ligon"/>
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Disk}/>
              <Redirect to="/"/>
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
