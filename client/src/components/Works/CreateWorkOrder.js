import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWorkOrder = () => {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // Burada formdaki verileri toplayıp API POST request'i yapabilirsiniz
    // Veriler başarıyla kaydedildikten sonra aşağıdaki kodu kullanarak işlem yapabilirsiniz
  };

  const handleSend = (e) => {
    e.preventDefault();
    navigate('/qr-control');
  };

  return (
    <div>
      <h2>Create Work Order</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" className="form-control" required></textarea>
        </div>
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

export default CreateWorkOrder;
