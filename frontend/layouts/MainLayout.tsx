import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AIAssistantButton } from '../components/assistant/AIAssistantButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col relative overflow-x-hidden">
      
      {/* Background Ambient Glow Accents */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-[300px] h-[300px] bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Responsive Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Platform Footer */}
      <Footer />

      {/* Global Floating AI Assistant */}
      <AIAssistantButton />
    </div>
  );
};
