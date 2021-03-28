import React, { useContext, useEffect, useState, Component } from "react"
import { GameContext } from "./GameInformationProvider"
import {Button, Container,} from "semantic-ui-react"

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Leaderboard.css'
import brit1 from "./assets/brit1"
import {GameCard} from './GameCard'



import { Card, Menu, Divider, Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"



    export const Leaderboard = ()=>{
        
        const history  = useHistory()
        const {getUri, handleLogoutClick, currentUserObject, getCurrentUserObject} = useContext(GameContext)   
        const {getGames, games} = useContext(GameContext)

        const [top10, setTop10] = React.useState()

        
        useEffect(() =>{
            getGames()
        },[])
            
        
        return (
            <>
        
            <Menu className = "menu">
                <Menu.Menu position='right'>
                </Menu.Menu>
                    <Header size='huge'>A game that is a game</Header>
                <Menu.Menu position='right'>
                    <Menu.Item
                     name= 'user'
                    >
                        Welcome {currentUserObject.userName}
                        <Menu.Item
                            className="menu-text"
                            name='logout'
                        onClick={handleLogoutClick}
                        />
                    </Menu.Item>
                
                </Menu.Menu>
                </Menu>
                <Header size='huge'>Top 10 scores</Header>
                <Container>
                    {games.map((game) => {
                        console.log('l');
                    return (
                        <GameCard
                        key={game.id}
                        score={game.score}
                        />);
                    
            })}
                </Container>
            </>
        )





    }