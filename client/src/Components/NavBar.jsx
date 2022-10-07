import React from 'react';
import { Link } from 'react-router-dom';
import './CSS Styling/NavBar.css'

export default function Nav() {
    return(
        <>
            <div className='mainContainer'>
                {/* <h1 className='videogameTitle'>Videogames</h1> */}
                <Link to = '/home'>
                    <h1 className='videogameTitle'> Videogames</h1>
                </Link>
                <Link to = '/create'>
                    <h3 className='newGameTitle'> New Game </h3>
                </Link>
            </div>
        </>
    )
}