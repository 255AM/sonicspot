import React, { useState, useContext, useEffect, createContext } from "react"
import { GameContext } from './GameInformationProvider'
import { Card, Container, Divider, Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"


//present user a series of boxes that represent categories. Each categories will have a unique id. Each unique id will have an associated uri to use for playlist retrieval from spotify.
    export const GameSelect = () => {
        const history  = useHistory()
        const {uri, getUri} = useContext(GameContext)
        const handleCatgoryChoice = (x) => {
            getUri(x)
            history.push("/game")
        }
        useEffect(() => {
            
        },[])

        return(
            <>
            
                <Grid columns={5} textAlign='center'  style={{ height: '100vh' }}          verticalAlign='middle' >
                    <Grid.Row >
                        <h1 className='selectHeader' color='black'>    Game that plays music
                        </h1>
                    </Grid.Row>
                
                    <Grid.Row >
                        <Grid.Column>
                                <Card
                                    
                                    
                                    color='blue'
                                    header="Classic Rock's Greatest"
                                    onClick={event => {
                                        event.preventDefault() // Prevent browser from submitting the form and 
                                        handleCatgoryChoice(1)
                                        
                                    }}
                                />
                            </Grid.Column>
                        <Grid.Column>
                            <Card
                                    
                                    color='blue'
                                    header="80s Country Hits"
                                    
                                    onClick={event => {
                                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                        handleCatgoryChoice(2)
                                    }}
                                />
                        </Grid.Column>
                        <Grid.Column>
                            <Card
                                    
                                    color='blue'
                                    header="Hot Country Hits"
                                    
                                    onClick={event => {
                                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                        handleCatgoryChoice(3)
                                    }}
                                />
                         </Grid.Column>
                        <Grid.Column>
                            <Card
                                    
                                    color='blue'
                                    header="Hits of the 90s"
                                    
                                    onClick={event => {
                                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                        handleCatgoryChoice(4)
                                    }}
                                />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row  >
                        <Grid.Column >
                            <Card
                                
                                color='blue'
                                header="Leaderboard"
                                meta='Leaderboard'
                                description="Leaderboard"
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                    handleCatgoryChoice(1)
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>     
        )
    }

    // <button className="btn btn-primary"
    //                 onClick={event => {
    //                 event.preventDefault() // Prevent browser from submitting the form and refreshing the page
    //                 handleCatgoryChoice(1)
    //                    }}>Classic Rock
    //             </button>

    