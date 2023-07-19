import React, { useState } from 'react';

const ButtonPopup = ({ triggerText, title, buttons, triggerButtonStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup} className={triggerButtonStyle}>{triggerText}</button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-base leading-6 font-medium text-gray-900">{title}</h2>
                <div className="mt-5">
                  {buttons.map((button, index) => (
                    <button key={index} onClick={() => {
                      button.action();
                      togglePopup();
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 text-sm">
                      {button.label}
                    </button>
                  ))}
                  <button onClick={togglePopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonPopup;
