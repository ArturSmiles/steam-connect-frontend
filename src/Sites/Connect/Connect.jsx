import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from "react-bootstrap"
import ConnectCards from './Components/Cards/ConnectCards'
import Sidebar from "./Components/SideBar/Sidebar"
import "./Connect.css"

function Connect() {

    const [user,setUser] = useState()
    const [allUsers,setAllUsers] = useState()

    useEffect(()=>{
        fetchUser()
        fetchAllUsers()
    },[])

    async function fetchUser() {
        const userFetch = await fetch("http://localhost:3001/users/profile/me", {
            credentials: "include",
        })
        const fetchData = await userFetch.json()
        setUser(fetchData)
    }

    async function fetchAllUsers() {
        const userFetch = await fetch("http://localhost:3001/users/", {
            credentials: "include",
        })
        const fetchData = await userFetch.json()
        setAllUsers(fetchData)
    }

    return (
        <Container className="ConnectMain">
            <Row>
            {user? 
            <>
            <Col className="CardCol" xs={8}><ConnectCards user={user}/></Col>
            <Col className="SideBarCol"><Sidebar users={allUsers}/></Col>
            </>
            :
            <Col>
            <a href="http://localhost:3001/users/auth/steam"> <img src="https://community.akamai.steamstatic.com/public/images/signinthroughsteam/sits_02.png" width="109" height="66" border="0"/> </a>
            </Col>
        }
            </Row>
        </Container>
    )
}

export default Connect
