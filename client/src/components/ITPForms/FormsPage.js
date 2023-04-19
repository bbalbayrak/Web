import React, { useState, useEffect } from 'react';
import { getFormstable } from './formapi';
import './FormsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FormsPage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formsData = await getFormstable();
        setForms(formsData);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="form-page-container">
      <h2>Forms</h2>
      <table className="form-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Vendor Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td>{form.product_name}</td>
              <td>{form.vendor_name}</td>
              <td>
                <Link to={`/forms/${form.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormsPage;
