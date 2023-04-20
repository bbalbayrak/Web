import React from 'react';
import { useNavigate } from 'react-router-dom';

const QMControl = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };

  const handleSend = () => {
    navigate('/vendor-control');
  };

  return (
    <div>
      <h2>QM Control</h2>
      <form>
        {/* Burada QM Control ekranındaki form alanlarını ekleyebilirsiniz */}
        <button onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        <button onClick={handleSend} className="btn btn-success">
          Send
        </button>
      </form>
    </div>
  );
};

export default QMControl;
