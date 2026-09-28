import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GuideModal } from './components/GuideModal';
import { FaqModal } from './components/FaqModal';
import { WavyBackground } from './components/WavyBackground';
import { SendPage } from './pages/SendPage';
import { VerifPage } from './pages/VerifPage';

export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        
        {/* Rich Layered Wavy Background with subtle abstract patterns, dot grid, & ambient glow */}
        <WavyBackground />

        {/* Top Navigation Bar: Logo and links */}
        <Header
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenFaq={() => setIsFaqOpen(true)}
        />

        {/* Centered UI Card Design with Soft Shadows */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/send" element={<SendPage />} />
            <Route path="/verif" element={<VerifPage />} />
            <Route path="/" element={<Navigate to="/send" replace />} />
            <Route path="*" element={<Navigate to="/send" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
