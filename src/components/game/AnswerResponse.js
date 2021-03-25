import React, { useContext, useEffect, useState } from "react"





export function AnswerCard({artistResponse, songResponse}) {
    return(
        <>
            {songResponse.includes('!')?<h3 class="ui block green header">{songResponse}</h3>:<h3 class="ui block red header">{songResponse}</h3>}
            {artistResponse.includes('!')?<h3 class="ui block green header">{artistResponse}</h3>:<h3 class="ui block red header">{artistResponse}</h3>}
        
        </>
    )
}