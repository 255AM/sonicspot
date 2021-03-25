import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameInformationProvider"
import SpotifyPlayer from 'react-spotify-web-playback';
import { useHistory, Link } from "react-router-dom";
import {Timer} from "./GameTimer"
import { Form, Container, Modal, Button, Image, Header, Grid, Icon, Segment} from 'semantic-ui-react'





  export const GameScreen = () =>{
    const history = useHistory();
    const [open, setOpen] = React.useState(false)

    const {getPlayerIdStartPlayer, nextTrack, getTrackInfo, trackInfo} = useContext(GameContext)
    
    const [answerState, setAnswerState] = useState({
      answerSong: ' ',
      answerArtist: ' '
    })
    const [currentScore, setCurrentScore] = useState(0)

    const handleControlledInputChange = (event) => {
      const newAnswer = { ...answerState }
      newAnswer[event.target.name] = event.target.value
      setAnswerState(newAnswer)
    }
    
    const compareTrackAnswer=(trackInfo,answerState )=>{
      let userAnswer = trackInfo.songName.toLowerCase()
      let correctAnswer = answerState.answerSong.toLowerCase()
      if (userAnswer.includes(correctAnswer)||correctAnswer.includes(userAnswer) === answerState.answerArtist){
        correctTrackAnswer()
      }else{
        incorrectTrackAnswer()
      }
    }

    const compareArtistAnswer=(trackInfo,answerState )=>{
      getTrackInfo()
      let userAnswer = trackInfo.artistName.toLowerCase()
      let correctAnswer = answerState.answerArtist.toLowerCase()
      if (userAnswer.includes(correctAnswer)||correctAnswer.includes(userAnswer) === answerState.answerArtist){
        correctArtistAnswer()
      }else{
        incorrectArtistAnswer()
      }
    }
    
    const handleAnswerSubmit = () => {
      compareTrackAnswer(trackInfo, answerState)
      compareArtistAnswer(trackInfo, answerState)
      nextTrack()
    }
    
    const correctTrackAnswer = () =>{
      console.log(`Thats it!!!! the song is ${trackInfo.songName}`);
      setCurrentScore(currentScore => currentScore + 1)
    }

    const incorrectTrackAnswer = ()=>{
      console.log(`Better luck next time! The name of this song is ${trackInfo.songName}`)
    }
    
    const correctArtistAnswer = () =>{
      console.log(`Thats it!!!! the song is ${trackInfo.songName}`);
      setCurrentScore(currentScore => currentScore + 1)
    }
    
    const incorrectArtistAnswer = ()=>{
    console.log(`Maybe next time. That was a song by ${trackInfo.artistName}`)
    }

    const startPlayer = () =>{
      getPlayerIdStartPlayer()
      getTrackInfo()
      
      //future//a put call will be made creating a new game in the db. A variable will be created that will keep track of the users points scored
    }

    const endGame = () =>{
      console.log(currentScore);
      setOpen(true)
    }

    useEffect(() => {
      console.log(currentScore);
  },[])
  
    return(
      <>

        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 900 }}>
        <Container>
        <Timer
          endGame = {endGame}
        />
        </Container>
          
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                size='big' 
                placeholder='Song Title'
                name='answerSong'
                id='answerSong'
                onChange={handleControlledInputChange} 
              />
              <Form.Input
                size='big'
                placeholder='Artist Name'
                name='answerArtist'
                id='answerArtist'
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
              </Form>
              </Grid.Column>
              </Grid>
         
        <div>
        
          
        <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            startPlayer()
          }}>Play
        </button>
        <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            nextTrack()
          }}>Next
        </button>
        <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            getTrackInfo()
          }}>info
        </button>
        <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            endGame()
          }}>endGame
        </button>
        </div>

        <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Button>Show Modal</Button>}
                >
                  <Modal.Header>Select a Photo</Modal.Header>
                  <Modal.Content image>
                    <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                    <Modal.Description>
                      <Header>Game Over!!!</Header>
                      <p>
                        You're out of time!!
                        Youre final score is {currentScore}
                      </p>
                      
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                      Nope
                    </Button>
                    <Button
                      content="Yep, that's me"
                      labelPosition='right'
                      icon='checkmark'

                      onClick={
                        () => setOpen(false),
                        () => history.push('/select')
                      }
                      positive
                    />
                  </Modal.Actions>
                </Modal>
                <div>
          <SpotifyPlayer
            token= {localStorage.getItem("spotifyAuthToken")}
            uris={[`spotify:playlist:6TeyryiZ2UEf3CbLXyztFA`]}
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
//1: help getting current song info to update accordingly
//2: help getting system to check for spotify auth and react accodingly

//4: get application register/login together

//conditional to check local storage token for def
//keep in local storage