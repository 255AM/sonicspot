import React, { useState, useContext, createContext, useEffect } from "react"
import { Progress } from 'semantic-ui-react'

export const Timer = ({endGame}) =>{
        const [seconds, setSeconds] = useState(120)
        const [minutes, setMinutes] = useState()
        
        function updateTime() {
          if (minutes == 0 && seconds == 0) {
            endGame()
            //console.log(endGame);
          }
          else {
            if (seconds == 0) {
              setMinutes(minutes => minutes - 1);
              setSeconds(59);
            } else {
              setSeconds(seconds => seconds - 1);
            }
          }
          const ProgressExampleActive = () => (
            <Progress percent={60} active>
              Active
            </Progress>
          )
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
            
            <p>
            Remaining: {seconds}
            </p>);
}

