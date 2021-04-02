import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameInformationProvider"
import {Button, Container,GridColumn,Table, Menu, Grid, Header} from "semantic-ui-react"
import './Leaderboard.css'
import {GameCard} from './GameCard'
import './GameSelect.css'
import { useHistory } from "react-router-dom"



    export const Leaderboard = ()=>{
        
        const history  = useHistory()
        const {handleLogoutClick, currentUserObject} = useContext(GameContext)   
        const {getGames, games} = useContext(GameContext)
        let sGames = games.sort((a, b) => (a.score > b.score) ? -1 : 1)
        
        useEffect(() =>{
            getGames()
        },[])
            
        
        return (
            
            <div className = "leaderDiv"> 
                <Menu style={{ backgroundColor: 'white', height: 10, fontSize:20}}>  
                    <Menu.Menu position='left'>
                        <Menu.Item
                            position='left'
                            name='leaderboard'
                            onClick={()=>history.push('./leaderboard')}
                        >
                        Leaderboard
                        </Menu.Item>
                        
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            position='right'
                            name= 'user'
                            onClick={()=>history.push('/stats')}
                        >
                        Welcome {currentUserObject.userName}
                        </Menu.Item>
                        <Menu.Item
                            name='logout'
                            onClick={handleLogoutClick}
                        />
                    </Menu.Menu>
                   
                </Menu>
                {/* end of menu code */}
                {/* sort scores in ascedning order.return first 10 aling with associated data  */}
                <Grid style={{  backgroundColor: '#121212',height: '100vh', fontSize:23}}>
                    <GridColumn>
                        <Container >
                            <Header textAlign='center' style={{  backgroundColor: '#121212', color:'white'}} size='huge'>Top 10 scores</Header>
                        <Container >
                            <Table padded singleLine size="large" style={{  backgroundColor: '#121212', color:'white'}}>
                                <Table.Header style={{ color:''}}>
                                    <Table.Row style={{ color:'white'}}>
                                        <Table.HeaderCell width={7} style={{ backgroundColor: '#121212', color:'#1DB954'}}>Score</Table.HeaderCell >
                                        <Table.HeaderCell width={8} style={{ backgroundColor: '#121212', color:'#1DB954'}}>Category</Table.HeaderCell>
                                        <Table.HeaderCell width={8} style={{ backgroundColor: '#121212', color:'#1DB954'}}>Name</Table.HeaderCell>
                                    </Table.Row>
                                 </Table.Header>

                                <Table.Body>
                            
                                {sGames.slice(0,10).map((game) => {
                            
                                return (
                                    <GameCard
                                        key={game}
                                        score={game.score}
                                        id={game.id}
                                        userId={game.userId}
                                        categoryId={game.categoryId}
                                        userName={game.user.userName}
                                        categoryName={game.category.name}
                                    />);
                                })}
                        
                                </Table.Body>
                            </Table>

                    
                        </Container>
                        <Button     
                            animated='fade'
                            size='massive' 
                            attached='bottom' 
                            basic color='green'
                            onClick={event => {
                                history.push('/')
                                }}>
                            <Button.Content visible>Back to main menu</Button.Content>
                            <Button.Content hidden>GO!</Button.Content>
                        </Button>
                        </Container>
                    </GridColumn>
                </Grid>
            </div>
            
        )





    }