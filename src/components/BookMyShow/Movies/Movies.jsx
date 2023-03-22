import React, { useEffect, useState } from "react";
import "../Movies/Movie.css";
import { Overlay } from "../../OverLay/Overlay";
import { MovieCard } from "./MovieCard";
import { MovieDetials } from "./MovieDetials";

export function Movies(props) {
  const [detailsData, setDetailsData] = useState(null);
  const [overlayFlag, setOverlayFlag] = useState(false);
  // const genreDataString = localStorage.getItem("genres");
  const genreData = JSON.parse(localStorage.getItem("genres"));


  const movieCardEvent = (ids) => {
    const showData = genreData.filter((el) => {
      return ids.genre_ids.some((f) => {
        return f === el.id;
      });
    });
    setOverlayFlag(true);
    setDetailsData({ data: showData, detils: ids });
    // props.flagStatus(ids);
  };

  const setFunction = () => {
    setOverlayFlag(false);
  };


  const movieCardList = (arr) => {
    return arr.map((item, index) => {
      return (
        <div
          className="movieCard"
          key={"movieCard" + index}
          onClick={() => {
            movieCardEvent(item);
          }}
        >
          <MovieCard item={item} index={index} />
        </div>
      );
    });
  };

  const stateLift2 = (arg,arg2) => {
    props.flagStatus(arg,arg2);
  }

  const sortData = () => {
    props.sortFun();
  }

  return (
    <div className="movie-container">
      {overlayFlag && (
        <Overlay functionCall={setFunction}>
          <MovieDetials stateUpLift2={stateLift2} movieDetils={detailsData} />
        </Overlay>
      )}
      <h2>{props.heading} 
      {/* <button onClick={sortData}>sort</button> */}
      </h2>
      {props.apiData === null ? (
        ""
      ) : (
        <div className="main-movie-card">{movieCardList(props.apiData)}</div>
      )}
    </div>
  );
}
