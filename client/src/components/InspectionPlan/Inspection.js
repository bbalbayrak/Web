import React, { useState, useEffect } from 'react';
import './Inspection.css';
import {
  getAllInspectionPlans,
  getAllUsers,
  getUserRole,
  getDescriptionControl 
} from './inspectionapi';

import {
  fetchItems,
} from './inspection_utils';

import InspectionUI from './InspectionUI';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [descriptionControls, setDescriptionControls] = useState({});
  const [descriptionControlsDocuments, setDescriptionControlsDocuments] = useState({});

  useEffect(() => {
    fetchItems(getAllInspectionPlans, async (data) => {
      data.sort((a, b) => a.order_number.localeCompare(b.order_number));

      const descriptionData = await getDescriptionControl();
      const descriptionControls = {};
      for (let desc of descriptionData.data) {
        descriptionControls[desc.inspectionplan_id] = desc.description;
        descriptionControlsDocuments[desc.inspectionplan_id] = desc.documents
      }
      setDescriptionControlsDocuments(descriptionControlsDocuments);
      setDescriptionControls(descriptionControls); 
      setInspectionPlans(data);
    });
    
    fetchItems(getAllUsers, setUsers);

    const userRole = getUserRole();
    setCurrentUserRole(userRole.role);
    setCurrentUserId(userRole.user_id);

  }, [updateTrigger]);

  return (
    <InspectionUI 
      inspectionPlans={inspectionPlans} 
      setInspectionPlans={setInspectionPlans}
      users={users} 
      currentUserRole={currentUserRole} 
      currentUserId={currentUserId} 
      updateTrigger={updateTrigger} 
      setUpdateTrigger={setUpdateTrigger} 
      descriptionControls={descriptionControls} 
      setDescriptionControls={setDescriptionControls}
      setDescriptionControlsDocuments={setDescriptionControlsDocuments}
      descriptionControlsDocuments={descriptionControlsDocuments}
    />
  );
};

export default Inspection;
