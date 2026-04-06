import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddTransactionModal } from './components/AddTransactionModal';

export function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-black relative overflow-hidden transition-colors duration-500">
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 p-8 pb-0">
            {/* Header */}
            <Header onAddTransaction={() => setIsModalOpen(true)} />

            {/* Content Area */}
            <div className="mt-8">
              <Outlet />
            </div>
          </div>

          {/* Footer - Moved inside the content wrapper so it anchors properly */}
          <div className="p-8 pt-0 mt-8">
            <Footer />
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}