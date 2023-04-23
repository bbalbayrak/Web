import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  getWorkById, createWorkStep,  updateWorkStepStatus, getProductById} from './worksapi';

const QRCertificate = () => {
  const [checkedStatus, setCheckedStatus] = useState({ approved: false, unapproved: false, rejected: false });
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [work, setWork] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const work_id = searchParams.get('work_id');

    const fetchData = async () => {
      const workData = await getWorkById(work_id);
      setWork(workData);

      const productData = await getProductById(workData.data.product_id);
      setProduct(productData);
    };

    fetchData();
  }, [location]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedStatus({ ...checkedStatus, [name]: checked });
  };

  const handleSave = () => {
    if (checkedStatus.rejected) {
      navigate('/workoders');
    } else {
      navigate('/workorders');
    }
  };

  return (
    <div className="form-page-container">
      <h2>QR Certificate</h2>
      <div>
        <input
          type="checkbox"
          id="approved"
          name="approved"
          checked={checkedStatus.approved}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="approved">Onayla</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="unapproved"
          name="unapproved"
          checked={checkedStatus.unapproved}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="unapproved">Sertifikasız Onay</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="rejected"
          name="rejected"
          checked={checkedStatus.rejected}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="rejected">Red</label>
      </div>
      <button onClick={handleSave} className="btn btn-primary">
        Kaydet
      </button>
    </div>
  );
};

export default QRCertificate;
