import React, { useState, useContext, createContext, useEffect } from "react"
import { Progress, Container, Icon, Header } from 'semantic-ui-react'


export const Timer = ({endGame}, x) =>{
  
        const [seconds, setSeconds] = useState(1000)
        const [minutes, setMinutes] = useState(0)
        
        function updateTime() {
          if (minutes == 0 && seconds == 0) {
            endGame()
            console.log('run now end game');
           
            
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
          // use set timeout and be confident because updateTime will cause rerender
          // rerender mean re call this effect => then it will be similar to how setinterval works
          // but with easy to understand logic
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

