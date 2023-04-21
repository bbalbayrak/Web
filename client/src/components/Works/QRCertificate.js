import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRCertificate = () => {
  const [checkedStatus, setCheckedStatus] = useState({ approved: false, unapproved: false, rejected: false });
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedStatus({ ...checkedStatus, [name]: checked });
  };

  const handleSave = () => {
    if (checkedStatus.rejected) {
      navigate('/certificate');
    } else {
      navigate('/quality-control');
    }
  };

  return (
    <div>
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
