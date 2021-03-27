import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameInformationProvider"
import SpotifyPlayer from 'react-spotify-web-playback';
import { useHistory, Link } from "react-router-dom";
import {Timer} from "./GameTimer"
import { Form, Container, Modal, Button, Image, Header, Grid, Icon, Segment, Menu} from 'semantic-ui-react'
import { AnswerCard } from "./AnswerResponse";

export const GameScreen = () =>{
    const history = useHistory();
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(true)
    const [game, setGame] = React.useState(false)
    const [songResponse, setSongResponse] = React.useState(' ')
    const [artistResponse, setArtistResponse] = React.useState(' ')
    
    
    const {getPlayerIdStartPlayer, nextTrack, getTrackInfo, trackInfo, uri, handleLogoutClick, setCurrentGameRecord, categoryId} = useContext(GameContext)
    
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
      console.log(getTrackInfo())
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
      setAnswerState({
          answerSong: ' ',
          answerArtist: ' '
        });
        nextTrack()
      }
      
    const correctTrackAnswer = () =>{
      setCurrentScore(currentScore => currentScore + 1)
      setSongResponse(`Thats it!!!! the song is "${trackInfo.songName}". You earn 1 point!`)
    }

    const incorrectTrackAnswer = ()=>{
      setSongResponse( `Better luck next time. The name of this song is "${trackInfo.songName}"`)
    }
    
    const correctArtistAnswer = () =>{
      setCurrentScore(currentScore => currentScore + 1)
      setArtistResponse( `Thats it!!!! the song is "${trackInfo.artistName}" You earn 1 point!`)
    }
    
    const incorrectArtistAnswer = ()=>{
      setArtistResponse( `Wrong. That was a song by "${trackInfo.artistName}"`)
    }

    const startPlayer = () =>{
      getPlayerIdStartPlayer()
      console.log('here');
    }

    const endGame = () =>{
      console.log('endgame');
      setCurrentGameRecord({
        score:currentScore,
        category:categoryId,
        userId: localStorage.getItem('sonic_user')

      })
      setOpen1(true)
    }

    

    useEffect(() => {
      
    },[])
  
    return(
      <>
        < Menu>
                    <Menu.Menu position='right'>
                    
                    <Menu.Item
                        name='logout'
                        onClick={handleLogoutClick}
                    />
                    </Menu.Menu>
                    
                </Menu>

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 900 }}>
        <Container>
        {game?<Timer
          endGame = {endGame}
        />
        :
        ""}
        </Container>
          
          <Form size='large'>
            <Segment stacked>
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

                      onClick={
                        () => setOpen1(false),
                        () => history.push('/')
                      }
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
                        startPlayer()
                        setGame(true)
                      }
                        
                      }
                      positive
                    />
                  </Modal.Actions>
                </Modal>
            </div>
          </>
    )
  }
//1: help getting current song info to update accordingly
//2: help getting system to check for spotify auth and react accodingly

//4: get application register/login together

//conditional to check local storage token for def
//keep in local storage

// "spotify:playlist:6TeyryiZ2UEf3CbLXyztFA"