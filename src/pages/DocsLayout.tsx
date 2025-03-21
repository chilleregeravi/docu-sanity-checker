
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocsSidebar from '@/components/DocsSidebar';
import PageTransition from '@/components/PageTransition';

const DocsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16 flex flex-col md:flex-row">
        <DocsSidebar />
        
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <PageTransition>
            <div className="max-w-4xl mx-auto">
              <Outlet />
            </div>
          </PageTransition>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocsLayout;
