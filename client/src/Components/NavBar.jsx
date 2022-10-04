import React from 'react';
import { Link } from 'react-router-dom';


export default function Nav() {
    return(
        <>
            <div>
                <h1>Videogames</h1>
                <Link to = '/create'>
                    <span> New Game </span>
                </Link>
            </div>
        </>
    )
}