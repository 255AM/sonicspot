import React, { useContext, useEffect, useState, Component } from "react"
import { GameContext } from "./GameInformationProvider"
import {Button, Container,} from "semantic-ui-react"

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Leaderboard.css'
import brit1 from "./assets/brit1"



import { Card, Menu, Divider, Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"


//present user a series of boxes that represent categories. Each categories will have a unique id. Each unique id will have an associated uri to use for playlist retrieval from spotify.
    export const GameSelect = ()=> {

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
             
            <Grid textAlign='center' style={{ height: '100vh', backgroundColor:'black' }} verticalAlign='middle' >
                <Grid.Column style={{ maxWidth: 700 }}
                style={{backgroundColor:'black'}}>
                    <Container>
                        <Carousel 
                        infiniteLoop
                        showThumbs={false}
                        showIndicators={false}
                        showStatus={false}
                        >
                            <div>
                                <img src="https://www.savingcountrymusic.com/wp-content/uploads/2018/05/willie-nelson-family-live.jpg" />
                                <Button     
                                    animated='fade'
                                    size='massive' 
                                    attached='bottom' 
                                    basic color='green'
                                    onClick={event => {
                                        handleCatgoryChoice(2)
                                     }}>
                                    <Button.Content visible>Classic Country</Button.Content>
                                    <Button.Content hidden>Play Now</Button.Content>
                                </Button>
                                
                            </div>
                                
                            <div>
                                <img src={brit1}/>
                                <Button     
                                    animated='fade'
                                    size='massive' 
                                    attached='bottom' 
                                    basic color='green'
                                    onClick={event => {
                                        handleCatgoryChoice(3)
                                     }}
                                     >
                                    <Button.Content visible>90s Hits</Button.Content>
                                    <Button.Content hidden>Play Now</Button.Content>
                                </Button>
                            </div>
                                
                            <div>
                                <img src="https://cdn.mos.cms.futurecdn.net/Er7f2aS9ukBKBsVfR2Z9uE.jpg" />
                                <Button     
                                    animated='fade'
                                    size='massive' 
                                    attached='bottom' 
                                    basic color='green'
                                    onClick={event => {
                                        handleCatgoryChoice(1)
                                     }}
                                     >
                                    <Button.Content visible>Classic Rocks greatest </Button.Content>
                                    <Button.Content hidden>Play Now</Button.Content>
                                    
                                </Button>
                            </div>
                                
                            <div>
                                <img src="https://images.squarespace-cdn.com/content/56858337cbced60d3b293aef/1511882901578-XAM9BXOBM951U6GRT8UP/Albumism_MichaelJackson_Thriller_MainImage1.jpg?content-type=image%2Fjpeg" />
                                <Button     
                                    animated='fade'
                                    size='massive' 
                                    attached='bottom' 
                                    basic color='green'
                                    onClick={event => {
                                        handleCatgoryChoice(4)
                                     }}
                                     >
                                    <Button.Content visible>Best of the 80s </Button.Content>
                                    <Button.Content hidden>Play Now</Button.Content>
                                </Button>
                            </div>
                        </Carousel>  
                    </Container> 
                </Grid.Column>
            </Grid>


            
           </>  
        );

        

                
           
    }




// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
