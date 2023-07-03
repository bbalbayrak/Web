import React from 'react';
import Laptop from '../assets/laptop.jpg';

const EngineeringSolutionSection = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='Engineering Solution' />
        <div className='flex flex-col justify-center'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl text-[#00df9a] font-bold py-2'>Innovative and Cost-Effective Solutions</h1>
          <p>
            YENA Engineering BV is a pioneer in delivering innovative and cost-effective solutions to complex engineering challenges. From design to manufacturing, we handle all aspects of metalworking to meet the unique needs of each project. Our expertise encompasses a wide range of sectors including construction, offshore, marine, and industrial machinery applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EngineeringSolutionSection;
