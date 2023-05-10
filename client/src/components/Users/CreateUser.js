import React, { useState } from 'react';
import { createUser } from './Userapi';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

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
      // console.error('Kullanıcı oluşturulamadı:', error);
    }
  };

  return (
    <div className="create-user-container">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <h2>Kullanıcı Oluştur</h2>
        <div className="form-group">
          <label htmlFor="name">İsim:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifre:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefon:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="role">Rol:</label>
          <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="relatedCompany">İlgili Şirket:</label>
          <input type="text" id="relatedCompany" value={relatedCompany} onChange={(e) => setRelatedCompany(e.target.value)} />
        </div>
        <button type="submit">Kullanıcı Oluştur</button>
      </form>
    </div>
  );
};

export default CreateUser;
