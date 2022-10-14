import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../Redux/Actions";

export default function Filters({handlerGenres, handlerCreated, source, genrechange}) {

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    return(
        <div>
                {/* GENRES */}

                <select value={genrechange} onChange={(e) => handlerGenres(e)}>
                    <option value='All'>--Genres--</option>
                    <option value='All'>All</option>
                    {
                        genres && genres.map(g => (
                            <option value={g.name} key={g.id}>{g.name}</option>
                        )) //js resuelve lo ultimo.
                        
                    }
                </select>

                {/* SOURCE */}

                <div>
                    <button style={source === "All"? {backgroundColor: "#6700ff", color: "white", borderColor: "white"} : undefined} onClick={() => handlerCreated('All')} >ALL</button>
                    <button style={source === "Created"? {backgroundColor: "#6700ff", color: "white", borderColor: "white"} : undefined} onClick={() => handlerCreated('Created')}>CREATED</button>
                    <button style={source === "Api"? {backgroundColor: "#6700ff", color: "white", borderColor: "white"} : undefined} onClick={() => handlerCreated('Api')}>RAWG</button>
                </div>            
        </div>
)
}
