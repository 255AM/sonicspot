import React, { useState, useContext, createContext } from "react"
import { useHistory } from "react-router-dom"

// The context is imported and used by individual components that need data. ie gameselect/gamescreen. Info can be passed down to child elements through props at the bottom of the page

export const GameContext = createContext()

// Establsihing data to be used thtoughout, as well as spotify api navigation and spotify sdk navigation.
export const GameInformationProvider = (props) => {
    //music genre/decade/band selected by user. use this to go to server and return spotify playlist uri
    const [categoryId, setCategoryId] =  useState(0)
    //spotify playlist uri
    const [albumUri, setAlbumUri] = useState('')
    //local instance of spotify player (sdk). Need this info to start player in beginning, but afterwards it will be the only player existing and unneeded info
    const [playerId, setPlayerId] = useState('')
    //track info currently playing. from spotiy api, used to compare answers to
    const [trackInfo, setTrackInfo] = useState([{}])
    //currently logged in userName
    const [userName, setUserName] = useState('')
    //all data of currently logged in user
    const [currentUserObject, setCurrentUserObject]=useState({})
    const [games, setGames]=useState([])
    //localplaylist
    const [localPlaylist, setLocalPlaylist]=useState([])
    const [trackUri, setTrackUri] =useState('')
    const [playlistImage, setPlaylistImage]=useState('')
    const [categoryName, setCategoryName]=useState('')
    const [albumWriteup, setAlbumWriteup]=useState('')
    
    //user id of current user. held in local storage
    let id = localStorage.getItem('sonic_user')
    
    const history = useHistory()
    let arrayOfUris = []
    
    //take category id(hard coded unique for each choice of game) go to server and return a spotify URI. Set URI to state
    const getUri = (categoryId) => {
        return fetch(`http://localhost:8088/categories/${categoryId}`)
        .then(res => res.json())
        
        .then(res => {
          console.log(res.writeup);
          setAlbumUri(res.spotifyPlaylistUri)
          setCategoryName(res.name)
          setPlaylistImage(res.image)
          setAlbumWriteup(res.writeup)
        })
        .then(setCategoryId(categoryId))
    }

    





    //createa local playlist
    const getPlaylistAndShuffle = () =>{
      console.log('albume uri is ', albumUri);
      var myHeaders = new Headers();
      let toker = localStorage.getItem('spotifyAuthToken')
      myHeaders.append("Authorization", `Bearer ${toker}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    //                                            albumUri here in url
    return  fetch(`https://api.spotify.com/v1/playlists/${albumUri}/tracks?market=us&fields=items(track(uri))&limit=100`, requestOptions)
        .then(response => response.json())
        .then(res => {
              let arr = res.items.map((currentSong) =>{
            return(JSON.stringify(currentSong.track.uri))
            })
            arr = arr.sort(() => Math.random() - 0.5)
            arrayOfUris =arr
        })
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
    
      fetch("https://api.spotify.com/v1/me/player/devices", requestOptions)
        .then(response => response.json())
        .then(result => startTrack(result.devices[0].id))
        .then(getTrackInfo)
      }
    

    //holy shit stringify thank you thank you thank you!
    //actual track start call. is called above in getPlayerIdStartPlayer
    const startTrack = (deviceId) =>{
      console.log(trackUri);
      let toker = localStorage.getItem('spotifyAuthToken')
      var myHeaders = new Headers();
        
        myHeaders.append("Authorization",  `Bearer ${toker}`);
        myHeaders.append("Content-Type", "text/plain");
        
        
        var raw = `{\r\n  \"uris\":[${arrayOfUris}]\,\r\n  \"offset\": {\r\n    \"position\":0\r\n  },\r\n  \"position_ms\": 0\r\n}`;

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
        fetch("https://api.spotify.com/v1/me/player/currently-playing", requestOptions)
          .then(response => response.json())
          .then(result => setTrackInfo([{ artistName:result.item.artists[0].name, songName:result.item.name }]))
    }
    //take userid of localstorage and return current users userName
    const getUserName = () =>{
      return fetch(`http://localhost:8088/users/${id}`)
        .then(res => res.json())
        .then(res => res.userName)
        .then(setUserName)
    }
    //on logout set user to undefined and go to login page
    const handleLogoutClick = () =>{
      localStorage.setItem('sonic_user', 'undefined')
      history.push('/login')
    }
    //send id in localStorage and return current users dataObject
    const getCurrentUserObject = (currentUserId)=>{
     return fetch(`http://localhost:8088/users/${currentUserId}`)
        .then(res => res.json())
        .then(setCurrentUserObject)
    }
    //upon end of game, send data to jserver as object
    const setCurrentGameRecord = (gameObject)=>{
      fetch("http://localhost:8088/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            score: gameObject.score,
            categoryId: gameObject.category,
            userId:gameObject.userId
        })
      })
    }

    //Get top 10 scores for Leaderboard
    const getGames = () => {
      return fetch(`http://localhost:8088/games?_expand=user&_expand=category`)
      .then(res => res.json())

      .then(setGames)
    }

    return (
        <GameContext.Provider value={{
            getUri, categoryId, playerId, getPlayerIdStartPlayer, startTrack, nextTrack, getTrackInfo, trackInfo, getUserName, userName, handleLogoutClick, getCurrentUserObject, currentUserObject, setCurrentGameRecord, getGames, games, getPlaylistAndShuffle, localPlaylist, playlistImage, categoryName, albumWriteup
        }}>
            {props.children}
        </GameContext.Provider>
    )
      
}


