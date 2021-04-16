import React, { useContext, useEffect } from "react"
import { GameContext } from './GameInformationProvider'
import { Card, Menu,Grid, Header, Image } from 'semantic-ui-react'
import './GameSelect.css'
import { useHistory } from "react-router-dom"


//present user a series of boxes that represent categories. Each categories will have a unique id. Each unique id will have an associated uri to use for playlist retrieval from spotify.
    export const GameSelect = () => {

        const history  = useHistory()
        const {getUri, handleLogoutClick, currentUserObject, getCurrentUserObject} = useContext(GameContext)
        const handleCatgoryChoice = (x) => {
            getUri(x)
            history.push("/game")
        }
        //on each render, get current users 
        useEffect(() => {
           getCurrentUserObject(localStorage.getItem("sonic_user")) 
        },[])

        return(
            <>

            <div className = "selectScreen">
            
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
                       
                    
                
                <Grid.Row style={{ color: 'white', backgroundColor: '', height: 100, fontSize:35}} >
                    <Header style={{ color: 'white', backgroundColor: '', height: 200, fontSize:55}}textAlign='center'>Select a Category</Header>

                </Grid.Row>
            
                <Grid  columns={3} textAlign='center' style={{  backgroundColor: '', height: '', fontSize:20}} >
                    
                    <Grid.Row>
                        <Grid.Column >
                            <Card style={{backgroundColor: '#1db954', height: 380, fontSize:20, marginLeft:250}}
                                    centered='true'
                                    onClick={event => {
                                       handleCatgoryChoice(1)
                                    }}
                                >
                            <Image src='https://i.scdn.co/image/ab67706f00000003a9a72d13a1164e672fe6301f' size='medium' wrapped ui={true} />
                            <Card.Content>
                                <Card.Header>Prime Country</Card.Header>
                            </Card.Content>
                            
                        </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card style={{backgroundColor: '#1db954',      height: 380, fontSize:20}}
                                    centered='true'
                                    onClick={event => {
                                       handleCatgoryChoice(2)
                                    }}
                                >
                            <Image src='https://i.scdn.co/image/ab67706c0000bebbad3f7fc6ca71742df49cfd1f' size='medium' wrapped ui={true} />
                            <Card.Content>
                                <Card.Header>Hits of the 90s</Card.Header>
                            </Card.Content>
                            
                        </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card style={{backgroundColor: '#1db954',      height: 380, fontSize:20, marginRight:250}}
                                    centered='true'
                                    onClick={event => {
                                       handleCatgoryChoice(3)
                                    }}
                                >
                            <Image src='https://mosaic.scdn.co/640/ab67616d0000b27361e11cce99aab86cb1ce253bab67616d0000b273dc30583ba717007b00cceb25ab67616d0000b273f05e5ac32fdd79d100315a20ab67616d0000b273fc4f17340773c6c3579fea0d' size='medium' wrapped ui={true} />
                            <Card.Content>
                                <Card.Header>Greatest Hits of Classic Rock</Card.Header>
                            </Card.Content>
                            
                        </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column>
                        <Card style={{backgroundColor: '#1db954', height: 380, fontSize:20, marginTop: 20,marginLeft:250}}
                                    centered='true'
                                    onClick={event => {
                                       handleCatgoryChoice(4)
                                    }}
                                >
                            <Image src='https://i.scdn.co/image/ab67706f000000035e98bc8db32dc5981d0df665' size='medium' centered backgroundColor = "black" wrapped ui={true} />
                            <Card.Content>
                                <Card.Header>Best of the 80s</Card.Header>
                            </Card.Content>
                            
                        </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card style={{marginTop: 20,backgroundColor: '#1db954', height: 380, fontSize:20}}
                                    centered='true'
                                    onClick={event => {
                                       handleCatgoryChoice(5)
                                    }}
                                >
                            <Image src='https://i.scdn.co/image/ab67706f00000003ed3a8bb5b72ab5ccbf5834b8' size='medium' wrapped ui={true} />
                            <Card.Content>
                                <Card.Header>The Beatles</Card.Header>
                            </Card.Content>
                            
                        </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card style={{marginTop: 20,backgroundColor: '#1db954',      height: 380, fontSize:20, marginRight:250}}
                                    centered='true'
                                    onClick={event => {
                                       handleCatgoryChoice(6)
                                    }}
                                >
                            <Image src='https://i.scdn.co/image/ab67706f00000003b5c1c133dc1d37f8a0eb7acb' size='medium' wrapped ui={true} />
                            <Card.Content>
                                <Card.Header>Classic Country</Card.Header>
                            </Card.Content>
                            
                        </Card>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </div>
            </>     
        )
    }

    


