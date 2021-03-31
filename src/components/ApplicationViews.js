import React from "react"
import { Route } from "react-router-dom"
import {GameInformationProvider} from './game/GameInformationProvider'
import {GameScreen} from './game/GameScreen'
import {GameSelect} from './game/GameSelect'
import { Leaderboard } from "./game/Leaderboard"
import {Stats} from "./game/Stats"
//import Leaderboard from "./game/GameSelect"




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
                <Route exact path="/leaderboard">
                  <Leaderboard /> 
                </Route>
                <Route exact path="/stats">
                  <Stats/> 
                </Route>
            </GameInformationProvider> 
        </>
    )
}

