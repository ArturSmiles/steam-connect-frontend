import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Button, Card,Tabs,Tab,Row,Col } from "react-bootstrap"
import { BiArrowBack } from "react-icons/bi"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';
import "./GameNews.css"

function GameNews(props) {

    const apiKey = process.env.REACT_APP_STEAM_API_KEY
    const [news, setNews] = useState()
    const [favorite, setFavorite] = useState([])
    const [key, setKey] = useState('home');

    useEffect(() => {
        getNews()
        if (props.user) {
            setFavorite(props.user.favoriteGames)
        }
    }, [])

    useEffect(() => {
        favAGame()
    }, [favorite])


    async function getNews() {
        const newsFetch = await fetch(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${apiKey}&appid=${props.game.steam_appid}`)
        const newsData = await newsFetch.json()
        const newsItems = newsData.appnews.newsitems
        setNews(newsItems)
    }

    async function favAGame() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favoriteGames: favorite }),
            credentials: "include",
        };
        const userFetch = await fetch("http://localhost:3001/users/profile/me", requestOptions)
        const userData = await userFetch.json()
        props.setUser(userData)
    }

    const style = {
        backgroundImage: "url(" + props.game.header_image + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div >
            <h1 onClick={() => { props.gameClicked(false); props.nav() }}>Back</h1>
            <Jumbotron style={style}>
                {props.user && <StarIcon onClick={(e) => {
                    const findFav = favorite.find(favorite => favorite.steam_appid === props.game.steam_appid)
                    if (findFav) {
                        const index = favorite.indexOf(findFav);
                        if (index > -1) {
                            favorite.splice(index, 1);
                            setFavorite([...favorite])
                        }
                    } else {
                        setFavorite(oldArray => [...oldArray, props.game])
                    }
                }
                } style={favorite.find(favorite => favorite.steam_appid === props.game.steam_appid) ? { color: "yellow" } : { color: "white" }} />}
                <Container>
                    <h1>{props.game.name}</h1>
                    <p>
                        {props.game.short_description}
                    </p>
                </Container>
            </Jumbotron>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="News">
                {
                news ?
                    news.map((game, index) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{game.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div dangerouslySetInnerHTML={{ __html: game.contents.replace(/\[/g, "<").replace(/\]/g, ">") }} />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                    :
                    <h1>No News Available</h1>
            }
                </Tab>
            </Tabs>
        </div>
    )
}

export default GameNews
