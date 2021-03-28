import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"



// How article is being printed to the DOM 
export function GameCard({ game}) {
    
    
    return(

         
           <section className="event bg-light">
                <div >ID: {game.id}</div>
                <div >Score: {game.score}</div>
                
                
            </section>    
                
               
          
                
    )    
        
}