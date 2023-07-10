import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://portal-test.yenaengineering.nl/api/login', { email, password })
      .then((response) => {
        setMessage(response.data.msg);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          navigate('/landing-page');
          window.location.reload();
        }
      })
      .catch((error) => {
        setPassword("");
        if (error.response) {
          setMessage(error.response.data.msg);
        }
      });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleSubmit
  };
};

export function logout() {
  // localStorage'daki token'ı temizle
  localStorage.removeItem('token');
  
  // kullanıcıyı login sayfasına yönlendir
  window.location = '/landing-page';
}

export function isLoggedIn() {
  return localStorage.getItem('token') ? true : false;
}
