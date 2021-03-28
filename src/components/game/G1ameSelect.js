import React, { useState, useContext, useEffect } from "react"
import { GameContext } from './GameInformationProvider'
import { Card, Menu, Divider, Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"


//present user a series of boxes that represent categories. Each categories will have a unique id. Each unique id will have an associated uri to use for playlist retrieval from spotify.
    export const GameSelect = () => {
        const history  = useHistory()
        const {getUri, handleLogoutClick, currentUserObject, getCurrentUserObject} = useContext(GameContext)
        const handleCatgoryChoice = (x) => {
            getUri(x)
            history.push("/game")
        }
        //on each render, get current users dataObject
        useEffect(() => {
           getCurrentUserObject(localStorage.getItem("sonic_user")) 
        },[])

        return(
            <>
                < Menu>
                    <Menu.Menu position='right'>
                    <Menu.Item
                    name= 'user'
                    >
                    Welcome {currentUserObject.userName}
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        onClick={handleLogoutClick}
                    />
                    </Menu.Menu>
                    
                </Menu>
            
                <Grid columns={5} textAlign='center'  style={{ height: '100vh' }}verticalAlign='middle' >
                    <Grid.Row >
                        <h1 className='selectHeader' color='black'>
                            Game that plays music
                        </h1>
                    </Grid.Row>
                
                    <Grid.Row >
                        <Grid.Column>
                                <Card
                                    color='blue'
                                    header="Classic Rock's Greatest"
                                    onClick={event => {
                                       handleCatgoryChoice(1)
                                    }}
                                />
                            </Grid.Column>
                        <Grid.Column>
                            <Card
                                    color='blue'
                                    header="80s Country Hits"
                                    onClick={event => {
                                        handleCatgoryChoice(2)
                                    }}
                                />
                        </Grid.Column>
                        <Grid.Column>
                            <Card
                                    color='blue'
                                    header="Hot Country Hits"
                                    onClick={event => {
                                        handleCatgoryChoice(3)
                                    }}
                                />
                         </Grid.Column>
                        <Grid.Column>
                            <Card
                                    color='blue'
                                    header="Hits of the 90s"
                                    onClick={event => {
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
                                    history.push('/leaderboard')
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>     
        )
    }

   
    