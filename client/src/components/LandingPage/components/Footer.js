import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className='w-full py-8 px-4 bg-gray-200 text-center'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 text-center'>
        <div className='contact-info'>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <h2>VISIT US</h2>
          <p>YENA Engineering B.V.</p>
          <p>World Trade Center Rotterdam</p>
          <p>Beursplein 37, 3011 AA, Netherlands</p>
        </div>

        <div className='contact-info'>
          <FontAwesomeIcon icon={faPhone} size="2x" />
          <h2>CALL US</h2>
          <p>Mon-Fri, 9am until 6pm</p>
          <p>+31 10 808 2604</p>
        </div>

        <div className='contact-info'>
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
          <h2>CONTACT US</h2>
          <p>We reply within 24 hours</p>
          <p>yena@yenaengineering.nl</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
