import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); 

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/login', { email, password })
      .then((response) => {
        setMessage(response.data.msg); 
        if (response.status === 200) {
          console.log(response.status);
          localStorage.setItem('token', response.data.token);

        } else {
          console.log('Giriş başarısız');
        }
      })
      .catch((error) => {
        console.log(error);
        setPassword("");
        if (error.response) {
          setMessage(error.response.data.msg);
        }
      });
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      {message && <p className="message">{message}</p>} 
      <form onSubmit={handleSubmit}>
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
  );
};

export default Login;
