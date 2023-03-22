import React, { createContext, useEffect, useState } from "react";
import { apiUrl } from "../../importent/api";
import { FaStar } from "react-icons/fa";
import apicalls from "../../utills/apicalls";
import noImage from '../../utills/images/no-image.png'


export function MovieDetials(props) {
  const [duration, SetDuration] = useState(null);
  const [price,setPrice] = useState(Math.floor(Math.random() * (300 - 250 + 1)) + 250)
  const url = `${apiUrl.base}movie/${props.movieDetils.detils.id}?api_key=${apiUrl.key}`;

  useEffect(() => {
    const getMovieDuration = async () => {
      const res = await apicalls(url);
      SetDuration(res.data.runtime);
    };
    getMovieDuration();
  });

  const checkTheStatus = () => {
    props.stateUpLift2(props.movieDetils,price);
  }
  let wishList;
  if(localStorage.getItem('wishlist') === null){
    wishList = [];
  } else {
    wishList = JSON.parse(localStorage.getItem('wishlist'));
  }

  const addToWishList = () => {
    // wishList = JSON.(localStorage.getItem('wishlist'));
    
    if (
      wishList.some(
        (info) =>
          info.detils.id === props.movieDetils.detils.id
      )
    ) {
      // setInfoExist(true);
      return;
    } else {
      wishList.push(props.movieDetils);
      localStorage.setItem("wishlist", JSON.stringify(wishList));
    }
  }

  return (
    <div className="movie-detils">
      <div className="movie-styles">
        <img
          src={props.movieDetils.detils.poster_path===null? noImage :apiUrl.imageBase + props.movieDetils.detils.poster_path}
          alt={props.movieDetils.detils.title}
        />
        <div className="movie-right-container">
          <h3>{props.movieDetils.detils.title}</h3>
          <div>
            <FaStar /> {props.movieDetils.detils.vote_average}/10
          </div>
          <div className="movie-card-text">
            <span>{duration} minutes</span>
            {props.movieDetils.data.map((item, index) => {
              return <span key={"span" + index}>{item.name}</span>;
            })}
          </div>
          <p>{props.movieDetils.detils.overview}</p>
          <p>
            <span className="rupee">&#8377;</span>
            {price}
          </p>
          <div className="buy-wishlist">
            <button type="button" onClick={checkTheStatus}>Book Tickets</button>
            <button type="button" onClick={addToWishList}>Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
