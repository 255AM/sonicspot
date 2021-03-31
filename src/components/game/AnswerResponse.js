import React, { useContext, useEffect, useState } from "react"
import {Grid, Segment} from 'semantic-ui-react'





export function AnswerCard({artistResponse, songResponse}) {
    return(
        <Grid.Row>
            <Segment style={{backgroundColor:'#648767'}}>{songResponse.includes('!')?<h3 class="ui block green header">{songResponse}</h3>:<h3 class="ui block red header">{songResponse}</h3>}
            {artistResponse.includes('!')?<h3 class="ui block green header">{artistResponse}</h3>:<h3 class="ui block red header">{artistResponse}</h3>}</Segment>
            
        </Grid.Row>
            
            
        
        
    )
}



{/* // {songResponse.includes('!')?<h3 class="ui block green header">{songResponse}</h3>:<h3 class="ui block red header">{songResponse}</h3>}
//             {artistResponse.includes('!')?<h3 class="ui block green header">{artistResponse}</h3>:<h3 class="ui block red header">{artistResponse}</h3>} */}