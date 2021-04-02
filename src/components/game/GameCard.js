import React from "react"
import {Table} from "semantic-ui-react"



// rendor each row of leaderboard
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