import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameInformationProvider"
import SpotifyPlayer from 'react-spotify-web-playback';
import { useHistory, Link } from "react-router-dom";
import {Timer} from "./GameTimer"
import { Form, Container, Modal, Button, Image, Header, Grid, Icon, Segment, Menu} from 'semantic-ui-react'
import { AnswerCard } from "./AnswerResponse";
import Fuse from 'fuse.js'

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
    
    const {getPlayerIdStartPlayer,nextTrack,trackInfo,handleLogoutClick,setCurrentGameRecord,categoryId,currentUserObject,getPlaylistAndShuffle, getUri,localPlaylist }=useContext(GameContext)
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
    //on submit, compare guesses to actual data
    const compareTrackAnswer=(trackInfo,answerState )=>{
      let userAnswer = answerState.answerSong
      let results
      let ftcorrectAnswer = new Fuse(trackInfo,{
        keys:[
          "songName"
        ], includeScore:true
      })
      
      results = ftcorrectAnswer.search(userAnswer)
        if (results[0] && results[0].score < .01){
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
      if (aresults[0] && aresults[0].score < .01){
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
        nextTrack()
      }
      
    const correctTrackAnswer = () =>{
      setCurrentScore(currentScore => currentScore + 1)
      setSongResponse(`Thats it!!!! the song is "${trackInfo[0].songName}". You earn 1 point!`)
    }

    const incorrectTrackAnswer = ()=>{
      setSongResponse( `Better luck next time. The name of this song is "${trackInfo[0].songName}"`)
    }
    
    const correctArtistAnswer = () =>{
      setCurrentScore(currentScore => currentScore + 1)
      setArtistResponse( `Thats it!!!! the song is "${trackInfo[0].artistName}" You earn 1 point!`)
    }
    
    const incorrectArtistAnswer = ()=>{
      setArtistResponse( `Wrong. That was a song by "${trackInfo[0].artistName}"`)
    }

    const startPlayer = () =>{
      getPlayerIdStartPlayer()
      console.log('here');
    }

    const endGame = () =>{
      console.log('endgame');
      
      setOpen1(true)
    }
    //This could and was done on the endGame fx above, but a timer glitch was running it 2x. Here for now on button press
    const recordGame = () =>{
      console.log('im runnign');
      setCurrentGameRecord({
        score:currentScore,
        category:categoryId,
        userId: localStorage.getItem('sonic_user')
      })
    }

    useEffect(() => {
      
      
    },[])
  
    return(
      <>
       <Menu className = "menu">
            <Menu.Menu position='right'>
            </Menu.Menu>
            <Header style={{ marginLeft:150, fontSize:50}}size='huge'>A game that is a game</Header>
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
        <Button
              content="Take me Back"
              labelPosition='right'
              icon='checkmark'

              onClick={event=>{
                startPlayer()
              }}
              positive
            />
        <Grid  textAlign='center' verticalAlign='middle' style={{ backgroundColor: 'white', height: '100vh' }}  >
          <Grid.Column style={{ maxWidth: 900 }}>
            <Container>
              {/* //on game start(triggered by start modal button) start timer// If no game, no timer */}
              {game?
              <Timer endGame = {endGame}
              />
              :
              ""}
            </Container>
          
            <Form size='large'>
              <Segment stacked style={{backgroundColor:'darkgrey'}}>
                <Form.Input
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
              </Segment>
              <AnswerCard 
                songResponse = {songResponse}
                artistResponse = {artistResponse}
              />
            </Form>
          </Grid.Column>
        </Grid>
        {/* //Modal that opens on game start//timer begins after start button pressed//strectch goal, random photos from spotify album covers */}
        <Modal
          onClose={() => setOpen2(false)}
          onOpen={() => setOpen2(true)}
          open={open2}
          trigger={<Button>Show Modal Start</Button>}
        >
          <Modal.Header>Are You ready?</Modal.Header>
          <Modal.Content image>
            <Image size='medium' src='https://cdn.playlists.net/images/playlists/image/medium/be12e4184e26063a2e68c1accad6f370.jpg' wrapped />
            <Modal.Description>
              <Header>Come on it's time to go</Header>
                <h2 class="ui block header">
                  Begin
                </h2>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Enter"
              labelPosition='right'
              icon='checkmark'

              onClick={event=>{
                event.preventDefault()
                setOpen2(false)
                getPlaylistAndShuffle()
                setGame(true)
                //setTimeout(startPlayer, 5000);
                //startPlayer()
              }}
                positive
            />
            
          </Modal.Actions>
        </Modal>
        
        {/* //Modal on game end// in future add song stop when show modal true */}
        <Modal
          onClose={() => setOpen1(false)}
          onOpen={() => setOpen1(true)}
          open={open1}
          trigger={<Button>Show Modal End</Button>}
        >
          <Modal.Header ><h2 class="ui block blue header">It's all over now</h2></Modal.Header>
          <Modal.Content image>
            <Image size='medium' src='https://cdn.mos.cms.futurecdn.net/Er7f2aS9ukBKBsVfR2Z9uE.jpg' wrapped />
            <Modal.Description>
              <Header>This is the end</Header>
                <h2 class="ui block header">
                  You're out of time
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
                
        <div>
          <SpotifyPlayer
            token= {localStorage.getItem("spotifyAuthToken")}
            uris={["spotify:playlist:6TeyryiZ2UEf3CbLXyztFA"]}
            styles={{
              activeColor: '#fff',
              bgColor: '#fff',
              color: '#fff',
              loaderColor: '#fff',
              sliderColor: '#fff',
              sliderTrackColor: '#fff',
              sliderHandleColor: '#fff',
              trackArtistColor: '#fff',
              trackNameColor: '#fff',
              height: 1,
            }}
          /> 

          
        </div>
      </>
    )
}

// var raw = `{\r\n  \"uris\":["spotify:track:0hCB0YR03f6AmQaHbwWDe8","spotify:track:0hCB0YR03f6AmQaHbwWDe8","spotify:track:0hCB0YR03f6AmQaHbwWDe8"],\r\n  \"offset\": {\r\n    \"position\": 0\r\n  },\r\n  \"position_ms\": 0\r\n}`;
