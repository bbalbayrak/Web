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
import TestPage1 from "./components/testpages/testpage1";
import TestPage2 from "./components/testpages/testpage2";
import TestPage3 from "./components/testpages/testpage3";
import TestPage4 from "./components/testpages/testpage4";
import TestPage5 from "./components/testpages/testpage5";
import TestPage6 from "./components/testpages/testpage6";


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
          <Route path='/testpage1' element={<TestPage1 />} />
          <Route path='/testpage2' element={<TestPage2 />} />
          <Route path='/testpage3' element={<TestPage3 />} />
          <Route path='/testpage4' element={<TestPage4 />} />
          <Route path='/testpage5' element={<TestPage5 />} />
          <Route path='/testpage6' element={<TestPage6 />} />

        </Routes>
      </div>
    </BrowserRouter>
    //xx
  );
}

export default App;
