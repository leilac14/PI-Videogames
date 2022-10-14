import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getGenres } from '../Redux/Actions/index';
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../Components/NavBar';
import './CSS Styling/CreateGame.css'

export default function CreateGame() {
    let dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const history = useHistory();

    const [videogame, setVideogame] = useState({
         name: "",
         genres: [],
         released: "",
         rating: "",
         description:"",
         platforms: [],
         background_image: undefined,
      });
 
    let [error, setError] = useState({
         name: '',
         genres: "",
         rating: "",
         released: "",
         platforms:"",
      });
 
    function setGenre(e) {
       if (!videogame.genres.includes(e.target.value)) {
          setVideogame({
            ...videogame,
            genres: [...videogame.genres, e.target.value]
          })
       } else {
         setVideogame({
            ...videogame,
            genres: videogame.genres.filter(v => v !== e.target.value)
         })
       };
    };
 
    function setPlatform(e) {
       if (!videogame.platforms.includes(e.target.value)) {
          setVideogame({
            ...videogame,
            platforms: [...videogame.platforms, e.target.value]
          })
       } else {
          setVideogame({
            ...videogame,
            platforms: videogame.platforms.filter(v => v !== e.target.value)
          })
       };
    }; 

 
    function onInputChange(e) {
         e.preventDefault()
         setVideogame({
             ...videogame,
             [e.target.name]: e.target.value,
             [e.target.platforms]: e.target.value,
             [e.target.genres]: e.target.value,
             [e.target.released]: e.target.value,
             [e.target.rating]: e.target.value,
             [e.target.playtime]: e.target.value,
             [e.target.description]: e.target.value,
             [e.target.background_image]: e.target.value,
         });
     };
     
     function onSubmit(e) {
         e.preventDefault();
         let regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
         if (videogame.name === '') {
             setError(error = {
               ...error,
               name: 'Name cannot be blank'
            });
         } else if (!/\S/.test(videogame.name)) {
             setError(error = {
               ...error,
               name: 'Name cannot be an empty space'
            })
         } else {
             setError(error = {
               ...error,
               name: ''
            })
         };
         if (!videogame.genres.length) {
             setError(error = {
                 ...error,
                 genres: 'Must select at least one genre'
              })
         } else {
             setError(error = {
                ...error,
                genres: ""
             })
          };
         if (videogame.released === '') {
             setError(error = {
               ...error,
               released: 'Must introduce a release date'
            });
         } else if (new Date(videogame.released) > new Date()){ 
             setError(error = {
                ...error,
                released: 'Games cannnot be from the future'
             })
         } else if (!regexDate.test(videogame.released)) {
             setError(error = {
                 ...error,
                 released: 'Must introduce a date with the format Year/Month/Day'
              })
         } else {
             setError(error = {
               ...error,
               released: ''
            })
         };
         if (e.target.rating.value === "" || e.target.rating.value > 5 || e.target.rating.value < 0) {
             setError(error = {
               ...error,
               rating: 'Rating must be a number between 0 & 5'
            })
         } else {
             setError(error = {
               ...error,
               rating: ""
            })
         };
         if (!videogame.platforms.length) {
             setError(error = {
                 ...error,
                 platforms: 'Must introduce at least one platform'
              })
          } else {
             setError(error = {
                ...error,
                platforms: ""
             })
          };
          if (!/\S/.test(videogame.name) || !new Date(videogame.released) > new Date() || !e.target.name.value || !e.target.released.value || !videogame.genres.length || !videogame.platforms.length || !e.target.rating.value) {
         }  else { 
             axios.post(`http://localhost:3001/api/videogames`, videogame)
             .then(() => {})
              history.push(`/home`);
              window.location.reload(true);
         };
     };
     
     function handleDeletePlatforms(e, p) {
      e.preventDefault()
      setVideogame({
        ...videogame,
        platforms: videogame.platforms.filter(pl => pl !== p)
      })
    }

    function handleDeleteGenres(e, p) {
      e.preventDefault()
      setVideogame({
        ...videogame,
        genres: videogame.genres.filter(g => g !== p)
      })
    }

     console.log(videogame)

     return (
        <div className="mainCreate">
        <div className="mainNavFiltersContainer">
        <NavBar />
        </div>

         <div className="create">
            <h1 className="title">Create New Videogame</h1>
            <form action="" onSubmit={onSubmit}>

               <div className="data">

                  <div className="column1">
                     <label htmlFor="">Name: </label>
                     <input placeholder="Enter a name" 
                              onChange={onInputChange} 
                              name= "name" 
                              type="text" 
                              value= {videogame.name} 
                              className="input"/>
                     {error.name && <p style={{ 'color': 'red' }}>{error.name}</p>}
                     <br />
                     
                     <label htmlFor="">Image URL: </label>
                     <input onChange={onInputChange} 
                            placeholder="Enter img URL..." 
                            name= "background_image" 
                            type="text" 
                            value= {videogame.background_image}
                            className="input" />
                     <br/>

                  <label htmlFor="">Description: </label>
                  <input placeholder="Enter a description" 
                         onChange={onInputChange} 
                         name= "description" 
                         type="text" 
                         value= {videogame.description} 
                         maxLength="500"
                         className="inputDescription" />
                  <br />
                  </div>

                  <div className="column2">
                     <label htmlFor="">Release Date: </label>
                     <input placeholder="YYYY/MM/DD" 
                            onChange={onInputChange} 
                            name= "released" 
                            type="date" 
                            value= {videogame.released}
                            className="input" />
                     {error.released && <p style={{ 'color': 'red' }}>{error.released}</p>}
                     <br />

                  <label htmlFor="">Rating: </label>          
                  <input placeholder="5 - 0" 
                         onChange={onInputChange} 
                         name= "rating" 
                         type="number" 
                         value= {videogame.rating} 
                         min="0" 
                         max="5" 
                         step=".01" 
                         id="inputRating"
                         className="input"/>
                  {error.rating && <p style={{ 'color': 'red' }}>{error.rating}</p>}
                  <br />
                  </div>
                  <div>
                     <label htmlFor="">Platforms: </label>
                     <select onChange={setPlatform} className="input">
                        <option value="" defaultValue>Platforms</option>
                        <option value={"PC"}>PC</option>
                        <option value={"Linux"}>Linux</option>
                        <option value={"macOS"}>macOS</option>
                        <option value={"iOS"} >iOS</option>
                        <option value={"Android"} >Android</option>
                        <option value={"PlayStation 5"} >PlayStation 5 </option>
                        <option value={"PlayStation 4"} >PlayStation 4 </option>
                        <option value={"PlayStation 3"} >PlayStation 3 </option>
                        <option value={"PlayStation 2"} >PlayStation 2 </option>
                        <option value={"Xbox Series S/X"} >Xbox Series S/X </option>
                        <option value={"XBOX One"} >XBOX One </option>
                        <option value={"XBOX 360"} >XBOX 360 </option>
                        <option value={"XBOX"} >XBOX </option>
                        <option value={"Nintendo Switch"} >Nintendo Switch </option>
                        <option value={"Nintendo WiiU"} >Nintendo WiiU </option>
                        <option value={"Nintendo Wii"} >Nintendo Wii </option>
                     </select>
                     {error.platforms && <p style={{ 'color': 'red' }}>{error.platforms}</p>}
                     <div className="deleteBtns">
                        {videogame.platforms.map((d, i) => (
                        <div key={i}>
                           <button className="deleteBtns" onClick={(e) => handleDeletePlatforms(e, d)}>{d}</button>
                        </div>
                     ))}
                     </div>
                     
                     <br />


                     <div className="column2">
                        <label htmlFor="">Genres: </label>
                           <select onChange={setGenre} className="selectGenres">
                              <option value="" defaultValue>Genres</option>
                              <option value={4} >Action-4</option>
                              <option value={3} >Adventure-3</option>
                              <option value={11} >Arcade-11</option>
                              <option value={28} >Board Games-28</option>
                              <option value={17} >Card-17</option>
                              <option value={40} >Casual-40</option>
                              <option value={34} >Educational-34</option>
                              <option value={19} >Family-19</option>
                              <option value={6} >Fighting-6</option>
                              <option value={51} >Indie-51</option>
                              <option value={59} >Massively Multiplayer-59</option>
                              <option value={83} >Platformer-83</option>
                              <option value={7} >Puzzle-7</option>
                              <option value={5} >RPG-5</option>
                              <option value={1} >Racing-1</option>
                              <option value={2} >Shooter-2</option>
                              <option value={14} >Simulation-14</option>
                              <option value={15} >Sports-15</option>
                              <option value={10} >Strategy-10</option>
                           </select>
                     {error.genres && <p style={{ 'color': 'red' }}>{error.genres}</p>}
                     <div className="deleteBtns">
                        {videogame.genres.map((d, i) => (
                        <div key={i}>
                           <button className="deleteBtns" onClick={(e) => handleDeleteGenres(e, d)}>{d}</button>
                        </div>
                     ))}
                     </div>
                     </div>
                  </div>
                  </div>
               <input type="submit" value= "Create Game" onSubmit={onSubmit} className="createGameBtn" />
            </form>
         </div>
      </div>
     );
 };