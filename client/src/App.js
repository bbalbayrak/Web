import React, { useState } from "react";
import "./App.css";
import HamburgerMenu from "./components/shared/navbar/HamburgerMenu";
import Login from "./components/Login/Login";
import Vendors from "./components/Vendors/Vendors";
import Customers from "./components/Customers/Customers";
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Maintenance from "./components/Maintenance/Maintenance";
import Home from "./components/Home/Home";
import FormsPage from "./components/ITPForms/FormsPage";
import FormEdit from "./components/ITPForms/FormEdit";
import UploadForm from './components/FormsPage/UploadForm';
import Gallery from "./components/Gallery/gallery";
import WorkOrders from "./components/Works/WorkOrders";
import CreateWorkOrder from "./components/Works/CreateWorkOrder";
import Certificate from "./components/Works/Certificate";
import QRCertificate from "./components/Works/QRCertificate";
import QualityControl from "./components/Works/QualityControl";
import RouteGuard from './components/RouteGuard/RouteGuard';
import Users from './components/Users/Users';
import CreateUser from "./components/Users/CreateUser";
import NewWork from "./components/Works/NewWork";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import CreateVendor from "./components/Vendors/CreateVendor";
import CreateCustomer from "./components/Customers/CreateCustomer";
import FormCreate from "./components/ITPForms/CreateForm";
import Transfers from "./components/Transfers/Transfers";
import TransfersDetail from "./components/Transfers/TransfersDetail";
function App() {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <BrowserRouter>
      <div className="App">
      <HamburgerMenu showMenu={showMenu} />
        <Routes>
          <Route exact path="/" element={<Login setShowMenu={setShowMenu} />}/>
          <Route path="/customers" element={<RouteGuard setShowMenu={setShowMenu}><Customers /></RouteGuard>}/>
          <Route path="/login" element={<Login setShowMenu={setShowMenu} />}/>
          <Route path="/home" element={<RouteGuard setShowMenu={setShowMenu}><Home /></RouteGuard>}/>
          <Route path="/vendors" element={<RouteGuard setShowMenu={setShowMenu}><Vendors /></RouteGuard>}/>
          <Route path="/products" element={<RouteGuard setShowMenu={setShowMenu}><UploadForm /></RouteGuard>}/>
          <Route path="/forms" element={<RouteGuard setShowMenu={setShowMenu}><FormsPage /></RouteGuard>}/>
          <Route path="/forms/:id" element={<RouteGuard setShowMenu={setShowMenu}><FormEdit /></RouteGuard>}/>
          <Route path='/gallery' element={<RouteGuard setShowMenu={setShowMenu}><Gallery /></RouteGuard>}/>
          <Route path='/workorders' element={<RouteGuard setShowMenu={setShowMenu}><WorkOrders /></RouteGuard>}/>
          <Route path='/newworks' element={<RouteGuard setShowMenu={setShowMenu}><NewWork /></RouteGuard>}/>
          <Route path='/create-work-order' element={<RouteGuard setShowMenu={setShowMenu}><CreateWorkOrder /></RouteGuard>}/>
          <Route path='/certificate' element={<RouteGuard setShowMenu={setShowMenu}><Certificate /></RouteGuard>}/>
          <Route path='/qr-certificate' element={<RouteGuard setShowMenu={setShowMenu}><QRCertificate /></RouteGuard>}/>
          <Route path='/quality-control' element={<RouteGuard setShowMenu={setShowMenu}><QualityControl /></RouteGuard>}/>
          <Route path="/users" element={<RouteGuard setShowMenu={setShowMenu}><Users /></RouteGuard>}/>
          <Route path="/create-user" element={<RouteGuard setShowMenu={setShowMenu}><CreateUser /></RouteGuard>}/>
          <Route path="/*" element={<RouteGuard setShowMenu={setShowMenu}><PageNotFound /></RouteGuard>}/>
          <Route path="/create-vendor" element={<RouteGuard setShowMenu={setShowMenu}><CreateVendor /></RouteGuard>}/>
          <Route path="/create-customer" element={<RouteGuard setShowMenu={setShowMenu}><CreateCustomer /></RouteGuard>}/>
          <Route path="/create-form" element={<RouteGuard setShowMenu={setShowMenu}><FormCreate /></RouteGuard>}/>
          <Route path="/transfers" element={<RouteGuard setShowMenu={setShowMenu}><Transfers /></RouteGuard>}/>
          <Route path="//transfers/:name" element={<RouteGuard setShowMenu={setShowMenu}><TransfersDetail /></RouteGuard>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
