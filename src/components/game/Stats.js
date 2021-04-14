import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameInformationProvider"
import { Container,GridColumn, Header} from "semantic-ui-react"
import './Leaderboard.css'
import './Stats.css'
import { Card, Menu,  Grid, } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"



    //simply precessing a bunch of data for a stats page. consider storing all data in object
    export const Stats = ()=>{
        let i=0
        const history  = useHistory()
        const { handleLogoutClick, currentUserObject} = useContext(GameContext)   
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
        let averageScore = usersGames.reduce((a, b) => a + b.score, 0)/(usersGames.length) 
        let fAverageScore = averageScore.toFixed(1)
        let sortedByScore =  usersGames?.sort((a, b) => (a.score > b.score) ? -1 : 1)
        let totalAnswers = totalSongs*2
        
        let userHighScore = sortedByScore[0]?.score
        let userHighScoreCategory = sortedByScore[0]?.category.name
        let nums = usersGames.map((a)=>(a.categoryId))
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

                <Grid style={{ backgroundColor: '#121212', fontSize:23,}}>
                    <GridColumn>
                        <Container >
                            <Header textAlign='center' style={{  height: 100,color:'#121212'}} ></Header>
                        </Container>
                    </GridColumn>
                </Grid>
                <Grid style={{ backgroundColor: '#121212', }}>
                    <Grid.Column>
                        <Grid.Row >
                            <Card.Group centered>
                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content style={{backgroundColor: "#1DB954" , color: 'white'}}><Header textAlign='center'>Games</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Games Played: {usersGames.length}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Points Scored: {totalPoints}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Average Score: {fAverageScore}</Header></Card.Content> 
                                </Card>
                                
                                <Card fluid color='black' style={{  width: 300, }}>
                                    <Card.Content color='black' style={{backgroundColor: "#1DB954"}}><Header textAlign='center'>Overall</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Answers: {totalAnswers}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Correct Answers: {totalCorrectGuesses}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Answer Accuracy:  {totalGuessPercentages} %</Header></Card.Content> 
                                </Card>

                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content style={{backgroundColor: "#1DB954"}}><Header textAlign='center'>Songs</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Total Songs Played: {totalSongs}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Correct Song Answers: {songCorrectGuesses}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Song Answer Accuracy:  {songGuessPercentages} % </Header></Card.Content> 
                                </Card>

                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content style={{backgroundColor: "#1DB954"}}><Header textAlign='center'>Artists</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Songs Played: {totalSongs}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Correct Artist Answers: {artistCorrectGuesses}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Artist Answer Accuracy:  {artistGuessPercentages} %</Header></Card.Content> 
                                </Card>

                                <Card fluid style={{  width: 300, }}>
                                    <Card.Content style={{backgroundColor: "#1DB954"}}><Header textAlign='center'>Categories</Header></Card.Content>
                                        <Card.Content><Header textAlign='center'>Most Played: {mpc[0]}</Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Highest Score: {userHighScore} </Header></Card.Content>
                                    <Card.Content><Header textAlign='center'>Best Category: {userHighScoreCategory} </Header></Card.Content> 
                                </Card>
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
               
            </div>
        )
    }
    