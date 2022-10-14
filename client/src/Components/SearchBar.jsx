import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName, cleanHome } from '../Redux/Actions/index';

export default function SearchBar ({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handlerChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }
    
    function handlerSubmit(e) {
        e.preventDefault();
        dispatch(cleanHome());
        dispatch(getVideogamesByName(name));
        setCurrentPage(1);
        setName("");
    }

    return (
        <div>
            <form onSubmit={(e) => handlerSubmit(e)}>
                <input
                type="text"
                placeholder="Search games..."
                value={name}
                onChange={(e) => handlerChange(e)}
                />

                <button type="submit" disabled= {name === ""}>Search</button>
            </form>
            
        </div>
    )
}