import React from 'react';
import EngineeringSolutionSection from './components/EngineeringSolutionSection';
import Cards from './components/Cards';
import Hero from './components/Hero';
import Newsletter from './components/NewsLetter';
import Footer from './components/Footer';

function LandingPage() {
  return (
    <div>
      <Hero />
      <EngineeringSolutionSection />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default LandingPage;