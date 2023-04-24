import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getWorkById,
  getProductById,
  getWorkProducts,
  postQRQuestions,
  createWorkStep,
  updateWorkStepStatus,
} from './worksapi';

const QRControl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [products, setProducts] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');

  useEffect(() => {
    const fetchData = async () => {
      const workData = await getWorkById(work_id);
      setWork(workData);

      const productsData = await getWorkProducts(work_id);

      if (productsData) {
        const fetchedProducts = await Promise.all(
          productsData.data.map(async (productData) => {
            const product = await getProductById(productData.product_id);
            return product.data;
          })
        );

        setProducts(
          fetchedProducts.map((product) => ({
            product,
            checkedBoxes: Array(3).fill({ yes: false, no: false, active: false }),
            inputValues: Array(3).fill(''),
          }))
        );
      }
    };

    fetchData();
  }, [work_id]);

  const handleCheck = (productIndex, index, value) => {
    const newProducts = [...products];
    const currentBox = { ...newProducts[productIndex].checkedBoxes[index] };

    if (value === "yes" || value === "no") {
      currentBox.yes = value === "yes";
      currentBox.no = value === "no";
    } else {
      currentBox.active = !currentBox.active;
    }

    newProducts[productIndex].checkedBoxes[index] = currentBox;
    setProducts(newProducts);
  };

  const handleInputChange = (productIndex, index, value) => {
    const newProducts = [...products];
    newProducts[productIndex].inputValues[index] = value;
    setProducts(newProducts);
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
        products.map(async (productData, productIndex) => {
          return Promise.all(
            questions.map(async (question, index) => {
              const qrQuestionData = {
                product_id: productData.product.id,
                question: question || '',
                input_text: products[productIndex].inputValues[index] || '',
                checkbox: products[productIndex].checkedBoxes[index].yes,
                vendor_question: products[productIndex].checkedBoxes[index].active,
                work_id: work.data.id,
                step_id: step_id,
                user_id: work.data.quality_responsible_id,
                timestamp: new Date(),
              };
  
              await postQRQuestions(qrQuestionData);
            })
          );
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
        </div>
      )}

      {products &&
        products.map((product, productIndex) => (
          <div key={productIndex}>
            <h3>Product: {product.name}</h3>
            <p>Technical Drawing URL: {product.technicaldrawingurl}</p>

            <form>
              {questions.map((question, index) => (
                <div key={`${productIndex}-${index}`} className="form-group">
                  <label className="d-inline-block" htmlFor={`question-${productIndex}-${index}`}>
                    {question}
                  </label>
                  <div className="form-check form-check-inline">
                  <input
                      type="radio"
                      className="form-check-input"
                      id={`question-${productIndex}-${index}-yes`}
                      name={`question-${productIndex}-${index}`}
                      checked={products[productIndex].checkedBoxes[index].yes}
                      onChange={() => handleCheck(productIndex, index, "yes")}
                    />
                    <label className="form-check-label" htmlFor={`question-${productIndex}-${index}-yes`}>
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                  <input
                      type="radio"
                      className="form-check-input"
                      id={`question-${productIndex}-${index}-no`}
                      name={`question-${productIndex}-${index}`}
                      checked={products[productIndex].checkedBoxes[index].no}
                      onChange={() => handleCheck(productIndex, index, "no")}
                    />
                    <label className="form-check-label" htmlFor={`question-${productIndex}-${index}-no`}>
                      No
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id={`input-${productIndex}-${index}`}
                    value={products[productIndex].inputValues[index]}
                    onChange={(e) => handleInputChange(productIndex, index, e.target.value)}
                  />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`question-${productIndex}-${index}-active`}
                      checked={products[productIndex].checkedBoxes[index].active}
                      onChange={() => handleCheck(productIndex, index, "active")}
                    />
                    <label className="form-check-label" htmlFor={`question-${productIndex}-${index}-active`}>
                      Active
                    </label>
                  </div>
                </div>
              ))}
            </form>
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
    </div>
  );
};

export default QRControl;