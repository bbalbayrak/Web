import React from 'react';
import StructuralSteel from '../assets/structural_steel.png';
import PressureVessels from '../assets/pressure_vessels.png';
import HotInductionBends from '../assets/hot_induction_bends.png';
import PipeSpoolsAndSkidUnits from '../assets/pipe_spools_and_skid_units.png';
import MarinePipingAndMetalWorks from '../assets/marine_piping_and_metal_works.png';
import MetalMachineryParts from '../assets/metal_machinery_parts.png';

const Cards = () => {
  const cardsData = [
    {
      img: StructuralSteel,
      title: 'Structural Steel Parts',
      description: 'Designing and manufacturing of steel construction for the building, roof systems, skyscrapers and bridges.',
    },
    {
      img: PressureVessels,
      title: 'Pressure Vessels',
      description: 'Pressure Vessel and Tank Manufacturing according to ASME, PED for Chemical, Oil&amp;Gas, Food, Energy, Offshore, Marine and Other Sectors.',
    },
    {
      img: HotInductionBends,
      title: 'Hot Induction Bends',
      description: 'Hot Induction Pipe Bending Up to 10D Radius.',
    },
    {
      img: PipeSpoolsAndSkidUnits,
      title: 'Pipe Spools and Skid Units',
      description: 'Designing, Manufacturing and Erection Solutions for Chemical Industries, Power Plants, Offshore and Marine etc.',
    },
    {
      img: MarinePipingAndMetalWorks,
      title: 'Marine Piping and Metal Works',
      description: 'All kind of Structural Steel, Pipe Spool, Tank and Pipe Support Manufacturing According to Related Marine Classifications.',
    },
    {
      img: MetalMachineryParts,
      title: 'Metal Machinery Parts',
      description: 'CNC Machining, Welding, Laser Cutting, Drilling, Milling, Lathe for Agricultural, Automative, Defence, and Other Industrial Machinery Applications.',
    },
  ];

  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        {cardsData.map((card, index) => (
          <div key={index} className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={card.img} alt={card.title} />
            <h2 className='text-2xl font-bold text-center py-8'>{card.title}</h2>
            <p className='text-center text-xl font-medium py-2 flex-grow'>{card.description}</p> {/* 'flex-grow' added */}
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 mt-auto mb-2'>Learn More</button> {/* 'mt-auto mb-2' added */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;