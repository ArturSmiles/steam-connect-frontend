import React, { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button, CardColumns } from "react-bootstrap"
import { CircularProgress } from "@material-ui/core"
import GameCards from "./GameCards/GameCards"

function MainNews(props) {
    const [ownedGamesID, setOwnedGamesID] = useState([])
    const [favoriteGames, setFavoriteGames] = useState([])
    const [recentlyPlayedGamesID, setRecentlyPlayedGamesID] = useState([])
    const [ownedGames, setOwnedGames] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])

    useEffect(() => {
        if (props.user) {
            setOwnedGamesID([])
            setRecentlyPlayedGamesID([])
            const ownedGames = props.user.ownedGames
            const recentlyPlayed = props.user.recentlyPlayedGames
            const favoriteGames = props.user.favoriteGames
            setFavoriteGames(favoriteGames)
            recentlyPlayed.map((games) => {
                setRecentlyPlayedGamesID(oldArray => [...oldArray, games.appid])
            })
            ownedGames.map((games) => {
                setOwnedGamesID(oldArray => [...oldArray, games.appid])
            })
        }
    }, [props.user,props.nav])

    useEffect(() => {
        if (!ownedGames[0]) {
            fetchRecentlyPlayed()
            fetchOwnedGames()
        }
    }, [props.user,props.nav])

    async function fetchRecentlyPlayed() {
        if (recentlyPlayedGamesID) {
            let shortendArray = recentlyPlayedGamesID.slice(0, 20)
            return await Promise.all(
                shortendArray.map(async (app) => {
                    const appID = app
                    const getApps = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`)
                    const resp = await getApps.json()
                    const respArray = Object.values(resp)
                    const appData = respArray[0].data
                    setRecentlyPlayed(oldArray => [...oldArray, appData])
                })
            )
        }
    }
    async function fetchOwnedGames() {
        if (ownedGamesID) {
            let shortendArray = ownedGamesID.slice(0, 20)
            return await Promise.all(
                shortendArray.map(async (app) => {
                    const appID = app
                    const getApps = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`)
                    const resp = await getApps.json()
                    const respArray = Object.values(resp)
                    const appData = respArray[0].data
                    setOwnedGames(oldArray => [...oldArray, appData])
                })
            )
        }
    }

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    style={{ marginTop: "10px" }}
                    placeholder="Search for a Game..."
                    aria-label="Search for a Game..."
                    aria-describedby="basic-addon2"
                    onChange={(event) => props.gameSearch(event.target.value)}
                />
                <InputGroup.Append>
                    <Button style={{ marginTop: "10px" }} variant="outline-secondary" onClick={props.fetchSearchGamesDetail}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <CardColumns>
                {
                    props.nav === "Favorites" ?
                    favoriteGames.map((Game) => (
                        Game &&
                        <GameCards game={Game} gameClicked={props.gameClicked} clickedGame={props.clickedGame} />
                        ))
                        :
                        props.nav === "RecentlyPlayed" ?
                        recentlyPlayed.map((Game) => (
                            Game &&
                            <GameCards game={Game} gameClicked={props.gameClicked} clickedGame={props.clickedGame} />
                            ))
                            :
                            props.nav === "OwnedGames" ?
                            ownedGames.map((Game) => (
                                Game &&
                                <GameCards game={Game} gameClicked={props.gameClicked} clickedGame={props.clickedGame} />
                                ))
                                :
                                props.filteredGames[0] ?
                                    props.filteredGames.map((Game) => (
                                        Game &&
                                        <GameCards game={Game} gameClicked={props.gameClicked} clickedGame={props.clickedGame} />
                                    ))
                        :
                        props.popGamesDetail[0] ?
                            props.popGamesDetail.map((Game) => (
                                Game &&
                                <GameCards game={Game} gameClicked={props.gameClicked} clickedGame={props.clickedGame} />
                            ))
                            :
                            <h1><h1>Loading Game Details</h1><CircularProgress thickness={5} size={100} /></h1>
                }
            </CardColumns>
        </>
    )
}

export default MainNews
