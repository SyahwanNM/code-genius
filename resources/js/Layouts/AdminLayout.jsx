import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Users, BookOpen, ShieldCheck, Mail, Bell, 
    LogOut, Search, Zap, Layers, Target, Compass, 
    Settings, Menu, X as CloseIcon, BarChart3, Brain
} from 'lucide-react';

export default function AdminLayout({ auth, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const adminMenu = [
        { label: 'Platform Overview',   icon: BarChart3, href: '/admin/overview' },
        { label: 'Manage Users',        icon: Users,     href: '/admin/users' },
        { label: 'Catalog Content',     icon: BookOpen,  href: '/admin/kursus' },
        { label: 'Soal Penjajakan',     icon: Brain,     href: '/admin/soal-penjajakan' },
        { label: 'Platform Settings',   icon: Settings,  href: '/pengaturan' },
    ];

    return (
        <div className="min-h-screen bg-[#05070A] text-white flex overflow-hidden font-outfit relative">
            {/* Sidebar */}
            <aside className={`
                fixed lg:relative z-[50] lg:z-20
                w-72 h-full border-r border-white/5 bg-[#05070A] 
                transition-transform duration-500 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-10 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                            <ShieldCheck size={22} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase italic">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-1">
                    <p className="px-5 text-[10px] font-black uppercase tracking-[4px] text-gray-700 mb-4">Management</p>
                    {adminMenu.map((item, i) => (
                        <Link 
                            key={i} 
                            href={item.href} 
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${window.location.pathname === item.href ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={20} />
                            <span className="font-bold text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 mt-auto">
                    <Link href="/dashboard" className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-white/5 text-gray-400 font-bold text-xs hover:text-white transition-all mb-4">
                        Exit to Student View
                    </Link>
                    <Link href="/keluar" method="post" as="button" className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all font-bold text-sm">
                        <LogOut size={20} /> Logout
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 overflow-y-auto relative custom-scrollbar flex flex-col">
                <header className="sticky top-0 z-10 bg-[#05070A]/80 backdrop-blur-xl border-b border-white/5 px-6 lg:px-12 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 font-black uppercase tracking-[3px] text-xs text-gray-400">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 rounded-xl bg-white/5 text-gray-400">
                            <Menu size={22} />
                        </button>
                        Terminal <span className="text-red-500">_root</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-[2px]">
                            <div className="w-full h-full rounded-[10px] bg-[#05070A] flex items-center justify-center font-black">
                                {auth.pengguna.nama[0]}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
