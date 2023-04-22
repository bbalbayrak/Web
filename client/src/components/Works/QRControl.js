import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getWorkById,
  getProductById,
  postQRQuestions,
  createWorkStep,
  updateWorkStepStatus,
} from './worksapi';


const QRControl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [product, setProduct] = useState(null);
  const [checkedBoxes, setCheckedBoxes] = useState(new Array(3).fill(false));
  const [inputValues, setInputValues] = useState(new Array(3).fill(''));
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

  const handleCheck = (index) => {
    const newCheckedBoxes = [...checkedBoxes];
    newCheckedBoxes[index] = !checkedBoxes[index];
    setCheckedBoxes(newCheckedBoxes);
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSave = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };

  const handleSend = async () => {
    try {
      // Yeni bir work step oluşturun
      const workStepData = {
        work_id: work.data.id,
        step_name: 'QM Control',
        timestamp: new Date().toISOString(),
        state: 'QM Control',
        status: 'Open',
      };
  
      const newWorkStep = await createWorkStep(workStepData);
  
      // QR sorularını gönderin
      await Promise.all(
        questions.map(async (question, index) => {
          const qrQuestionData = {
            product_id: product.data.id,
            question: question || '',
            input_text_yena: inputValues[index] || '',
            input_text_vendor: '',
            checkbox_yena: checkedBoxes[index] === true ? true : false,
            checkbox_vendor: false,
            vendor_question: false,
            work_id: work.data.id,
          };
  
          await postQRQuestions(qrQuestionData);
        })
      );

      await updateWorkStepStatus(step_id, 'Closed');
  
      navigate(`/qm-control?work_id=${work_id}&step_id=${newWorkStep.workStep.id}`);
    } catch (error) {
      console.error('Error sending QR questions:', error);
    }
  };

  const handleRevise = () => {
    // Revize işlemini gerçekleştirebilirsiniz
  };

  const questions = [
    "Teknik Resim üzerinde müşteri bilgisi yoktur",
    "Ürün malzemesi bulunabilir",
    "Deneme"
  ];

  return (
    <div>
      <h2>QR Control</h2>
      {work && (
        <div>
          <h3>Work Details</h3>
          <p>Order Number: {work.data.order_number}</p>
          <p>Project Number: {work.data.project_number}</p>
          <p>Product: {work.data.product_id}</p>
          {/* Diğer iş detaylarını istediğiniz şekilde burada gösterebilirsiniz */}
        </div>
      )}

      {product && (
        <div>
          <h3>Product Technical Drawing URL</h3>
          <p>{product.data.technicaldrawingurl}</p>
        </div>
      )}

      <form>
        {questions.map((question, index) => (
          <div key={index} className="form-group">
            <div className="form-check d-inline-block">
              <input
                type="checkbox"
                className="form-check-input"
                id={`question-${index}`}
                checked={checkedBoxes[index]}
                onChange={() => handleCheck(index)}
              />
            </div>
            <label className="form-check-label d-inline-block" htmlFor={`question-${index}`}>
              {question}
            </label>
            <input
              type="text"
              className="form-control"
              id={`input-${index}`}
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={handleSend} className="btn btn-success">
          Send
        </button>
        <button type="button" onClick={handleRevise} className="btn btn-warning">
          Revize
        </button>
      </form>
    </div>
  );
};

export default QRControl;
