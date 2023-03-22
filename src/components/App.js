import React from "react";
import "../styles/App.css";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./Home";
import { CheckOut } from "./CheckOut/CheckOut";
import { NavBar } from "./BookMyShow/NavBar/NavBar";
import { WishList } from "./WishList/WishList";
import { Movies } from "./BookMyShow/Movies/Movies";

function App() {
  return (
    <div id="main">
    <BrowserRouter >
    {/* <HashRouter> */}
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/wishlist" element={<><NavBar/><WishList/></>} />
      </Routes>
      {/* </HashRouter> */}
    </BrowserRouter>
    </div>
  );
}

export default App;


