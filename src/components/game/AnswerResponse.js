import React from "react"
import { Header, Message } from 'semantic-ui-react'

// If answer is correct (includes!) format accordingly
export function AnswerCard({artistResponse, songResponse}) {
    return(
        <>
            <Message fluid
                    style={{backgroundColor:'', width:830, height:50}}>{songResponse.includes('!')?<Header style={{color:'green', fontSize: 20}}>{songResponse}</Header>:<Header style={{color:'red', fontSize: 20}}>{songResponse}</Header>}
            </Message>
        
            <Message
            style={{backgroundColor:'', width:830, marginTop:20, height:50}}>{artistResponse.includes('!')?<Header style={{color:'green', fontSize: 20}}>{artistResponse}</Header>:<Header style={{color:'red', fontSize: 20}}>{artistResponse}</Header>}
            </Message>
       </> 
        
    )
}

