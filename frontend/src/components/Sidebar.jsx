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
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
                <SidebarItem icon={<FileText size={20} />} text="Documentation" />
                <SidebarItem icon={<Settings  size={20} />} text="Settings" />
            </nav>

            {/* Footer Area */}
            <div className='border-t border-slate-700 pt-4 mt-auto'>
                <p className='text-xs text-slate-400 text-center'>
                    v1.0.0 Alpha
                </p>
            </div>
        </div>
    );
};

// A small helper component for menu items
const SidebarItem = ( {icon, text, active } ) =>{
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            {icon}
            <span className='font-medium'>{text}</span>
        </div>
    );
};


export default Sidebar;