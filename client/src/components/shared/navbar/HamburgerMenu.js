import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './HamburgerMenu.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Transfers from '../../Transfers/Transfers';

const HamburgerMenu = ({ showMenu = true }) => {
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
    showMenu && (
    <div className="menu-container">
      <button className="hamburger-button" onClick={handleToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`hamburger-menu ${closed ? 'closed' : ''}`}>
        <ul className="menu">
          <Link className="link" to="/home">
            Home
          </Link>
          <Link className="link" to="/vendors">
            Vendors
          </Link>
          <Link className="link" to="/customers">
            Customers
          </Link>
          <Link className="link" to="/products">
            Products
          </Link>
          <Link className="link" to="/forms">
            Forms (ITP)
          </Link>
          {isLoggedIn && (
            <li className="link">
              İş Emirleri
                <ul className="sub-menu">
                  <li>
                    <Link className="link" to="/workorders">
                      Açık İşler
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/closed-workorders">
                      Kapalı İşler
                    </Link>
                  </li>
                </ul>
            </li>
          )}
          {isLoggedIn && (
          <Link className="link" to="/users">
            Kullanıcılar
          </Link>
          )}
          {isLoggedIn && (
          <Link className="link" to="/transfers">
            Transferler
          </Link>
          )}
          {isLoggedIn && (
          <Link className="link" to="/inspection-plan">
            Inspection Plan
          </Link>
          )}
          {isLoggedIn && (
            <Link className="link" to="/" onClick={handleLogout}>
              Çıkış Yap
            </Link>
          )}
        </ul>
      </div>
    </div>
     )
  );
};

export default HamburgerMenu;