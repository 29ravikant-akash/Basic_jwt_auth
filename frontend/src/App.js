import React from 'react'
import {BrowserRouter, Link, Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Accountinfo from './pages/Accountinfo'
import { PrivateRoute } from './pages/PrivateRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>
          Learn Auth
        </h1>
        <br />
        <br />
        <Link to="/" >Your Account</Link>
        <br />
        <Link to="/login" >login</Link>
        <br />
        <Link to="/register" >register</Link>
        <Switch>
          <PrivateRoute exact path="/" component={Accountinfo} />
          <Route exact path="/login"> <Login /> </Route>
          <Route exact path="/register"> < Register /> </Route>
        </Switch>
      </BrowserRouter>
    </div >
  )
}

export default App

