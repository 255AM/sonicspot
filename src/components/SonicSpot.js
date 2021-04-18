import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./SonicSpot.css";


export const SonicSpot = () => (

  <>
    <Route
      path='/'
      render={() => {
        if (localStorage.getItem("sonic_user") && localStorage.getItem("sonic_user")!=='undefined' )  {
          return (
            <>
              <ApplicationViews />
            </>
          );
        } else {
          setTimeout(() => {  return <Redirect to="/login" />; }, 2000)
          
        }
      }}
    />
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </> 
)