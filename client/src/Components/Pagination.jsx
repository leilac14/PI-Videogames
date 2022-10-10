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
   
                    <button key={number} onClick={() => pagination(number)} className='btns' style={currentPage === number ? {backgroundColor: "#6700ff", color: "white", borderColor:"white" , fontSize: "25px"} : undefined}>{number}</button>
                ))}
        </nav>
    )
}