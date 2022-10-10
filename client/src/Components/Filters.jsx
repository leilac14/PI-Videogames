import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../Redux/Actions";
// import { sort, filter } from '../Redux/Actions/index';
// import { base, library, userMade, Action, Puzzle, Indie, Adventure, Arcade, RPG, Strategy, Shooter, Casual, Simulation, Racing, Platformer, Massively_Multiplayer, Sports, Fighting, Board_Games, Card, Educational, Family } from '../Constants/index';

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
                        ))
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
// export default function Order() {
//     let dispatch = useDispatch();

//     function resetAndDispatch(e) {
//         document.getElementById("genre").value =  base;
//         document.getElementById("database").value = base;
//         dispatch(sort(e.target.value));
//     };

//     function onSelectChange(e) {
//         dispatch(sort(e.target.value));
//     };

//     function onSelectFilter(e) {
//         dispatch(filter(e.target.value));
//     };

//     return (
//         <div>
//         <button type="submit" value= {base} onClick={resetAndDispatch}>Reset</button> 

//         <select id="genre" onChange={onSelectFilter}>
//                 <option value={base}>Genre</option>
//                 <option value={Action} >Action</option>
//                 <option value={Adventure} >Adventure</option>
//                 <option value={Arcade} >Arcade</option>
//                 <option value={Board_Games} >Board Games</option>
//                 <option value={Card} >Card</option>
//                 <option value={Casual} >Casual</option>
//                 <option value={Educational} >Educational</option>
//                 <option value={Family} >Family</option>
//                 <option value={Fighting} >Fighting</option>
//                 <option value={Indie} >Indie</option>
//                 <option value={Massively_Multiplayer} >Massively Multiplayer</option>
//                 <option value={Platformer} >Platformer</option>
//                 <option value={Puzzle} >Puzzle</option>
//                 <option value={RPG} >RPG</option>
//                 <option value={Racing} >Racing</option>
//                 <option value={Shooter} >Shooter</option>
//                 <option value={Simulation} >Simulation</option>
//                 <option value={Sports} >Sports</option>
//                 <option value={Strategy} >Strategy</option>
//         </select>

//         <select id="database" onChange={onSelectFilter}>
//             <option value={base}>Origin</option>
//             <option value={library}>Library</option>
//             <option value={userMade} >User-Created</option>
//         </select>
//         </div>
//     );
// };