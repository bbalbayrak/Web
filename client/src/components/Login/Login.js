import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowMenu }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    setShowMenu(false);
    return () => {
      setShowMenu(true);
    };
  }, [setShowMenu]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://portal-test.yenaengineering.nl/api/login', { email, password })
      .then((response) => {
        setMessage(response.data.msg);
        if (response.status === 200) {
          // console.log(response.status);
          localStorage.setItem('token', response.data.token);
          navigate('/home');
          window.location.reload(); // Sayfayı yeniden yükle
        } else {
          // console.log('Giriş başarısız');
        }
      })
      .catch((error) => {
        // console.log(error);
        setPassword("");
        if (error.response) {
          setMessage(error.response.data.msg);
        }
      });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Giriş Yap</h2>
        {message && <p className="message">{message}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default Login;