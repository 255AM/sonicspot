import React, { useState, useContext, useEffect, createContext } from "react"
import { GameContext } from './GameInformationProvider'
import { Card, Container, Divider, Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"


//present user a series of boxes that represent categories. Each categories will have a unique id. Each unique id will have an associated uri to use for playlist retrieval from spotify.
    export const GameSelect = () => {
        const history  = useHistory()
        const {uri, getUri, categoryId, getCategoryId} = useContext(GameContext)
        const handleCatgoryChoice = () => {
            getCategoryId(1)
            history.push("/game")
        }
        useEffect(() => {
            getUri(1)
        },[])

        return(
            <>
            
                <Grid centered >
                    <Grid.Row centered columns={1}>
                        <Container className = 'game-select-title' textAlign= 'center'> 
                            Game To Play Music
                        </Container>
                    </Grid.Row>

                    <Grid.Row centered columns={5}>
                        <Grid.Column>
                        <Card
                                width= '5px'
                                color='blue'
                                header="Rock 'N Roll"
                                meta='Friend'
                                description=" Rock 'N Roll "
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and 
                                    handleCatgoryChoice(1)
                                    
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                        <Card
                                width= '5px'
                                color='blue'
                                header="Rock 'N Roll"
                                meta='Friend'
                                description=" Rock 'N Roll "
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                    handleCatgoryChoice(1)
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                        <Card
                                width= '5px'
                                color='blue'
                                header="Rock 'N Roll"
                                meta='Friend'
                                description=" Rock 'N Roll "
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                    handleCatgoryChoice(1)
                                }}
                            />
                         </Grid.Column>
                        <Grid.Column>
                        <Card
                                width= '5px'
                                color='blue'
                                header="Rock 'N Roll"
                                meta='Friend'
                                description=" Rock 'N Roll "
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                    handleCatgoryChoice(1)
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered columns={5}>
                        <Grid.Column >
                            <Card
                                width= '5px'
                                color='blue'
                                header="Rock 'N Roll"
                                meta='Friend'
                                description=" Rock 'N Roll "
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

    