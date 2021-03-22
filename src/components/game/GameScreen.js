import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameInformationProvider"
import SpotifyPlayer from 'react-spotify-web-playback';



  export const GameScreen = () =>{

      const {playerId, getPlayerIdStartPlayer, nextTrack, getTrackInfo, trackInfo} = useContext(GameContext)

      const [answerState, setAnswerState] = useState({
        answerSong: ' ',
        answerArtist: ' '
      })

      const handleControlledInputChange = (event) => {
        const newAnswer = { ...answerState }
        newAnswer[event.target.name] = event.target.value
        setAnswerState(newAnswer)
    }
      const compareTrackAnswer=(trackInfo,answerState )=>{
        if (trackInfo.songName === answerState.answerSong){
          correctTrackAnswer()
        }else{
          incorrectTrackAnswer()
        }
      }

      const compareArtistAnswer=(trackInfo,answerState )=>{
        if (trackInfo.artistName === answerState.answerArtist){
          correctArtistAnswer()
        }else{
          incorrectArtistAnswer()
        }
      }
    const handleAnswerSubmit = () => {
      
      // check answer
      //handle stats/saving
      //fast forward next track
      getTrackInfo()
      compareTrackAnswer(trackInfo, answerState)
      compareArtistAnswer(trackInfo, answerState)
      nextTrack()
      }
      
       
  

  const correctTrackAnswer = () =>{
      console.log(`Thats it!!!! the song is  ${trackInfo.songName}`);
  }
  const incorrectTrackAnswer = ()=>{
    console.log(`Better luck next time! The name of this song is ${trackInfo.songName}`)
  }
  const correctArtistAnswer = () =>{
    console.log(`Thats right! This song was performed by ${trackInfo.artistName}`);
  }
  const incorrectArtistAnswer = ()=>{
  console.log(`You'll do better next time. That was a song by ${trackInfo.artistName}`)
  }

    
    const startPlayer = () =>{
      getPlayerIdStartPlayer()
    }


    return(
      <>
        <form className="guessForm">
            <h2 className="">Enter your guess</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="trackName">Song Name</label>
                    <input type="text" id="answerSong" name="answerSong" required autoFocus className="form-control"
                        placeholder="Track Name"
                        onChange={handleControlledInputChange}
                         
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="artistName">Artist Name</label>
                    <input type="text" id="answerArtist" name="answerArtist" required autoFocus className="form-control"
                        placeholder="Artist Name"
                        onChange={handleControlledInputChange}
                         
                        />
                </div>
            </fieldset>
            
            {/* //saving/updting */}
            <button className="btn btn-primary"
                // disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleAnswerSubmit()
                }}>
                
                <>Submit</></button>
            {/* //cancelling a save/update */}
                <button className="btn btn-primary"
                // disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    //handleCancelEvent()
                }}>
                {/* {EventId ? <>Save Event</> :  */}
                <>Cancel</></button>

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
            <div>
            <br/>
            <br/>
            
            <button className="btn btn-primary"
                onClick={event => {
                    event.preventDefault()
                    getPlayerIdStartPlayer()
                    
                     // Prevent browser from submitting the form and refreshing the page
                }}>Play
            </button>
            <button className="btn btn-primary"
                onClick={event => {
                    event.preventDefault()
                    nextTrack()
                    
                     // Prevent browser from submitting the form and refreshing the page
                }}>Next
            </button>
            <button className="btn btn-primary"
                onClick={event => {
                    event.preventDefault()
                    getTrackInfo()
                    
                     // Prevent browser from submitting the form and refreshing the page
                }}>info
            </button>
        </div>
        </>
        )
  }
