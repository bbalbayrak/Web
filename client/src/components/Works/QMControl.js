import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getWorkById,
  getProductById,
  postQRQuestions,
  createWorkStep,
  updateWorkStepStatus,
  getQRQuestionsByWorkId,
  updateQRQuestion
} from './worksapi';

const QMControl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [qrQuestions, setQrQuestions] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');

  useEffect(() => {
    const fetchData = async () => {
      const workData = await getWorkById(work_id);
      setWork(workData);

      const qrQuestionsData = await getQRQuestionsByWorkId(work_id);
      setQrQuestions(qrQuestionsData.data);
    };

    fetchData();
  }, [location]);

  const handleSave = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };
  const handleInputChange = (index, value) => {
    const newQRQuestions = [...qrQuestions];
    newQRQuestions[index].input_text_vendor = value;
    setQrQuestions(newQRQuestions); // Burada düzeltme yapıldı
};

const handleCheckboxChange = (index) => {
    const newQRQuestions = [...qrQuestions];
    newQRQuestions[index].checkbox_vendor = !newQRQuestions[index].checkbox_vendor;
    setQrQuestions(newQRQuestions); // Burada düzeltme yapıldı
};
  
  const handleSend = async () => {
    try {
      // QR sorularını güncelle
      await Promise.all(
        qrQuestions.map(async (question) => {
          await updateQRQuestion(question.id, {
            ...question,
            input_text_vendor: question.input_text_vendor,
            checkbox_vendor: question.checkbox_vendor,
          });
        })
      );
  
      // Yeni bir work step oluştur
      const workStepData = {
        work_id: work.data.id,
        step_name: 'Vendor Control',
        timestamp: new Date().toISOString(),
        state: 'Vendor Control',
        status: 'Open',
      };
  
      const newWorkStep = await createWorkStep(workStepData);
  
      await updateWorkStepStatus(step_id, 'Closed');
      navigate(`/vendor-control?work_id=${work.data.id}&step_id=${newWorkStep.workStep.id}`);
    } catch (error) {
      console.error('Error updating QR questions and creating work step:', error);
    }
  };

  return (
    <div>
      <h2>QM Control</h2>
      {work && (
        <div>
          <h3>Work Details</h3>
          <p>Order Number: {work.data.order_number}</p>
          <p>Project Number: {work.data.project_number}</p>
          <p>Product: {work.data.product_id}</p>
          {/* Diğer iş detaylarını istediğiniz şekilde burada gösterebilirsiniz */}
        </div>
      )}
      <form>
        {qrQuestions.map((question, index) => (
          <div key={question.id} className="form-group">
            <label htmlFor={`question-${index}`}>
              {question.question}
            </label>
            <input
              type="text"
              className="form-control"
              id={`input-${index}`}
              value={question.input_text_yena}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox-${index}`}
              checked={question.checkbox_yena}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={handleSend} className="btn btn-success">
          Send
        </button>
      </form>
    </div>
  );
  
};

export default QMControl;
