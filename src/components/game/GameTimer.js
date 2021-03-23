import React, { useState, useContext, createContext, useEffect } from "react"

export const Timer = ({endGame}) =>{
        const [seconds, setSeconds] = useState(0)
        const [minutes, setMinutes] = useState(2)
        
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
        return (<p>
            time: {minutes}:{seconds}
            </p>);
}