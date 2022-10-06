import React, { useLayoutEffect } from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postVideogames, getGenres } from '../Redux/Actions/index';
import { Action, Puzzle, Indie, Adventure, Arcade, RPG, Strategy, Shooter, Casual, Simulation, Racing, Platformer, Massively_Multiplayer, Sports, Fighting, Board_Games, Card, Educational, Family } from '../Constants/index'
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../Components/NavBar';

export default function CreateGame() {
    let dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const genres = useSelector(state => state.genres)
    const history = useHistory();
    const [check, setCheck] = useState([]);
    const [plats, setPlats] = useState([]);


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
          //genreArr.push(e.target.value)
          setVideogame({
            ...videogame,
            genres: [...videogame.genres, e.target.value]
          })
       } else {
          setCheck([...check].filter(j => j !== e.target.value))
       };
    };
 
    function setPlatform(e) {
       if (!videogame.platforms.includes(e.target.value)) {
          //platformArr.push(e.target.value)
          setVideogame({
            ...videogame,
            platforms: [...videogame.platforms, e.target.value]
          })
       } else {
          setPlats([...plats].filter(j => j !== e.target.value))
       };
    }; 

    //function handlerDeletePlatform(el) {
    //platforms: plats.platforms.filter(p => p !== el)
    //}
 
    function onInputChange(e) {
         e.preventDefault()
         setVideogame({
             ...videogame,
             [e.target.name]: e.target.value,
             platforms: plats,
             genres: check,
             [e.target.released]: e.target.value,
             [e.target.rating]: e.target.value,
             [e.target.playtime]: e.target.value,
             [e.target.description]: e.target.value,
             [e.target.background_image]: e.target.value,
         });
     };
     
    function swapGenre(arr) {
        
    }  
     
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
         if (!videogame.genres.length) {
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
     
     console.log(videogame)

     return (
        <>
        <NavBar />
        <br/>
         <form action="" onSubmit={onSubmit}>
             <label htmlFor="">Name: </label>
             <input placeholder="Enter a name" onChange={onInputChange} name= "name" type="text" value= {videogame.name}/>
             {error.name && <p style={{ 'color': 'red' }}>{error.name}</p>}
             <br />
             <label htmlFor="">Image URL: </label>
             <input onChange={onInputChange} placeholder="Enter img URL..." name= "background_image" type="text" value= {videogame.background_image}/>
             <br/>
             <label htmlFor="">Description: </label>
             <input placeholder="Enter a description" onChange={onInputChange} name= "description" type="text" value= {videogame.description} maxLength="500" />
             <br />
             <label htmlFor="">Release Date: </label>
             <input placeholder="YYYY/MM/DD" onChange={onInputChange} name= "released" type="date" value= {videogame.released}/>
             {error.released && <p style={{ 'color': 'red' }}>{error.released}</p>}
             <br />
             <label htmlFor="">Rating: </label>          
             <input placeholder="5 - 0" onChange={onInputChange} name= "rating" type="number" value= {videogame.rating} min="0" max="5" step=".01"/>
             {error.rating && <p style={{ 'color': 'red' }}>{error.rating}</p>}
             <br />
             <label htmlFor="">Platforms: </label>
             <select onChange={setPlatform}>
                      <option value="" defaultValue>Platforms</option>
                      <option value={"PC"} >PC</option>
                      <option value={"Linux"} >Linux</option>
                      <option value={"macOS"} >macOS</option>
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
             {videogame.platforms && <h3>{videogame.platforms.join(" - ")}</h3>}
             <br />
             <div>
                <label htmlFor="">Genres: </label>
                   <select onChange={setGenre}>
                      <option value="" defaultValue>Genres</option>
                      <option value={4} >Action</option>
                      <option value={3} >Adventure</option>
                      <option value={11} >Arcade</option>
                      <option value={28} >Board Games</option>
                      <option value={17} >Card</option>
                      <option value={40} >Casual</option>
                      <option value={34} >Educational</option>
                      <option value={19} >Family</option>
                      <option value={6} >Fighting</option>
                      <option value={51} >Indie</option>
                      <option value={59} >Massively Multiplayer</option>
                      <option value={83} >Platformer</option>
                      <option value={7} >Puzzle</option>
                      <option value={5} >RPG</option>
                      <option value={1} >Racing</option>
                      <option value={2} >Shooter</option>
                      <option value={14} >Simulation</option>
                      <option value={15} >Sports</option>
                      <option value={10} >Strategy</option>
                   </select>
             {error.genres && <p style={{ 'color': 'red' }}>{error.genres}</p>}
             {videogame.genres && <h3>{videogame.genres.join(" - ")}</h3>}
             </div>
             <input type="submit" value= "Create Game" onSubmit={onSubmit}/>
         </form>
        </>
     );
 };