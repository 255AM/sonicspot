import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameInformationProvider"
import SpotifyPlayer from 'react-spotify-web-playback';
import { useHistory} from "react-router-dom";
import {Timer} from "./GameTimer"
import { Form, Container, Modal, Button, Image, Header, Grid, Icon, Segment, Menu} from 'semantic-ui-react'
import { AnswerCard } from "./AnswerResponse";
import Fuse from 'fuse.js'
import './GameScreen.css'

let songsPlayed=0
    let artistGuessCorrect=0
    let songGuessCorrect=0
    //later feature let avgAnswerTime
    let postGamePlaylist=[]

export const GameScreen = () =>{
    const history = useHistory();
    //flag to control a modal
    const [open1, setOpen1] = React.useState(false)
    //flag to control a modal
    const [open2, setOpen2] = React.useState(true)
    //set a game object to state. Keeping track of game stats
    const [game, setGame] = React.useState(false)
    //determines the feedback a user recieves after guessing. right or wrong
    const [songResponse, setSongResponse] = React.useState('')
    const [artistResponse, setArtistResponse] = React.useState('')
    //keeping current score in state
    const [currentScore, setCurrentScore] = useState(0)
    //get userOBject to set userName to gameObject
    
    
    const {getPlayerIdStartPlayer,nextTrack,trackInfo,handleLogoutClick,setCurrentGameRecord,categoryId,currentUserObject,getPlaylistAndShuffle, categoryName, playlistImage, currentImage, albumWriteup}=useContext(GameContext)
    //data that is being entered by user at form inputs is set to state
    const [answerState, setAnswerState] = useState({
      answerSong: '',
      answerArtist: ''
    })
    //handling form inputs(user guess)
    const handleControlledInputChange = (event) => {
      const newAnswer = { ...answerState }
      newAnswer[event.target.name] = event.target.value
      setAnswerState(newAnswer)
    }
    //on submit, compare guesses to actual data// using Fuse Js package to allow close but not perfect responses/ see Fuse.JS for details. .40 is strictness, closer to 0 the stricter the answer must be
    const compareTrackAnswer=(trackInfo,answerState )=>{
      let userAnswer = answerState.answerSong
      let results
      songsPlayed+=1
      let ftcorrectAnswer = new Fuse(trackInfo,{
        keys:[
          "songName"
        ], includeScore:true
      })
      
      results = ftcorrectAnswer.search(userAnswer)
        if (results[0] && results[0].score < .40){
          correctTrackAnswer()
        }else{
          incorrectTrackAnswer()
        }
    }
    
    //on submit, compare guesses to actual data    ***look into combining this and previous fx*****
    const compareArtistAnswer=(trackInfo,answerState )=>{
      
      let userAnswer = answerState.answerArtist 
      let aresults
      let facorrectAnswer = new Fuse(trackInfo,{
        keys:[
          'artistName'
        ],includeScore:true
      })   
      aresults = facorrectAnswer.search(userAnswer)
      if (aresults[0] && aresults[0].score < .40){
        correctArtistAnswer()
      }else{
        incorrectArtistAnswer()
      }
    }
    
    const handleAnswerSubmit = () => {
      compareTrackAnswer(trackInfo, answerState)
      compareArtistAnswer(trackInfo, answerState)
      //reset form to empty after guess submit
      setAnswerState({
          answerSong: '',
          answerArtist: ''
        });
        postGamePlaylist.push({trackName:trackInfo[0].songName, artistName:trackInfo[0].artistName,uri: trackInfo})
        console.log(postGamePlaylist);
        nextTrack()
      }
      
    const correctTrackAnswer = () =>{
      setCurrentScore(currentScore => currentScore + 1)
      setSongResponse(`Thats it!!!! the song is "${trackInfo[0].songName}". You earn 1 point!`)
      songGuessCorrect+=1
    }

    const incorrectTrackAnswer = ()=>{
      setSongResponse( `Better luck next time. The name of this song is "${trackInfo[0].songName}"`)
    }
    
    const correctArtistAnswer = () =>{
      setCurrentScore(currentScore => currentScore + 1)
      setArtistResponse( `Thats it!!!! the song is by"${trackInfo[0].artistName}" You earn 1 point!`)
      artistGuessCorrect+=1
    }
    
    const incorrectArtistAnswer = ()=>{
      setArtistResponse( `Wrong. That was a song by "${trackInfo[0].artistName}"`)
    }

    const startPlayer = () =>{
      getPlayerIdStartPlayer()
      songsPlayed+=1
      console.log('here');
    }

    const endGame = () =>{
      console.log('endgame');
      
      setOpen1(true)
    }
    // record game object on game end
    const recordGame = () =>{
      console.log('im runnign');
      setCurrentGameRecord({
        score:currentScore,
        category:categoryId,
        userId: localStorage.getItem('sonic_user'),
        artistGuessCorrect: artistGuessCorrect,
        songGuessCorrect: songGuessCorrect,
        avgAnswerTime: 0,
        songsPlayed: songsPlayed
      })
    }
    
    useEffect(() => {
      
    },[])
  
    return(
      
      <div className = 'gameDiv'>
        <Menu style={{ backgroundColor: '', height: 10,     fontSize:20}}>  
          <Menu.Menu position='left'>
            <Menu.Item
              position='left'
              name='leaderboard'
              onClick={()=>history.push('./leaderboard')}
            >
              Leaderboard
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

        <Grid.Row style={{ color: 'white', backgroundColor: '#121212', height: 10, fontSize:35}} >
                    <Header style={{ color: 'white', backgroundColor: '', height: 300, fontSize:45}}textAlign='center'>Can You Hear The Music</Header>

        </Grid.Row>
        <Grid.Row style={{ color: '', backgroundColor: '#121212', height: 100, fontSize:35}} >
                    <Header style={{ color: 'white', backgroundColor: '', height: 200, fontSize:45}}textAlign='center'></Header>

        </Grid.Row>
        
        <Grid  textAlign='center' verticalAlign='middle' style={{ backgroundColor: '#121212', }}  >
          <Grid.Column style={{ maxWidth: 900 }}>

              <Header dividing textAlign='center' centered style = {{backgroundColor: 'white', fontSize:30, height:35}}>You currently have {currentScore} points!</Header>
              <Container fluid style={{ color: 'white', backgroundColor: 'white', height: 50, fontSize:10}}>
              {/* //on game start(triggered by start modal button) start timer// If no game, no timer */}
              {game?
              <Timer endGame = {endGame}
              />
              :
              ""}
              </Container>
            <Form size='large'>
              <Segment stacked style={{backgroundColor:'#1DB954'}}>
                <Form.Input
                  focus='true'
                  style={{ color: 'yellow', }}
                  size='big' 
                  placeholder='Song Title'
                  name='answerSong'
                  id='answerSong'
                  value={answerState.answerSong}
                  onChange={handleControlledInputChange} 
                />
                <Form.Input
                  size='big'
                  placeholder='Artist Name'
                  name='answerArtist'
                  id='answerArtist'
                  value={answerState.answerArtist}
                  onChange={handleControlledInputChange}
                />
                <Button animated
                  size='huge'
                  onClick={event => {
                    event.preventDefault()
                    handleAnswerSubmit()
                  }}>
                <Button.Content visible>Next Song</Button.Content>
                <Button.Content hidden>
                <Icon name='fast forward' />
                </Button.Content>
                </Button>
                <AnswerCard 
                songResponse = {songResponse}
                artistResponse = {artistResponse}
              />
              </Segment>
              
            </Form>
          </Grid.Column>
          </Grid>
          {/* //Modal that opens on game start//timer begins after start button pressed//strectch goal, random photos from spotify album covers */}
          <Modal
          size='large'
          onClose={() => setOpen2(false)}
          onOpen={() => setOpen2(true)}
          open={open2}
          
          >
          <Modal.Header>Are You ready?</Modal.Header>
          <Modal.Content image>
            <Image size='large' src={playlistImage} wrapped />
            <Modal.Description>
              <Header style={{ fontSize:30,backgroundColor:"#1DB954"}}>{categoryName}</Header>
              <Container style={{ fontSize:15,  }}><Header>{albumWriteup}</Header></Container>
                
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button
              content="Back To Menu"
              labelPosition='center'
              icon='caret square left'
              color='black'

              onClick={event=>{
                event.preventDefault()
                setOpen2(false)
                history.push('/')
              }}
                
            />
            
            <Button
              content="Play!"
              labelPosition='right'
              icon='checkmark'

              onClick={event=>{
                event.preventDefault()
                setOpen2(false)
                getPlaylistAndShuffle().then(startPlayer)
                setGame(true)
                
              }}
                positive
            />
            
            
            </Modal.Actions>
            </Modal>
        
            {/* //Modal on game end//  */}
            <Modal
             onClose={() => setOpen1(false)}
              onOpen={() => setOpen1(true)}
              open={open1}
              
            >
              <Modal.Header ><h2 class="ui block blue header">It's all over now</h2></Modal.Header>
              <Modal.Content image>
                  <Image size='medium' src={currentImage} wrapped />
                <Modal.Description>
                <Header>This is the end</Header>
                <h2 class="ui block header">
                  Your final score is {currentScore}
                </h2>
            </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button
              content="Take me Back"
              labelPosition='right'
              icon='checkmark'

              onClick={event=>{
                recordGame()
                setOpen1(false)
                history.push('/')
              }}
              positive
            />
          </Modal.Actions>
          </Modal>
              
          <Grid.Row style={{ color: 'white', backgroundColor: '#121212', height: 300, fontSize:35}} >
                    

          </Grid.Row>
        {/* spotify react player. it is hidden from view ingame screen */}
        <div>
          <SpotifyPlayer
            token= {localStorage.getItem("spotifyAuthToken")}
            uris={["spotify:track:0BM8wPzuihqUE561Poj2b7", "spotify:track:4OpB5ExXiVjj1f3gMfTw4u", "spotify:track:5i3m1HZBzurdMu9zzjBY7r"]}
            styles={{
              activeColor: 'black',
              bgColor: 'black',
              color: 'black',
              loaderColor: 'black',
              sliderColor: 'black',
              sliderTrackColor: 'black',
              sliderHandleColor: 'black',
              trackArtistColor: 'black',
              trackNameColor: 'black',
              height: 0,
            }}
          /> 
        </div>
        </div>
      
    )
}


