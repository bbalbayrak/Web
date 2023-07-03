import React from 'react';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <h1 className='text-[#00df9a] font-bold p-2 text-6xl'>
        YENA Engineering BV

        </h1>
        <p className='md:text-5xl sm:text-4xl text-xl font-bold text-black py-4'>
          A highly qualified metalworking company with 15 years of experience in the sector.
        </p>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>
          We support our clients with high-quality alternatives by managing over 12 factories from low-cost countries and promptly delivering orders to our clients.
        </p>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>
          We aim to reduce your workload and costs with our experienced project management and QA/QC teams.
        </p>
      </div>
    </div>
  );
};

export default Hero;
