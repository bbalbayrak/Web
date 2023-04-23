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
  const [checkedBoxes, setCheckedBoxes] = useState(Array(3).fill({ yes: false, no: false, active: false }));
  const [inputValues, setInputValues] = useState(Array(3).fill(''));
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

  const handleCheck = (index, value) => {
    const newCheckedBoxes = [...checkedBoxes];
    const currentBox = { ...newCheckedBoxes[index] };
  
    if (value === "yes" || value === "no") {
      currentBox.yes = value === "yes";
      currentBox.no = value === "no";
    } else {
      currentBox.active = !currentBox.active;
    }
  
    newCheckedBoxes[index] = currentBox;
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
            input_text: inputValues[index] || '',
            checkbox: checkedBoxes[index].yes,
            vendor_question: checkedBoxes[index].active,
            work_id: work.data.id,
            step_id: step_id,
          };
  
          await postQRQuestions(qrQuestionData);
        })
      );
  
      await updateWorkStepStatus(step_id, 'Closed');
  
      navigate(`/workorders`);
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
    <div className="form-page-container">
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
            <label className="d-inline-block" htmlFor={`question-${index}`}>
              {question}
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id={`question-${index}-yes`}
                name={`question-${index}`}
                checked={checkedBoxes[index].yes}
                onChange={() => handleCheck(index, "yes")}
              />
              <label className="form-check-label" htmlFor={`question-${index}-yes`}>
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id={`question-${index}-no`}
                name={`question-${index}`}
                checked={checkedBoxes[index].no}
                onChange={() => handleCheck(index, "no")}
              />
              <label className="form-check-label" htmlFor={`question-${index}-no`}>
                No
              </label>
            </div>
            <input
              type="text"
              className="form-control"
              id={`input-${index}`}
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id={`question-${index}-active`}
                checked={checkedBoxes[index].active}
                onChange={() => handleCheck(index, "active")}
              />
              <label className="form-check-label" htmlFor={`question-${index}-active`}>
                Active
              </label>
            </div>
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
