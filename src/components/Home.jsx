import React, { createContext, useEffect, useReducer, useState } from "react";
import "../styles/App.css";
import { Genres } from "./BookMyShow/Genres/Genres";
import { Movies } from "./BookMyShow/Movies/Movies";
import { NavBar } from "./BookMyShow/NavBar/NavBar";
import { TicketBooking } from "./BookMyShow/TicketBooking/TicketBooking";
import { apiUrl } from "./importent/api";
import { Overlay } from "./OverLay/Overlay";
import apicalls from "./utills/apicalls";
import deBounce from "./utills/deBounce";
import { Validation } from "./Validation";

export const UserContex = createContext();

export function Home() {
  const [price, setPrice] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [playNowList, setPlayNowList] = useState(null);
  const [stateUp, setStateUp] = useState({
    seatData: null,
    flag: false,
  });
  const [checkOverlay, setCheckOverlay] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [movieHeading,setMovieHeading] = useState('Now Playing');
  let loginChecking;

  useEffect(() => {
    const genresList = async () => {
      if (localStorage.getItem("genres") === null) {
        const getData = await apicalls(
          `${apiUrl.base}${apiUrl.getGenres}?api_key=${apiUrl.key}`
        );
        localStorage.setItem("genres", JSON.stringify(getData.data.genres));
        setApiData(getData.data.genres);
      } else {
        const currentData = localStorage.getItem("genres");
        setApiData(JSON.parse(currentData));
      }
    };
    genresList();

    const nowPlayingList = async () => {
      // if (localStorage.getItem("movie") === null) {
        const getData = await apicalls(
          `${apiUrl.base}${apiUrl.nowPlaying}?api_key=${apiUrl.key}&page=1`
        );
        localStorage.setItem("movie", JSON.stringify(getData.data.results));
        setPlayNowList(getData.data.results);
      // } else {
      //   const currentData = localStorage.getItem("movie");
      //   setPlayNowList(JSON.parse(currentData));
      // }
    };
    nowPlayingList();
  }, []);

  loginChecking = loginStatus;

  const stateUpLift = (arg, arg2) => {
    setStateUp({
      stateUp: arg,
      flag: true,
    });
    setPrice(arg2);
    if (!loginStatus) {
      setCheckOverlay(true);
    }
  };

  const checkForLoginStatus = () => {
    if (sessionStorage.getItem("login") !== null) {
      const data = JSON.parse(sessionStorage.getItem("login"));
      setLoginStatus(data.status);
    } else {
      setLoginStatus(true);
    }
  };

  const overlayFlagCheck = () => {
    setCheckOverlay(false);
  };

  const loginFunction = () => {
    if (sessionStorage.getItem("login") !== null) {
      const data = JSON.parse(sessionStorage.getItem("login"));
      setLoginStatus(data.status);
    }
  };
  useEffect(() => {
    loginFunction();
  }, []);

  const newApicall = (genre) => {
    const getByGenresID = async () => {
      const moviesWithGenres = await apicalls(`${apiUrl.base}discover/movie?api_key=${apiUrl.key}&language=en-US&with_genres=${genre.id}`);
      setPlayNowList(moviesWithGenres.data.results);
      setMovieHeading(genre.name)
    }
    getByGenresID()
  }

  const apiCallForSearch = (search) => {
    const searchMovieApiCall = async () => {
      const mavieName = await apicalls(`${apiUrl.base}search/movie?api_key=${apiUrl.key}&page=1&query=${search}`);
      setPlayNowList(mavieName.data.results);
      setMovieHeading("Search Result")
    }
    if(search.length !== 0){
      searchMovieApiCall()
    }
  
  }

  const sortFun = () => {
    const temp = playNowList;
    const temp1 = temp.sort((a,b) => {
      return b.vote_average - a.vote_average
    })
    setPlayNowList([...temp1])
  }

  // sessionStorage.clear()
  return (
    <>
      <NavBar checkForLoginStatus={checkForLoginStatus} searchMovie = {apiCallForSearch} />
      <UserContex.Provider value={price}>
        {loginStatus && stateUp.flag ? (
          <TicketBooking BookingData={stateUp} />
        ) : (
          <div className="genres-content">
            <Genres heading="Genres" apiData={apiData} newApicall={newApicall} />
            <Movies
              heading={movieHeading}
              imagePath={apiUrl.imageBase}
              apiData={playNowList}
              flagStatus={stateUpLift}
              sortFun = {sortFun}
            />
          </div>
        )}
      </UserContex.Provider>
      {checkOverlay && (
        <Overlay functionCall={overlayFlagCheck}>
          <Validation />
        </Overlay>
      )}
    </>
  );
}
