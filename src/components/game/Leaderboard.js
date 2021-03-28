import React, { useContext, useEffect, useState, Component } from "react"
import { GameContext } from "./GameInformationProvider"
import {Button, Container,GridColumn,Table} from "semantic-ui-react"

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
        let i=0
        const history  = useHistory()
        const {getUri, handleLogoutClick, currentUserObject, getCurrentUserObject} = useContext(GameContext)   
        const {getGames, games} = useContext(GameContext)
         
        
        let sGames = games.sort((a, b) => (a.score > b.score) ? -1 : 1)
        
        useEffect(() =>{
            getGames()
        },[])
            
        
        return (
            <>
        
            <Menu className = "menu">
                <Menu.Menu position='right'>
                </Menu.Menu>
                    <Header style={{ marginLeft:150, fontSize:50}} textAlign="center" size='huge'>A game that is a game</Header>
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
                <Grid style={{ backgroundColor: 'black', height: '100vh', fontSize:23}}>
                    <GridColumn>
                <Container >
                <Header textAlign='center' style={{  backgroundColor: 'black', color:'white'}} size='huge'>Top 10 scores</Header>
                <Container >
                    <Table padded singleLine size="large" style={{  backgroundColor: 'black', color:'white'}}>
                        <Table.Header style={{ backgroundColor: 'black', color:''}}>
                        <Table.Row style={{ backgroundColor: 'black', color:'white'}}>
                            <Table.HeaderCell width={7} style={{ backgroundColor: 'black', color:'blue'}}>Score</Table.HeaderCell >
                            <Table.HeaderCell width={8} style={{ backgroundColor: 'black', color:'blue'}}>Category</Table.HeaderCell>
                            <Table.HeaderCell width={8} style={{ backgroundColor: 'black', color:'blue'}}>Name</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            
                        {sGames.slice(0,10).map((game) => {
                            
                    return (
                        <GameCard
                            key={game}
                            score={game.score}
                            id={game.id}
                            userId={game.userId}
                            categoryId={game.categoryId}
                            userName={game.user.userName}
                            categoryName={game.category.name}
                        />);
                    })}
                        
                        </Table.Body>
                    </Table>

                    
                </Container>
                <Button     
                                    animated='fade'
                                    size='massive' 
                                    attached='bottom' 
                                    basic color='green'
                                    onClick={event => {
                                        history.push('/')
                                     }}>
                                    <Button.Content visible>Back to main menu</Button.Content>
                                    <Button.Content hidden>GO!</Button.Content>
                                </Button>
                </Container>
                </GridColumn>
                </Grid>
            </>
        )





    }