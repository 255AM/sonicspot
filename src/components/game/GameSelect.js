import React, { useState, useContext, useEffect, createContext } from "react"
import { GameContext } from './GameInformationProvider'

//present user a series of boxes that represent categories. Each categories will have a unique id. Each unique id will have an associated uri to use for playlist retrieval from spotify.
    export const GameSelect = () => {
        const {uri, getUri, categoryId, getCategoryId} = useContext(GameContext)
        
            


        const handleCatgoryChoice = () => {
            getCategoryId(1)
        }

        useEffect(() => {
            getUri(1)
            
        },[])


        return(
            <>
                <button className="btn btn-primary"
            onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleCatgoryChoice(1)
                
            }}>Classic Rock
                </button>
            </>
        )
        



    }

    