import React from "react";
import {Link} from "react-router-dom";
import landing from '../Assets/landing-main-img.jpg'

export default function LandingPage() {
    return (
        <div >
            <img src={landing} alt="Image not Found" />
            <Link to = "/home">
                    <button>PRESS START</button>
            </Link>
            <h1> Videogames </h1>
            <p>A Henry Proyect</p>
        </div>
    );
};