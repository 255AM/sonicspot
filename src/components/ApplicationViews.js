import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import SpotifyAuth from "./auth/Auth"

import {GameInformationProvider} from './game/GameInformationProvider'
import {GameScreen} from './game/GameScreen'
import {GameSelect} from './game/GameSelect'
import {Login} from './auth/Login'
import {Register} from './auth/Register'

export const ApplicationViews = () => {
    return (
        <>
            <GameInformationProvider>
                    
                <Route exact path="/">
                    <GameSelect />
                </Route>
                <Route exact path="/game">
                    <GameScreen />
                </Route>
                
            </GameInformationProvider> 
        </>
    )
}

