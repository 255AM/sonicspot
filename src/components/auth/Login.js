import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import "./Login.css"

export const Login = props => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("sonic_user", exists.id)
                    history.push("/select")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
            localStorage.getItem("spotifyAuthToken") === 'undefined'
            ? 
            <>
            <h2><font color="neonorange">SonicSpot -The Game</font></h2>
            <h4><font color="green">Exactly like name that tune but different</font></h4>

            <address>
                <div>Visit Us </div>
                <div></div>
            </address>

            <button onClick={() => history.push("/select")}>
            Trigger Authed
            </button>
            </>  
            :
            <>
                <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h1' color='black' textAlign='center'>Can you hear the music?
                    </Header>
                    
                    <Header as='h2' color='black' textAlign='center'>
                    <Image src={require('./note.png')} size='small' /> Sign in to your account
                    </Header>
                    <Form size='large' onSubmit={handleLogin}>
                    <Segment stacked>
                        {/* <Form.Input  */}
                        <input ref={email} 
                        type="email"
                        id="email" 
                        required autoFocus
                        fluid icon='user' 
                        iconPosition='left' 
                        placeholder='E-mail address' 
                        />
                        
                        <input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        />
            
                        <Button color='blue' fluid size='large' type="submit">
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
        
        
        
        
        
        
    //     <main className="container-login">
    //         <Container  textAlign='center'>
    //         <header className = 'title'>//A Game//</header>
    //         </Container>
    //         <dialog className="dialog dialog--auth" ref={existDialog}>
    //             <div>User does not exist</div>
    //             <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
    //         </dialog>

    //         <section>
    //             <form className="form--login" onSubmit={handleLogin}>
    //                 <h1>Game where you guess the name of the song</h1>
    //                 <h2>Please sign in</h2>
    //                 <fieldset>
    //                     <label htmlFor="inputEmail"> Email address </label>
    //                     <input ref={email} type="email"
    //                         id="email"
    //                         className="form-control"
    //                         placeholder="Email address"
    //                         required autoFocus />
    //                 </fieldset>
    //                 <fieldset>
    //                     <button type="submit">
    //                         Sign in
    //                     </button>
    //                 </fieldset>
    //             </form>
    //         </section>
    //         <section className="link--register">
    //             <Link to="/register">Not a member yet?</Link>
    //         </section>
    //     </main>
    // )


