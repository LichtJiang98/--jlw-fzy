import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

//导入首页和详情页
import Home from "./pages/Home";
import CityList from "./pages/CityList"
import Search from "./pages/Search";
import SearchList from './pages/SearchList'
import AddShop from './pages/AddShop'
import Map from './pages/Map'
import ShopPage from "./pages/ShopPage/ShopPage";
import MapPage from "./pages/MapPage/MapPage";

import "../src/mock/mockServe.js";
import OriginHome from "./pages/OriginHome";


function App() {
  

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="*" render={() => <Navigate to="/" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/citylist" element={<CityList />} />
        {/* <Route path="/detail" element={<Detail />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/searchlist" element={<SearchList />} />
        <Route path='/addshop' element={<AddShop />} />
        <Route path='/' element={<OriginHome />} />
        <Route path='/map' element={<Map />} />
        <Route path="/shoppage" element={<ShopPage />} />
        <Route path="/mappage" element={<MapPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
