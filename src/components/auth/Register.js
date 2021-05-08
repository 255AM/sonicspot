import React, { useRef } from "react"
import { useHistory } from "react-router-dom"

import {Grid, Form, Segment, Button, Header} from 'semantic-ui-react'


export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    
    const conflictDialog = useRef()
    const newUser = useRef()
    const history = useHistory()
    const userName = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://sonicserve.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }


    //create user with first name, lastname, email and userId
    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://sonicserve.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            userName: userName.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("sonic_user", createdUser.id)
                                newUser.current.showModal()
                                
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>
            <Grid textAlign='center' style={{ height: '100vh' , width: '500'}}  verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 700 }}>
                    <Grid.Row >
                    <dialog className="dialog dialog--new" ref={newUser}>
                            <div>User created successfully!</div>
                            <button className="button--close" onClick={e => {
                                newUser.current.close()
                                history.push("/login")
                                }
                                }>Close</button>
                        </dialog>

                        <dialog className="dialog dialog--password" ref={conflictDialog}>
                            <div>Account with that email address already exists</div>
                            <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
                        </dialog>

                        <Form style={{ maxWidth: 700 }}size= 'large' className="form--login" onSubmit={handleRegister}>
                            <Segment stacked>
                                <Header>Register New Account</Header> 
                        
                                <label htmlFor="firstName"> First Name </label>
                                <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                            
                            
                                <label htmlFor="lastName"> Last Name </label>
                                <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                            
                            
                                <label htmlFor="inputEmail"> Email address </label>
                                <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                            
                            
                                <label htmlFor="userName"> Username </label>
                                <input ref={userName} type="text" name="userName" className="form-control" placeholder="Username" required />
                        
                                <Button color ='green' type="submit"> Sign in </Button>
                        
                            </Segment>
                        </Form>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </main>
    )
}

