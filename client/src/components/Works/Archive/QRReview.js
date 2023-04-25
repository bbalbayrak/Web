// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { createWorkStep, updateWorkStepStatus } from './worksapi';

// const QRReview = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const work_id = searchParams.get('work_id');
//   const step_id = searchParams.get('step_id');


//   const handleSend = async () => {
//     try {
//       // Yeni bir work step oluşturun
//       const workStepData = {
//         work_id: work_id,
//         step_name: 'Certificate',
//         timestamp: new Date().toISOString(),
//         state: 'Certificate',
//         status: 'Open',
//       };
  
//       const newWorkStep = await createWorkStep(workStepData);
  
//       // Mevcut step'in durumunu güncelleyin
//       await updateWorkStepStatus(step_id, 'Closed');
  
//       // workorders sayfasına yönlendir
//       navigate('/workorders');
//     } catch (error) {
//       console.error('Error creating new step and closing the current step:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>QR Review</h2>
//       <p>QR Review sayfasındaki içerik burada olacak.</p>
//       <button onClick={handleSend} className="btn btn-success">
//         Send
//       </button>
//     </div>
//   );
// };

// export default QRReview;
