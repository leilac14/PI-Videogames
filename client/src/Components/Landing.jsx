import React from "react";
import {Link} from "react-router-dom";
import landing from '../Assets/landing-main-img.jpg'
import './CSS Styling/Landing.css'

export default function LandingPage() {
    return (
        <div className='divLanding'>
            <Link to = "/home">
                    <button className='btnLanding'>PRESS START</button>
            </Link>
            <h1 className='text'> Videogames </h1>
            <p className='subtitleText'>A Henry Proyect</p>
        </div>
    );
};