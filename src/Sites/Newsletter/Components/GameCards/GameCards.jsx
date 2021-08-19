import React from 'react'
import { InputGroup,Card, FormControl, Button, CardColumns } from "react-bootstrap"
import StarIcon from '@material-ui/icons/Star';

function GameCards(props) {
  return (
    <Card className="bg-dark text-white" onClick={() => { props.gameClicked(true); props.clickedGame(props.game) }}>
      <Card.Img src={props.game.header_image} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{props.game.name}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  )
}

export default GameCards
