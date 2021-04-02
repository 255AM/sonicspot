import React, { useContext, useEffect, useState } from "react"
import {Grid, Header, Message} from 'semantic-ui-react'





export function AnswerCard({artistResponse, songResponse}) {
    return(
        <>
        
            
            <Message fluid
                    style={{backgroundColor:'', width:830, height:50}}>{songResponse.includes('!')?<Header style={{color:'green', fontSize: 20}}>{songResponse}</Header>:<Header style={{color:'red', fontSize: 20}}>{songResponse}</Header>}
            </Message>
        
                    <Message
                    style={{backgroundColor:'', width:830, marginTop:20, height:50}}>{artistResponse.includes('!')?<Header style={{color:'green', fontSize: 20}}>{artistResponse}</Header>:<Header style={{color:'red', fontSize: 20}}>{artistResponse}</Header>}
                    </Message>
       
            
        
            {/* <Segment style={{backgroundColor:'#1DB954'}}>{songResponse.includes('!')?<h3 class="ui block green header">{songResponse}</h3>:<h3 class="ui block red header">{songResponse}</h3>}
           </Segment> */}
            
        
            
            
       </> 
        
    )
}



{/* // {songResponse.includes('!')?<h3 class="ui block green header">{songResponse}</h3>:<h3 class="ui block red header">{songResponse}</h3>}
//             {artistResponse.includes('!')?<h3 class="ui block green header">{artistResponse}</h3>:<h3 class="ui block red header">{artistResponse}</h3>} */}