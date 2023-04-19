import React from "react";
import "./App.css";
import HamburgerMenu from "./components/shared/navbar/HamburgerMenu";
import Login from "./components/Login/Login";
import Vendors from "./components/Vendors/Vendors";
import Customers from "./components/Customers/Customers";
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Maintenance from "./components/Maintenance/Maintenance";
import Home from "./components/Home/Home";
import ToleranceTable from "./components/ToleranceTable/ToleranceTable";
import ProductPage from "./components/ProductPage/ProductPage";
import FormsPage from "./components/ITPForms/FormsPage";
import FormEdit from "./components/ITPForms/FormEdit";
import UploadForm from './components/FormsPage/UploadForm';
import Gallery from "./components/Gallery/gallery";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HamburgerMenu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/controltable" element={<ToleranceTable />} />
          <Route path="/products" element={<UploadForm />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/forms/:id" element={<FormEdit />} />
          <Route path='/gallery' element={<Gallery />} />
        </Routes>
      </div>
    </BrowserRouter>
    //xx
  );
}

export default App;
