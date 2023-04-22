import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from './Userapi';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.data))
      .catch((error) => console.error('API isteğinde hata:', error));
  }, []);
  

  return (
    <div className="form-page-container">
      <h1>Kullanıcılar</h1>
      <Link to="/create-user">Kullanıcı Oluştur</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Rol</th>
            <th>Ad</th>
            <th>Kullanıcı Adı</th>
            <th>İlişkili Şirket</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.related_company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;