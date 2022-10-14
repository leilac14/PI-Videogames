import React from "react";
import { Link } from "react-router-dom";
import ErrorNotFoundImg from '../Assets/errornotfound.gif'
import './CSS Styling/ErrorNotFound.css'

export default function ErrorNotFound() {
    return (
        <div>
          <div>
          <h2 className="errorText">
            ⚠️Sorry, This Content Was Not Found!⚠️
          </h2>
          <img
            src={ErrorNotFoundImg}
            alt="Image Not Found"
          />
          </div>
        </div>
      );
}
