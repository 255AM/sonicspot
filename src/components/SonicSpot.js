import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./SonicSpot.css";


export const SonicSpot = () => (
  <>
    <Route exact path="/">
      <Redirect to="/login" /> 
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>

   </> 
)