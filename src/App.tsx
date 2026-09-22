import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GuideModal } from './components/GuideModal';
import { FaqModal } from './components/FaqModal';
import { SendPage } from './pages/SendPage';
import { VerifPage } from './pages/VerifPage';

export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-100 selection:text-blue-900">
        {/* Header Hex-AM */}
        <Header
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenFaq={() => setIsFaqOpen(true)}
        />

        {/* Focused Center Form Container */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <Routes>
            <Route path="/send" element={<SendPage />} />
            <Route path="/verif" element={<VerifPage />} />
            <Route path="/" element={<Navigate to="/send" replace />} />
            <Route path="*" element={<Navigate to="/send" replace />} />
          </Routes>
        </main>

        {/* Minimal Footer */}
        <Footer />

        {/* Clean Modals for Panduan & FAQ so page never feels crowded */}
        <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
