import React from "react";
import './CSS Styling/SortBy.css'

export default function SortBy({handlerByName, handlerByRating, namechange, ratingchange}) {

    return (
        <div>
            <div className="container">
                <label>Name </label>
                <select value={namechange} onChange={(e) => handlerByName(e)}>
                    <option value=''>--Select--</option>
                    <option value='asc'>(A - Z)</option>
                    <option value='desc'>(Z - A)</option>
                </select>
            </div>

            <div className="container">
                <label>Rating</label>
                <select value={ratingchange} onChange={(e) => handlerByRating(e)}>
                    <option value=''>--Select--</option>
                    <option value='asc'>Rating 0 - 5</option>
                    <option value='desc'>Rating 5 - 0</option>
                </select>
            </div>
        </div>
    )

}
