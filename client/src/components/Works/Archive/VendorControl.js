// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { getWorkById, getQRQuestionsByWorkId, createWorkStep, updateWorkStepStatus, } from './worksapi';


// const VendorControl = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const work_id = searchParams.get('work_id');
//   const step_id = searchParams.get('step_id');
  
//   const [work, setWork] = useState(null);
//   const [qrQuestions, setQRQuestions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const workData = await getWorkById(work_id);
//       setWork(workData);
  
//       const qrQuestionsData = await getQRQuestionsByWorkId(work_id);
//       setQRQuestions(qrQuestionsData.data);
//     };
  
//     fetchData();
//   }, [location]);

//   const handleSend = async () => {
//     try {
//       // Yeni bir work step oluşturun
//       const workStepData = {
//         work_id: work.data.id,
//         step_name: 'QR Review',
//         timestamp: new Date().toISOString(),
//         state: 'QR Review',
//         status: 'Open',
//       };
  
//       const newWorkStep = await createWorkStep(workStepData);

//       await updateWorkStepStatus(step_id, 'Closed');
  
//       navigate(`/workorders`);
//     } catch (error) {
//       console.error('Error sending QR questions:', error);
//     }
//   };

//   return (
//     <div className="form-page-container">
//       <h2>Vendor Control</h2>
//       <form>
//         {qrQuestions.map((question, index) => (
//           <div key={index} className="form-group">
//             <div className="form-check d-inline-block">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id={`checkbox-${index}`}
//                 checked={question.checkbox_vendor || false}
//                 readOnly
//               />
//             </div>
//             <label className="form-check-label d-inline-block" htmlFor={`checkbox-${index}`}>
//               {question.question}
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id={`input-${index}`}
//               value={question.input_text_vendor || ''}
//               readOnly
//             />
//           </div>
//         ))}
//       </form>
//       <button type="button" onClick={handleSend} className="btn btn-primary">
//       Send
//       </button>
//     </div>
//   );
// };

// export default VendorControl;