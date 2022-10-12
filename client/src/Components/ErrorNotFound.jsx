import React from "react";
import { Link } from "react-router-dom";
import ErrorNotFoundImg from '../Assets/errornotfound.gif'

export default function ErrorNotFound() {
    return (
        <div className='containerErrorNotFound'>
          <Link to="/home">
            <button>
              Go Back Home
            </button>
          </Link>
          <div className="errorMsgContainer">
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
