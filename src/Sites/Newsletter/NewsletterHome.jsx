import "./Newsletter.css"
import React, { useEffect, useState } from 'react'
import NavBar from './Components/NavBar';
import { Container, Row, Col } from "react-bootstrap"
import GameNews from "./Subsites/GameNews/GameNews";
import MainNews from "./Components/MainNews"


function NewsletterHome() {
    const apiKey = process.env.REACT_APP_STEAM_API_KEY

    const [allGames, setAllGames] = useState([])
    const [filteredGamesID, setfilteredGamesID] = useState()
    const [filteredGames, setFilteredGames] = useState([])
    const [popGames, setPopGames] = useState()
    const [popGamesDetail, setPopGamesDetail] = useState([])
    const [clickedGame, setClickedGame] = useState()
    const [gameClicked, setGameClicked] = useState(false)
    const [gameSearch, setGameSearch] = useState()
    const [searched, setSearched] = useState(false)
    const [user, setUser] = useState()
    const [nav, setNav] = useState()


    useEffect(() => {
        fetchAllGames()
        fetchPopularGames()
        fetchUser()
    }, []);

    useEffect(() => {
        fetchPopGamesDetail()
    }, [allGames])

    useEffect(() => {
        if (gameSearch) {
            const filteredApps = allGames[0].filter(app => app.name.includes(gameSearch))
            setfilteredGamesID(filteredApps)
        } else {
            setfilteredGamesID(null)
            setFilteredGames([])
        }
    }, [gameSearch])


    async function fetchAllGames() {
        const getApps = await fetch(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${apiKey}&max_results=50000`)
        const resp = await getApps.json()
        const apps = resp.response.apps
        setAllGames(oldArray => [...oldArray, apps])
    }
    async function fetchPopularGames() {
        const getApps = await fetch("https://steamspy.com/api.php?request=top100in2weeks")
        const resp = await getApps.json()
        const respArray = Object.values(resp)
        setPopGames(respArray)
    }
    async function fetchPopGamesDetail() {
        if (popGames) {
            let shortendArray = popGames.reverse().slice(0, 20)
            return await Promise.all(
                shortendArray.map(async (app) => {
                    const appID = app.appid
                    const getApps = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`)
                    const resp = await getApps.json()
                    const respArray = Object.values(resp)
                    const appData = respArray[0].data
                    setPopGamesDetail(oldArray => [...oldArray, appData])
                })
            )
        }
    }

    async function fetchSearchGamesDetail() {
        if (filteredGamesID) {
            setFilteredGames([])
            setSearched(true)
            let shortendArray = filteredGamesID.slice(0, 20)
            await Promise.all(
                shortendArray.map(async (app) => {
                    const appID = app.appid
                    const getApps = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`)
                    const resp = await getApps.json()
                    const respArray = Object.values(resp)
                    const appData = respArray[0].data
                    setFilteredGames(oldArray => [...oldArray, appData])
                })
            )
        }
    }

    async function fetchUser() {
        const userFetch = await fetch("http://localhost:3001/users/profile/me", {
            credentials: "include",
        })
        const fetchData = await userFetch.json()
        setUser(fetchData)
    }

    return (
        <div className="NewsH">
            <NavBar fixed="Top" expand="lg" nav={setNav} user={user} />
            <Container>
                <Row>
                    {
                        <Col className="MainNews">
                            {gameClicked ?
                                <GameNews game={clickedGame} gameClicked={setGameClicked} nav={setNav} user={user} setUser={setUser}/>
                                :
                                nav?
                                <MainNews gameSearch={setGameSearch} fetchSearchGamesDetail={fetchSearchGamesDetail} popGamesDetail={popGamesDetail}
                                    gameClicked={setGameClicked} clickedGame={setClickedGame} filteredGames={filteredGames} user={user} nav={nav} />
                                    :
                                (searched ?
                                    <MainNews gameSearch={setGameSearch} fetchSearchGamesDetail={fetchSearchGamesDetail} popGamesDetail={popGamesDetail}
                                        gameClicked={setGameClicked} clickedGame={setClickedGame} filteredGames={filteredGames} nav={nav} user={user} />
                                    :
                                    popGamesDetail ?
                                        <MainNews gameSearch={setGameSearch} fetchSearchGamesDetail={fetchSearchGamesDetail} popGamesDetail={popGamesDetail}
                                            gameClicked={setGameClicked} clickedGame={setClickedGame} filteredGames={filteredGames} nav={nav} user={user} />
                                        :
                                    
                                        <h1>No Game Here</h1>)
                            }
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default NewsletterHome