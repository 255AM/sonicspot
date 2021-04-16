import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./SonicSpot.css";


export const SonicSpot = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("sonic_user") && localStorage.getItem("sonic_user")!=='undefined')  {
          return (
            <>
              <ApplicationViews />
            </>
          );
        } else {
          //return <Redirect to="/login" />;
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