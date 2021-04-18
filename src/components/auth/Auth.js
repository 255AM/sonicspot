import React, { Component } from 'react';
import {Button, Header} from 'semantic-ui-react'


//get spotify auth and return token from hash
class SpotifyAuth extends Component {  
  constructor (props) {
    super(props);
    this.state = {
      isAuthenticatedWithSpotify: false,
    //   menu: this.props.userId.menu
    };
    this.state.handleRedirect = this.handleRedirect.bind(this);
  };
  generateRandomString(length) {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
    } 

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  
  componentDidMount() {
     ////if (this.props.isAuthenticated) {
    const params = this.getHashParams();
    
      console.log(params)
    const access_token = params.access_token;
    console.log('hihihih');
    const state = params.state;
    const storedState = localStorage.getItem('stateKey');
    localStorage.setItem('spotifyAuthToken', access_token);
    localStorage.getItem('spotifyAuthToken');
    

    if (window.localStorage.getItem('spotifyAuthToken')) {
      this.setState({ isAuthenticatedWithSpotify: true });
    };
    if (access_token && (state == null || state !== storedState)) {
      alert('Click "ok" to finish authentication with Spotify');
    } else {
      localStorage.removeItem('stateKey');
    }
    
  };
//}

  handleRedirect(event) {
    event.preventDefault()
    console.log('You linked your Spotify account!', 'success');

    const params = this.getHashParams();
    const access_token = params.access_token;
    console.log(access_token);

    const state = this.generateRandomString(16);
    localStorage.setItem('stateKey', state);

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent('6129ade14f2c4dbda3511c026bd444ad');
    url += '&scope=' + encodeURIComponent('user-read-private%20streaming%20user-read-email%20streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-library-read%20user-library-modify');
    
    
    //***********************************************************************************************FJKDFHDHFHJKDHFJKHDJKFH */
    ////////////#$%$#%$#$#%^#%^$#$#$  If running local, change to http://localhost:3000/login if heroku change to https://sonicspot.herokuapp.com/login

    url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000/login');
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=' + encodeURIComponent(true);
    window.location = url; 
  };

  render() {
    return (
      <div className="button_container">
          
          <Header style={{fontSize: 50}}className="title is-4"><font color="#121212">Please Log In To Your Premium Spotify Account</font></Header>
          <div className="Line" /><br/>
          <Button color='green' fluid size='large' type="submit" onClick={(event) => this.handleRedirect(event)}>
          Sign In To Spotify
          </Button>
      </div>
    )
  }
}
export default SpotifyAuth;

