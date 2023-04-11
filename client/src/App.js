import React from "react";
import "./App.css";
import HamburgerMenu from "./components/shared/navbar/HamburgerMenu";
import Login from "./components/Login/Login"
import Vendors from "./components/Vendors/Vendors";
import Customers
 from "./components/Customers/Customers";
import {BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from 'react-router-dom';
import Maintenance from "./components/Maintenance/Maintenance";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HamburgerMenu />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/vendors' element={<Vendors />} />

          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
