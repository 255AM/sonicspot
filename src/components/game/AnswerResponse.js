import React from "react"
import { Header, Message } from 'semantic-ui-react'
import "./GameScreen.css"

// If answer is correct (includes!) format accordingly
export function AnswerCard({artistResponse, songResponse}) {
    return(
        <>
            <Message fluid
                    style={{backgroundColor:'', }}>{songResponse.includes('!')?<Header style={{color:'green', fontSize: 20}}>{songResponse}</Header>:<Header style={{color:'red', fontSize: 20}}>{songResponse}</Header>}
            </Message>
        
            <Message
            style={{backgroundColor:'',  marginTop:20, }}>{artistResponse.includes('!')?<Header style={{color:'green', fontSize: 20}}>{artistResponse}</Header>:<Header style={{color:'red', fontSize: 20}}>{artistResponse}</Header>}
            </Message>
       </> 
        
    )
}

