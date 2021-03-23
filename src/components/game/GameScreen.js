import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameInformationProvider"
import SpotifyPlayer from 'react-spotify-web-playback';
import { useHistory } from "react-router-dom";
import {Timer} from "./GameTimer"

  export const GameScreen = () =>{
    const history = useHistory();

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
      history.push("/select");
    }

    useEffect(() => {
      console.log(currentScore);
  },[])
  
    return(
      <>
        <form className="guessForm">
          <h2 className="">Enter your guess</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="trackName">Song Name</label>
              <input type="text" 
                id="answerSong" 
                name="answerSong" 
                required autoFocus     
                className="form-control"
                placeholder="Track Name"
                onChange={handleControlledInputChange}
              />

            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="artistName">Artist Name</label>
                  <input type="text" 
                    id="answerArtist" 
                    name="answerArtist" 
                    required autoFocus 
                    className="form-control"
                    placeholder="Artist Name"
                    onChange={handleControlledInputChange}
                  />
            </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleAnswerSubmit()
            }}><>Submit</>
          </button>
          
          <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
            }}><>Cancel</>
          </button>

        </form >
        <br/>
        <br/>
        <br/>
        <br/>
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
        <Timer
          endGame = {endGame}
        />
        <div>
        <br/>
        <br/>
          
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
      </>
    )
  }
//1: help getting current song info to update accordingly
//2: help getting system to check for spotify auth and react accodingly

//4: get application register/login together

//conditional to check local storage token for def
//keep in local storage