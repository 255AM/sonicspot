import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import SpotifyAuth from "./auth/Auth"

import {GameInformationProvider} from './game/GameInformationProvider'
import {GameScreen} from './game/GameScreen'
import {GameSelect} from './game/GameSelect'
import {Login} from './auth/Login'


export const ApplicationViews = () => {
    return (
        <>
            <GameInformationProvider>
                    <Route exact path="/login">
                        <SpotifyAuth />
                    </Route>
                <Route exact path="/select">
                    <GameSelect />
                </Route>
                <Route exact path="/game">
                    <GameScreen />
                    
                </Route>
            </GameInformationProvider> 
        </>
    )
}