import React from "react"
import { Link } from "react-router-dom"
import './CSS Styling/Card.css'

export default function Card({id, name, background_image, genres, rating}) {

    return (
        <div className="cardDiv">
            <Link to={`/videogames/${id}`}>
            <h3 className="titleCard">{name}</h3>
            </Link>
            <img className="cardImg" src={background_image} alt='Image not Found'/>
            <div className="div2">
            <h4 className="genreText">{genres?.map(g => g.name).join(", ")}</h4>
            <h4 className="divRating">{rating}</h4>
            
            </div>
        </div>
    )

}
