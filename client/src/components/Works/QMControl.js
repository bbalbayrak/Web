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
    newQRQuestions[index].input_text = value;
    setQrQuestions(newQRQuestions); 
};

  const handleCheckboxChange = (index, field, value) => {
    const newQRQuestions = [...qrQuestions];
    newQRQuestions[index][field] = value;
    setQrQuestions(newQRQuestions);
  };

  const handleVendorCheckboxChange = (index) => {
    const newQRQuestions = [...qrQuestions];
    newQRQuestions[index].vendor_question = !newQRQuestions[index].vendor_question;
    setQrQuestions(newQRQuestions);
  };
  
  const handleSend = async () => {
    try {
      // QR sorularını güncelle
      const updatePromises = qrQuestions.map(async (question) => {
        const response = await updateQRQuestion(question.id, {
          ...question,
          input_text: question.input_text,
          checkbox: question.checkbox,
          vendor_question: question.vendor_question,
        });
        console.log('Updated question:', response);
        return response;
      });
  
      const updateResponses = await Promise.all(updatePromises);
  
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
      navigate(`/workorders`);
    } catch (error) {
      console.error('Error updating QR questions and creating work step:', error);
    }
  };

  return (
    <div className="form-page-container">
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
          <div key={question.id}>
            <div className="form-group row">
              <label htmlFor={`question-${index}`} className="col-sm-8 col-form-label">
                {question.question}
              </label>
              <div className="col-sm-2">
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`yes-radio-${index}`}
                    name={`radio-${index}`}
                    checked={question.checkbox === true}
                    onChange={() => handleCheckboxChange(index, 'checkbox', true)}
                  />
                  <label className="form-check-label" htmlFor={`yes-radio-${index}`}>
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`no-radio-${index}`}
                    name={`radio-${index}`}
                    checked={question.checkbox === false}
                    onChange={() => handleCheckboxChange(index, 'checkbox', false)}
                  />
                  <label className="form-check-label" htmlFor={`no-radio-${index}`}>
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id={`input-${index}`}
                  value={question.input_text}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
              <div className="col-sm-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`vendor-checkbox-${index}`}
                    checked={question.vendor_question}
                    onChange={() => handleVendorCheckboxChange(index)}
                  />
                  <label className="form-check-label" htmlFor={`vendor-checkbox-${index}`}>
                    Active
                  </label>
                </div>
              </div>
            </div>
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
