import React, { useContext, useEffect, useState, Component } from "react"
import { GameContext } from "./GameInformationProvider"
import {Button, Label, Container,GridColumn,Table, Segment, Header} from "semantic-ui-react"

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Leaderboard.css'
import brit1 from "./assets/brit1"
import {GameCard} from './GameCard'



import { Card, Menu, Divider, Grid, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"



    export const Stats = ()=>{
        let i=0
        const history  = useHistory()
        const {getUri, handleLogoutClick, currentUserObject, getCategoryName} = useContext(GameContext)   
        const {getGames, games} = useContext(GameContext)
         
        let usersGames = games.filter((a) => (a.userId === localStorage.getItem("sonic_user")))
        console.log(usersGames);
        //let sGames = games.sort((a, b) => (a.score > b.score) ? -1 : 1)
        let totalGames = usersGames.length
        let totalPoints = usersGames.reduce((a, b) => a + b.score , 0)
        let totalSongs =  usersGames.reduce((a, b) => a + b.songsPlayed, 0)
        let totalCorrectGuesses =  usersGames.reduce((a, b) => a + b.artistGuessCorrect + b.songGuessCorrect, 0)
        let artistCorrectGuesses = usersGames.reduce((a, b) => a + b.artistGuessCorrect , 0)
        let songCorrectGuesses = usersGames.reduce((a, b) => a + b.songGuessCorrect , 0)
        let totalGuessPercentages = Math.trunc(totalCorrectGuesses/(totalSongs*2)*100)
        let songGuessPercentages = Math.trunc(songCorrectGuesses/totalSongs*100)
        let artistGuessPercentages = Math.trunc(artistCorrectGuesses/totalSongs*100)
        let averageScore = usersGames.reduce((a, b) => a + b.score, 0)/ usersGames.length.toFixed(1)
        let sortedByScore =  usersGames.sort((a, b) => (a.score > b.score) ? -1 : 1)
        console.log(usersGames);
        console.log(sortedByScore);
        
        
        let userHighScore = sortedByScore[0].score
        let userHighScoreCategory = sortedByScore[0].category.name
        
        
        console.log(usersGames);
        let nums = usersGames.map((a)=>(a.categoryId))
        console.log(usersGames);
        console.log(nums);
        let mostPlayedCategoryId = topKFrequent(nums,1)
       
        let mpc = ( usersGames.filter(function(item) {return item.categoryId === mostPlayedCategoryId[0]})
        .map(function(item) {return item.category.name})); 
          
        
        
        
        
        
        function topKFrequent(nums, k) {
            
            let hash = {}
        
            for (let num of nums) {
                if (!hash[num]) hash[num] = 0
                hash[num]++
            }
        
            const hashToArray = Object.entries(hash)
            const sortedArray = hashToArray.sort((a,b) => b[1] - a[1])
            const sortedElements = sortedArray.map(num => parseInt(num[0]))
            return sortedElements.slice(0, k)
        }
        
        
        
        
        
        
  
        
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
                            <Header textAlign='center' style={{  height: 100,color:'white'}} ></Header>
                        </Container>
                    </GridColumn>
                </Grid>
                <Grid>
                    <Grid.Column>
                        <Grid.Row >
                            <Card.Group centered>
                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content><Header textAlign='center'>Games</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total games played: {usersGames.length}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Points Scored: {totalPoints}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Average score: {averageScore}</Header></Card.Content> 
                                </Card>
                                
                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content><Header textAlign='center'>Overall</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total songs played: {totalSongs}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total correct answers: {totalCorrectGuesses}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total answer accuracy: % {totalGuessPercentages}</Header></Card.Content> 
                                </Card>

                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content><Header textAlign='center'>Songs</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total songs played: {totalSongs}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Correct song name answers: {songCorrectGuesses}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Song name answer accuracy: % {songGuessPercentages}</Header></Card.Content> 
                                </Card>

                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content><Header textAlign='center'>Artists</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total songs played: {totalSongs}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Correct artist name answers: {artistCorrectGuesses}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Artist name answer accuracy: % {artistGuessPercentages}</Header></Card.Content> 
                                </Card>

                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content><Header textAlign='center'>Categories</Header></Card.Content>
                                        <Card.Content><Header textAlign='center'>Most Played: {mpc[0]}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Highest Score:{userHighScore} </Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>High Score Category:{userHighScoreCategory} </Header></Card.Content> 
                                </Card>
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    // style={{  height: 60, }}><TextContainer textAlign='center' verticalAlign='middle'>Total </TextContainer>