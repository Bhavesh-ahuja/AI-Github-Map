import React from 'react';
import { LayoutDashboard, Github, FileText, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className='h-screen w-64 bg-slate-900 text-white flex flex-col p-4 fixed left-0 top-0'>
            {/* Logo Area */}
            <div className='flex items-center gap-2 mb-8 px-2'>
                <Github size={28} className='text-blue-400' />
                <h1 className='text-xl font-bold bg-linear-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text'>
                    GitMap.AI
                </h1>
            </div>

            {/* Navigation Menu */}
            <nav className='flex-1 space-y-2'>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20 cursor-default">
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Dashboard</span>
                </div>
            </nav>

            {/* Footer Area */}
            <div className="border-t border-slate-800 pt-6 mt-auto">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-2 font-medium">Status</p>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-slate-300">System Ready</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// A small helper component for menu items
const SidebarItem = ({ icon, text, active }) => {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            {icon}
            <span className='font-medium'>{text}</span>
        </div>
    );
};


export default Sidebar;