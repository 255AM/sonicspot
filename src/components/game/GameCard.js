import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import {Table} from "semantic-ui-react"



// How article is being printed to the DOM 
export function GameCard(game) {

    console.log(game);
    return(

            <Table.Row style={{ backgroundColor: '#121212', color:'white'}}>
                <Table.Cell>{game.score}</Table.Cell>
                <Table.Cell>{game.categoryName}</Table.Cell>
                <Table.Cell>{game.userName}</Table.Cell>
            </Table.Row>
    )    
}