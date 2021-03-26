import React, { useState, useContext, createContext } from "react"

// The context is imported and used by individual components that need data. ie gameselect/gamescreen. Info can be passed down to child elements through props at the bottom of the page

export const GameContext = createContext()

// This component establishes what data can be used.
export const GameInformationProvider = (props) => {
    const [categoryId, setCategoryId] =  useState(0)
    const [uri, setUri] = useState('')
    const [playerId, setPlayerId] = useState('')
    const [trackInfo, setTrackInfo] = useState({})
    const [userName, setUserName] = useState('')
    let id = localStorage.getItem('sonic_user')

    //category id unique id hard coded to each button choice. THis fetch will use that Id to return a URI that spotify will recognize as a playlist
    
    const getUri = (categoryId) => {
        return fetch(`http://localhost:8088/categories/${categoryId}`)
        .then(res => res.json())
        .then(res => res.spotifyPlaylistUri)
         .then(setUri)
         .then(console.log(uri));
    }

    //Call gets spotify sdk player id and uses that id to start album playback
    const getPlayerIdStartPlayer = () => {
    var myHeaders = new Headers();
      let toker = localStorage.getItem('spotifyAuthToken')
      myHeaders.append("Authorization", `Bearer ${toker}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    //call start here
      fetch("https://api.spotify.com/v1/me/player/devices", requestOptions)
        .then(response => response.json())
        .then(result => startAlbum(result.devices[0].id))
        .then(getTrackInfo)
    }
    
    //actual album start call. is called above in getPlayerIdStartPlayer
    const startAlbum = (deviceId) =>{
      console.log(uri);
      // let uri = "spotify:playlist:6TeyryiZ2UEf3CbLXyztFA"
      let toker = localStorage.getItem('spotifyAuthToken')
      var myHeaders = new Headers();
        
        myHeaders.append("Authorization",  `Bearer ${toker}`);
        myHeaders.append("Content-Type", "text/plain");
        
        var raw = `{\r\n  \"context_uri\": \"${uri}\",\r\n  \"offset\": {\r\n    \"position\": 0\r\n  },\r\n  \"position_ms\": 0\r\n}`;

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
          .then(getTrackInfo)
          
            }

    const nextTrack = () =>{
      var myHeaders = new Headers();
      let toker = localStorage.getItem('spotifyAuthToken')
      myHeaders.append("Authorization", `Bearer ${toker}`);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://api.spotify.com/v1/me/player/next", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(getTrackInfo)
          .catch(error => console.log('error', error));
            }

    const getTrackInfo = () => {
      var myHeaders = new Headers();
        let toker = localStorage.getItem('spotifyAuthToken')
        myHeaders.append("Authorization", `Bearer ${toker}`);
  
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
  //call start here
  
        fetch("https://api.spotify.com/v1/me/player/currently-playing", requestOptions)
          .then(response => response.json())
          .then(result => setTrackInfo({ artistName:result.item.artists[0].name, songName:result.item.name }))
      }

      const getUserName = () =>{
        return fetch(`http://localhost:8088/users/${id}`)
          .then(res => res.json())
          .then(res => res.userName)
          .then(setUserName)
           
           
      }

      

    return (
        <GameContext.Provider value={{
            uri, getUri, categoryId, playerId, getPlayerIdStartPlayer, startAlbum, nextTrack, getTrackInfo, trackInfo, getUserName, userName
        }}>
            {props.children}
        </GameContext.Provider>
    )
      
      }


