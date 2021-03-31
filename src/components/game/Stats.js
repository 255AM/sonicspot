import React, { useContext, useEffect, useState, Component } from "react"
import { GameContext } from "./GameInformationProvider"
import {Button, Container,GridColumn,Table, Segment} from "semantic-ui-react"

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Leaderboard.css'
import brit1 from "./assets/brit1"
import {GameCard} from './GameCard'



import { Card, Menu, Divider, Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"



    export const Stats = ()=>{
        let i=0
        const history  = useHistory()
        const {getUri, handleLogoutClick, currentUserObject, getCurrentUserObject} = useContext(GameContext)   
        const {getGames, games} = useContext(GameContext)
         
        
        let sGames = games.sort((a, b) => (a.score > b.score) ? -1 : 1)
        
        useEffect(() =>{
            getGames()
        },[])
            
        
        return (
            
            <div className = "statsDiv"> 
                <Menu style={{ backgroundColor: 'white', height: 10, fontSize:20}}>  
                <Menu.Menu position='left'>
                    <Menu.Item
                            position='left'
                            name='Select'
                            onClick={()=>history.push('./')}
                        >
                        Game Select
                        </Menu.Item>
                        
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            position='right'
                            name= 'user'
                            onClick={()=>history.push('/stats')}
                        >
                        Welcome {currentUserObject.userName}
                        </Menu.Item>
                        <Menu.Item
                            name='logout'
                            onClick={handleLogoutClick}
                        />
                    </Menu.Menu>
                   
                </Menu>
                <Grid style={{ backgroundColor: 'white', fontSize:23}}>
                    <GridColumn>
                        <Container >
                            <Header textAlign='center' style={{  backgroundColor: 'black', color:'white'}} size='huge'>{currentUserObject.userName} Stats</Header>
                        </Container>
                    </GridColumn>
                </Grid>
                <Grid>
                <Grid.Row >
                    
                    <Card.Group>
                        <Card fluid header='Total Games Played: {number}' />
                        <Card fluid header='Total Songs Heard: {number}' />
                        <Card fluid header='Total Correct Guesses: Artists:{x} Songs:{x}' />
                        <Card fluid header='Percent Correct: Artists:{x} Songs:{x}' />
                        <Card fluid header='High Score:{number}    {category}' />
                    </Card.Group>
                    
                </Grid.Row>

                </Grid>


                    
            </div>
            
        )





    }