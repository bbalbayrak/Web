import React, { useState } from "react";
import "./App.css";
import HamburgerMenu from "./components/shared/navbar/HamburgerMenu";
import Login from "./components/Login/Login";
import Vendors from "./components/Vendors/Vendors";
import Customers from "./components/Customers/Customers";
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Maintenance from "./components/Maintenance/Maintenance";
import Home from "./components/Home/Home";
import ProductPage from "./components/ProductPage/ProductPage";
import FormsPage from "./components/ITPForms/FormsPage";
import FormEdit from "./components/ITPForms/FormEdit";
import UploadForm from './components/FormsPage/UploadForm';
import Gallery from "./components/Gallery/gallery";
import WorkOrders from "./components/Works/WorkOrders";
import CreateWorkOrder from "./components/Works/CreateWorkOrder";
import QRControl from "./components/Works/QRControl";
import QMControl from "./components/Works/QMControl";
import VendorControl from "./components/Works/VendorControl";
import QRReview from "./components/Works/QRReview";
import Certificate from "./components/Works/Certificate";
import QRCertificate from "./components/Works/QRCertificate";
import QualityControl from "./components/Works/QualityControl";
import RouteGuard from './components/RouteGuard/RouteGuard';
import Users from './components/Users/Users';
import CreateUser from "./components/Users/CreateUser";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <BrowserRouter>
      <div className="App">
      <HamburgerMenu showMenu={showMenu} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<RouteGuard setShowMenu={setShowMenu}><Customers /></RouteGuard>}/>
          <Route path="/login" element={<Login setShowMenu={setShowMenu} />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/products" element={<UploadForm />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/forms/:id" element={<FormEdit />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/workorders' element={<WorkOrders />} />
          <Route path='/create-work-order' element={<CreateWorkOrder />} />
          <Route path='/qr-control' element={<QRControl />} />
          <Route path='/vendor-control' element={<VendorControl />} />
          <Route path='/qr-review' element={<QRReview />} />
          <Route path='/qr-certificate' element={<QRCertificate />} />
          <Route path='/qm-control' element={<QMControl />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/quality-control' element={<QualityControl />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
