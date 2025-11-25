import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className='flex min-h-screen bg-slate-50'>
            {/* The Sidebar stays fixed on the left */}
            <Sidebar />

            {/* The Main Content Area */}
            <main className='flex-1 ml-64 p-8'>
                {children}
            </main>
        </div>
    );
};

export default Layout;