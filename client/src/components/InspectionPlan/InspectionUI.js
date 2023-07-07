import React from 'react';
import { columns, control_type } from './enumerated_inspection';
import {
  handleControlResponsibleChange,
  handleDateChange,
  handleControlTypeChange,
  handleDescriptionChange,
  handleUpdateClick,
  handleApproveClick,
  handleRejectClick,
  handleCrossClick,
} from './inspection_utils';

const InspectionUI = ({
  inspectionPlans,
  setInspectionPlans, 
  users, 
  currentUserRole, 
  currentUserId, 
  updateTrigger, 
  setUpdateTrigger, 
  descriptionControls, 
  setDescriptionControls
}) => {
  return (
    <div className="inspection-container">
      <h1 className="inspection-title">Inspection Plan</h1>
      <div className="inspection-table-container">
        <table className="inspection-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inspectionPlans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.vendor_name.substring(0, 12)}</td>
                <td>{plan.customer_name.substring(0, 12)}</td>
                <td>{plan.product_name}</td>
                <td>{plan.order_number}</td>
                <td>{plan.project_number}</td>
                <td>{plan.quantity}</td>
                <td>
                  <select
                    value={plan.control_type || ''}
                    onChange={event =>
                      handleControlTypeChange(
                        event,
                        plan.id,
                        setInspectionPlans
                      )
                    }
                  >
                    <option value="">Select Control Type</option>
                    {control_type.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={plan.control_responsible || 'unselected'}
                    onChange={event =>
                      handleControlResponsibleChange(
                        event,
                        plan.id,
                        setInspectionPlans
                      )
                    }
                  >
                    <option value="unselected">
                      Select Control Responsible
                    </option>
                    {users.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    type="date"
                    value={
                      plan.control_date
                        ? new Date(plan.control_date)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onChange={date =>
                      handleDateChange(date, plan.id, setInspectionPlans)
                    }
                  />
                </td>
                <td>{plan.note}</td>
                <td>
                  <textarea
                    placeholder="Description"
                    style={{ resize: 'vertical' }}
                    value={descriptionControls[plan.id] || ''}
                    onChange={e =>
                      handleDescriptionChange(
                        e,
                        plan.id,
                        descriptionControls,
                        setDescriptionControls
                      )
                    }
                  />
                </td>
                <td>
                  {plan.delivery_date
                    ? new Date(plan.delivery_date).toLocaleDateString('tr-TR')
                    : ''}
                </td>
                <td>{plan.status}</td>
                <td>{plan.state}</td>
                <td>
                  <button
                    className="inspection-button"
                    onClick={() => {
                      handleUpdateClick(
                        plan.id,
                        inspectionPlans,
                        descriptionControls[plan.id],
                        currentUserId,
                        setUpdateTrigger
                      );
                      setUpdateTrigger(prev => !prev);
                    }}
                  >
                    Update
                  </button>
                  {currentUserRole === 'Quality Manager' && (
                    <>
                      <button
                        className="inspection-button"
                        onClick={() => {
                          handleApproveClick(
                            plan.id,
                            inspectionPlans,
                            descriptionControls[plan.id],
                            currentUserId,
                            setUpdateTrigger
                          );
                          setUpdateTrigger(prev => !prev);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="inspection-button"
                        onClick={() => {
                          handleRejectClick(
                            plan.id,
                            inspectionPlans,
                            descriptionControls[plan.id],
                            currentUserId,
                            setUpdateTrigger
                          );
                          setUpdateTrigger(prev => !prev);
                        }}
                      >
                        Reject
                      </button>
                      <button
                        className="inspection-button"
                        onClick={() =>
                          handleCrossClick(plan.id, setInspectionPlans)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionUI;
