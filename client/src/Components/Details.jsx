import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import loading from '../Assets/loading-img.gif'
import NavBar from '../Components/NavBar'
import { getVideogames } from "../Redux/Actions";
import './CSS Styling/Details.css'


export default function Details() {
    let [videogame, setVideogame] = useState(null) //xq es null?
    let {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/api/videogames/${id}`)
        .then ((game) => {
            setVideogame(game.data)
        })
        return () => {
            setVideogame(null)
        }
    }, [id]);

    return <div className="mainDetails">
            {
                videogame ? 
                <div>
                        <div className="mainNavFiltersContainer">
                        <NavBar />
                        </div>
                        <h1 className="name"> {videogame.name} </h1>
                        <img className="img" src={videogame.background_image} alt="Image not Found" />
                            <div className="atributos">
                        {videogame.description ? <h3 className="description"> Description: <br/> {videogame.description.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br />","").replaceAll("<br/>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("<ul>","").replaceAll("</ul>","").replaceAll("<li>","").replaceAll("</li>","").replaceAll("[object Object]","").replaceAll("<h3>", "").replaceAll("&#39;", "")} </h3> : null}
                        <div>
                            <h3 className="genre"> Genres: {videogame.genres[0].name ? videogame.genres?.map(v => {
                                return <h3>{v.name}</h3>
                            }) : videogame.genres.join(", ")} </h3>
                            <h3 className="platform"> Platforms: {videogame.platforms[0].name ? videogame.platforms?.map(v => {
                                return <h3>{v.name}</h3>
                            }) : videogame.platforms.join(", ")} </h3>
                            <h3 className="released"> Release date: {videogame.released} </h3>
                            <h3 className="rating"> Rating: {videogame.rating} / 5</h3>
                                </div>
                        </div>
                        <div> 
                            <Link to = "/home">
                                <button className="backBtn">BACK</button>
                            </Link>
                        </div>
                </div>  
                : 
                <div>
                        <img src={loading} alt="loading..." width="300px" />
                </div>
            }

    </div>
}
    
   