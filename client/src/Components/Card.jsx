import React from "react"
import { Link } from "react-router-dom"
import './CSS Styling/Card.css'

export default function Card({id, name, background_image, genres, rating}) {

    return (
        <div className="Card">
            <img src={background_image} alt='Image not Found'/>
            <Link to={`/videogames/${id}`}>
            <h3>{name}</h3>
            </Link>
            <h4>{rating}</h4>
            <h4>{genres?.map(g => g.name).join(", ")}</h4>
        </div>
    )

}
