import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
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
          navigate('/home');
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

export default useAuth;
