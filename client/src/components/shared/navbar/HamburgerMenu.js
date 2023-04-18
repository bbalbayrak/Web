import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './HamburgerMenu.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = () => {
  const [closed, setClosed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const handleToggle = () => {
    setClosed(!closed);
  };
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
  
    checkLoggedInStatus(); // İlk render'da çalıştır.
  
    const tokenListener = (e) => {
      if (e.key === 'token') {
        checkLoggedInStatus();
      }
    };
  
    window.addEventListener('storage', tokenListener); // Token değiştiğinde çalıştır.
    return () => {
      window.removeEventListener('storage', tokenListener); // İzleyiciyi temizle.
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };
  return (
    <div className="menu-container">
      <button className="hamburger-button" onClick={handleToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`hamburger-menu ${closed ? 'closed' : ''}`}>
        <ul className="menu">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/vendors">
            Vendors
          </Link>
          <Link className="link" to="/customers">
            Customers
          </Link>
          <Link className="link" to="/controltable">
            Control Table
          </Link>
          <Link className="link" to="/products">
            Products
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/forms">
            Forms
          </Link>
          
          {isLoggedIn && (
            <Link className="link" to="/" onClick={handleLogout}>
              Çıkış Yap
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
