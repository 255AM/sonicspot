import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Home } from "./Home"
import SpotifyAuth from "./auth/Auth"

import {GameInformationProvider} from './game/GameInformationProvider'
import {GameScreen} from './game/GameScreen'
import {GameSelect} from './game/GameSelect'
import {Login} from './auth/Login'


export const ApplicationViews = () => {
    const isLoggedIn=()=>{
        if (localStorage.getItem("spotifyAuthToken") === 'undefined'){
            return false
        }else{
            return true
        }  
    }


    return (
        <>
            <GameInformationProvider>
                    <Route exact path="/login">
                        <SpotifyAuth />
                    </Route>
                <Route exact path="/select" render={()=>(
                    isLoggedIn()?(
                        <GameSelect />
                    ):(
                    <Redirect to="/login"/>
                    )
                )}>
                    
                </Route>
                <Route exact path="/game" render={()=>(
                    isLoggedIn()?(
                        <GameScreen />
                    ):(
                    <Redirect to="/login"/>
                    )
                )}>
                    
                    
                </Route>
            </GameInformationProvider> 
        </>
    )
}

