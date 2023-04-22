import React, { useState } from 'react';
import { createUser } from './Userapi';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [relatedCompany, setRelatedCompany] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = {
        email,
        password,
        phone,
        role,
        name,
        username,
        related_company: relatedCompany,
      };
      const newUser = await createUser(userData);
      navigate(`/users`);
    } catch (error) {
      console.error('Kullanıcı oluşturulamadı:', error);
    }
  };
  
  return (
    <div>
      <h1>Kullanıcı Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Şifre:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="phone">Telefon:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="role">Rol:</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="name">Ad:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username">Kullanıcı Adı:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="relatedCompany">İlişkili Şirket:</label>
        <input
          type="text"
          id="relatedCompany"
          value={relatedCompany}
          onChange={(e) => setRelatedCompany(e.target.value)}
        />
        <button type="submit">Kullanıcı Oluştur</button>
      </form>
    </div>
  );
};

export default CreateUser;