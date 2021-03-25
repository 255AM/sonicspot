import React, { useState, createContext } from "react"
import  { useHistory }  from "react-router-dom"


//first page. iF not authd, user will be presented with a button to auth. Upon completion user is sent to Select
export const Home = () => {
    
    //if state turns to true, take user to select page
    const history = useHistory()

    return(
        <>
            <h2><font color="neonorange">SonicSpot -The Game</font></h2>
            <h4><font color="green">Exactly like name that tune but different</font></h4>

            <address>
                <div>Visit Us </div>
                <div></div>
            </address>

            <button onClick={() => history.push("/select")}>
            Trigger Authed
            </button>
        </>
        )
    }