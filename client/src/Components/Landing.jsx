import React from "react";
import {Link} from "react-router-dom";
import landing from '../Assets/landing-main-img.jpg'
import './CSS Styling/Landing.css'

export default function LandingPage() {
    return (
        <div className='divLanding'>
            <Link to = "/home">
                    <button className='btn'>PRESS START</button>
            </Link>
            <h1 className='text'> Videogames </h1>
            <p>A Henry Proyect</p>
        </div>
    );
};