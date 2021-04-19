import React, { useState, useRef, useEffect } from "react"
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'
import SpotifyAuth from "./Auth";


export const Login = props => {
    
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()
    const [loggedIn, setLoggedIn] = useState('')
    const [spotifyLoggedIn, setSpotifyLoggedIn] = useState('')


    const existingUserCheck = () => {
        return fetch(`https://sonicserve.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const checkLogged=()=>{
        localStorage.getItem('sonic_user')==true && localStorage.getItem('sonic_user') != 'undefined' ?
        setLoggedIn(true)
        :
        setLoggedIn(false)
    }
    const checkSpotifyLogged=()=>{
        localStorage.getItem('spotifyAuthToken')==true && localStorage.getItem('spotifyAuthToken') != 'undefined' ?
        setSpotifyLoggedIn(true)
        :
        setSpotifyLoggedIn(false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
        //if email entered exists in users, set userid as user in local storage and go to select menu if doesnt exist alert user
            .then(exists => {
                if (exists) {
                    localStorage.setItem("sonic_user", exists.id)
                    setLoggedIn(true)
                    history.push('/login')
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    useEffect(() => {
      checkLogged()
     let x=()=>setTimeout(checkSpotifyLogged(),5000)
    },[loggedIn], [spotifyLoggedIn])

    return (
        <>    
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                
                    {loggedIn ? (
                        spotifyLoggedIn ? <Button color='green' fluid size='large' type="submit">
                                            Login
                                        </Button>:

                        <>
                        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Container>
                                <SpotifyAuth/>
                            </Container>
                            <Header as='h1' color='#121212' textAlign='center'>Can you hear the music?
                            </Header>
                        </Grid.Column>
                        </Grid>
                        </>
                    ) : (
                        <>       
                        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>       
                                <Header as='h2' color='#121212' textAlign='center'>
                                Sign in to your account
                                </Header>
                                <Form size='large' onSubmit={handleLogin}>
                                    <Segment stacked>
                            
                                        <input ref={email} 
                                            type="email"
                                            id="email" 
                                            required autoFocus
                                            fluid icon='user' 
                                            iconPosition='left' 
                                            placeholder='E-mail address' 
                                        />
                                        <Button color='green' fluid size='large' type="submit">
                                        Login
                                        </Button>
                                    </Segment>
                                </Form>
                                <Message>
                                    New to us? <Link to="/register">Sign Up</Link>
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </>
      )
      
      }
                              
       </>)
}             
                
            
              
