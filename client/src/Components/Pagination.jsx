import React from "react"
import './CSS Styling/Pagination.css'

export default function Pagination ({videogamesPerPage, allVideogames, pagination, currentPage}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav className='Pagination'>
                {pageNumbers && pageNumbers.map(number => (
   
                        <button key={number} onClick={() => pagination(number)} style={currentPage === number ? {backgroundColor: "#280783", color: "white", borderColor:"white" , fontSize: "20px"} : undefined}>{number}</button>

                   
                ))}
        </nav>
    )
}