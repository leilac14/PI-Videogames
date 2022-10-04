import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import loading from '../Assets/loading-img.gif'


export default function Details() {
    let [videogame, setVideogame] = useState(null)
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

    return <div>
            {
                videogame ? 
                <div>
                        <h1> {videogame.name} </h1>
                        <img src={videogame.background_image} alt="Image not Found" />
                        {videogame.description ? <h3> Description: <br/> {videogame.description.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br />","").replaceAll("<br/>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("<ul>","").replaceAll("</ul>","").replaceAll("<li>","").replaceAll("</li>","").replaceAll("[object Object]","").replaceAll("<h3>", "").replaceAll("&#39;", "")} </h3> : null}
                        <div>
                            <h3> Genres: {videogame.genres.join(", ")} </h3>
                            <h3> Release date: {videogame.released} </h3>
                            {/* <h3> Platforms: {videogame.id.length === 36 ? videogame.platforms :  videogame.platforms.map(p => p.platform.name).join(", ")} </h3> */}
                            <h3> Rating: {videogame.rating} / 5</h3>
                        </div>
                        <div> 
                            <Link to = "/home">
                                <button>BACK</button>
                            </Link>
                        </div>
                </div>  
                : 
                <div>
                        <img src={loading} alt="loading..." />
                </div>
            }

    </div>
}
    
   