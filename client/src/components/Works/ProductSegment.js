import React, { useState, useEffect } from 'react';
import './ProductSegment.css';
import { getFormByVendorIdAndProductId, getFormByFormId } from './worksapi';

const ProductSegment = ({ product, workInfo }) => {
  const [showContent, setShowContent] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (workInfo) {
        const formResponse = await getFormByVendorIdAndProductId(
          workInfo.data.vendor_id,
          product.id
        );

        if (formResponse) {
          const formDetails = await getFormByFormId(formResponse.form.id);
          setForm(formDetails);
        }
      }
    };

    if (product.id) {
      fetchData();
    }
  }, [product.id, workInfo]);

  const handleToggleContent = () => {
    setShowContent(!showContent);
  };

  const handleToggleSubsteps = (stepIndex) => {
    const updatedSteps = form.steps.map((step, index) => {
      if (index === stepIndex) {
        return {
          ...step,
          showSubsteps: !step.showSubsteps,
        };
      }
      return step;
    });
    setForm({ ...form, steps: updatedSteps });
  };

  return (
    <div className="product-segment">
      <button onClick={handleToggleContent} className={showContent ? 'active' : ''}>
        {product.name}
      </button>
      {showContent && (
        <div className="segment-content">
        <h4>Steps</h4>
        {form && (
            <div>
            {form.steps.map((step, index) => (
                <div key={step.name}>
                <button onClick={() => handleToggleSubsteps(index)}>
                    {step.name}
                </button>
                {step.showSubsteps && (
                    <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Technical Drawing Numbering</th>
                            <th>Tools</th>
                            <th>Description</th>
                            <th>Actual Dimension</th>
                            <th>Lower Tolerance</th>
                            <th>Upper Tolerance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {step.substeps.map((substep) => (
                            <tr key={substep.id}>
                            <td>{substep.technical_drawing_numbering}</td>
                            <td>{substep.tools}</td>
                            <td>{substep.description}</td>
                            <td>{substep.actual_dimension}</td>
                            <td>{substep.lower_tolerance}</td>
                            <td>{substep.upper_tolerance}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                )}
                </div>
            ))}
            </div>
        )}
        <p>Test Segment</p>
        </div>
    )}
    </div>
  );
};

export default ProductSegment;