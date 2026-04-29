import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Users, BookOpen,
    LogOut, Menu, X, BarChart3, Brain, Settings, ChevronRight
} from 'lucide-react';

export default function AdminLayout({ auth, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const adminMenu = [
        { label: 'Overview',      icon: BarChart3, href: '/admin/overview' },
        { label: 'Pengguna',      icon: Users,     href: '/admin/users' },
        { label: 'Konten Kursus', icon: BookOpen,  href: '/admin/kursus' },
        { label: 'Soal Penjajakan', icon: Brain,   href: '/admin/soal-penjajakan' },
        { label: 'Pengaturan',    icon: Settings,  href: '/pengaturan' },
    ];

    const isActive = (href) => url.startsWith(href);

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white flex overflow-hidden">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
                w-[240px] h-full flex flex-col
                bg-[#0B0E14] border-r border-white/5
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-white/5 shrink-0">
                    <Link href="/" className="flex items-center gap-2.5">
                        <img
                            src="/images/logo_darkmode.svg"
                            alt="Code Genius"
                            className="h-7 object-contain"
                        />
                        <span className="text-xs font-black tracking-widest uppercase text-red-500">Admin</span>
                    </Link>
                    <button
                        className="lg:hidden text-gray-500 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                    <p className="px-3 text-[9px] font-black uppercase tracking-[4px] text-gray-700 mb-3">
                        Manajemen
                    </p>
                    {adminMenu.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    active
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/15'
                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <item.icon size={16} className="shrink-0" />
                                <span>{item.label}</span>
                                {active && <ChevronRight size={12} className="ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="p-3 border-t border-white/5 space-y-1 shrink-0">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-gray-500 font-semibold hover:text-white hover:bg-white/5 transition-all"
                    >
                        Keluar ke Tampilan Siswa
                    </Link>
                    <Link
                        href="/keluar"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-red-500/60 hover:text-red-400 hover:bg-red-500/5 transition-all font-semibold"
                    >
                        <LogOut size={15} /> Logout
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/5 px-4 lg:px-6 h-14 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <Menu size={18} />
                        </button>
                        <div className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">
                            Admin <span className="text-red-500">Panel</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 p-[1.5px]">
                            <div className="w-full h-full rounded-[7px] bg-[#0B0E14] flex items-center justify-center text-xs font-black text-white">
                                {auth.pengguna.nama[0]}
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-bold text-white leading-none">{auth.pengguna.nama}</p>
                            <p className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider">Administrator</p>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
