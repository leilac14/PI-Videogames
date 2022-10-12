import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from '../Redux/Actions/index';
import { filterByGenres, filterByCreated } from '../Redux/Actions/index';
import { orderByName, orderByRating } from '../Redux/Actions/index';
import NavBar from './NavBar';
import Card from './Card';
import Pagination from './Pagination';
import SortBy from './SortBy';
import Filters from './Filters';
import loading from '../Assets/loading-img.gif';
import SearchBar from "./SearchBar";
import './CSS Styling/Home.css'

export default function Home() {

    let dispatch = useDispatch();

    const allVideogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const [source, setSource] = useState("All");
    const [namechange, setNamechange] = useState('');
    const [ratingchange, setRatingchange] = useState('');
    const [genrechange, setGenrechange] = useState('');
    const [, setOrder] = useState()


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setNamechange("");
        setRatingchange("");
        setGenrechange("")
        setCurrentPage(1);
        setSource("All");
    }

    function handlerGenres(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
        setSource("All");
        setGenrechange(e.target.value);
        setOrder("Order" + e.target.value)
        console.log(e.target.value)
    }
    
    function handlerCreated(e) {
        dispatch(filterByCreated(e));
        console.log(e);
        setSource(e);
        setCurrentPage(1);
        setGenrechange("");
        setOrder("Order" + e)
    }

    function handlerByName(e) { 
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setRatingchange("");
        setNamechange(e.target.value);                      
        setOrder("Order" + e.target.value) 
    }

    function handlerByRating(e) { 
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);   
        setNamechange("");                   
        setRatingchange(e.target.value); 
        setOrder("Order" + e.target.value); 
    }

console.log(allVideogames)

    return (
        <div className="mainHomeContainer">
                <div className="mainNavFiltersContainer">
                    <div>
                    <NavBar/>
                    </div>

                    <SortBy handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange}/>
                    <SearchBar />
                    <Filters handlerGenres={handlerGenres} genrechange={genrechange} handlerCreated={handlerCreated} source={source}/>
                    <button className="homeBtns" onClick={e => {handleClick(e)}} >
                        RESET
                    </button>
                </div>

                <div>
                    <h1 className="vgInfoHome">VIDEOGAME INFORMATION</h1>
                
                    <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage}/>
                    
                    <div>
                        <Link to='/'>
                            <button className="homeBtns">EXIT</button>
                        </Link>

                        {currentVideogames?.length > 0 ?
                        <div>
                            <div className="vgCards">
                                {currentVideogames?.map( el => {
                                    return (
                                        <div key={el.id}>
                                            <Card name={el.name} genres={el.genres} background_image={el.background_image} rating={el.rating} id={el.id}/>
                                        </div>
                                    );
                            })}
                            </div>
                        
                        <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage}/>
                        </div> 
                        : 
                        <div>
                            <img src={loading} alt="Image not Found" width="150px"/>
                        </div>}
                        
                    </div>
                </div>
        
        </div>
    )
}
