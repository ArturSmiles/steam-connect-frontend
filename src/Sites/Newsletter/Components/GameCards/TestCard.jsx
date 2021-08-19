import React,{useState} from 'react'
import { InputGroup,Card, FormControl, Button, CardDeck } from "react-bootstrap"
import StarIcon from '@material-ui/icons/Star';
import "../../Newsletter.css"

function TestCard() {
    const [favorite,setFavorite] = useState([])
    const a =[1,2,3,4]

    return (
        <CardDeck>
            {a.map((game,index)=>(
                <Card className="bg-dark text-white">
                <Card.Img src="http://media.steampowered.com/steamcommunity/public/images/apps/730/d0595ff02f5c79fd19b06f4d6165c3fda2372820.jpg" alt="Card image" />
                <Card.ImgOverlay>
                    <StarIcon onClick={(e)=>{
                     const  b = favorite.find(element => element===game)
                     if(b){
                        const index = favorite.indexOf(b);
                        if (index > -1) {
                        favorite.splice(index, 1);
                        setFavorite([...favorite])
                        }
                     }else{
                         setFavorite(oldArray=>[...oldArray,game])
                     }
                    }} style={favorite.find(element => element===game)? {color:"yellow"}:{color:"white"}}/>
                  <Card.Title>Counter-Strike: Global Offensive</Card.Title>
                </Card.ImgOverlay>
              </Card>
            ))}
        </CardDeck>
    )
}

export default TestCard
