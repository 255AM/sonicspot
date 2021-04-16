import React, { useState, useEffect } from "react"
import { Icon, Header } from 'semantic-ui-react'


export const Timer = ({endGame}) =>{
        //set timer duration here.
        const [seconds, setSeconds] = useState(90)
        const [minutes, setMinutes] = useState(0)
        
        function updateTime() {
          if (minutes == 0 && seconds == 0) {
            endGame()
          }
          else {
            if (seconds == 0) {
              setMinutes(minutes => minutes - 1);
              setSeconds(59);
            } else {
              setSeconds(seconds => seconds - 1);
            }
          }
          
        }
      
        useEffect(() => {
         const token = setTimeout(updateTime, 1000)
      
          return function cleanUp() {
            clearTimeout(token);
          }
        })
        return (
            <>
                <Header  size='huge'><Icon bordered name='clock outline' />Remaining: {seconds}</Header>
            </>
        )


            
}

