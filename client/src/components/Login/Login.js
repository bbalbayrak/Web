import React, { useEffect } from 'react';
import './Login.css';
import useAuth from './useAuth';

const Login = ({ setShowMenu }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleSubmit
  } = useAuth();

  useEffect(() => {
    setShowMenu(false);
    return () => {
      setShowMenu(true);
    };
  }, [setShowMenu]);

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
