import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/navigation/Navbar';

import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TechCenterpieceSection } from './sections/TechCenterpieceSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/navigation/Footer';
import HeroSection from './sections/HeroSection';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useLenisScroll();

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Main Portfolio Application */}
      <div className={`min-h-screen bg-[#050811] text-white transition-opacity duration-700 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <TechCenterpieceSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
