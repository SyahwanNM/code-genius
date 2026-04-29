import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    BookOpen,
    LogOut,
    Search,
    Zap,
    Clock,
    ChevronRight,
    Compass,
    Settings,
    Menu,
    X as CloseIcon,
    ShieldCheck,
} from 'lucide-react';

export default function UserLayout({ auth, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Semua Kursus', icon: BookOpen, href: '/kursus' },
        { label: 'Roadmap', icon: Compass, href: '/roadmap' },
    ];

    const isActive = (href) => currentPath === href;

    return (
        <div className="min-h-screen bg-[#05070A] text-white font-sans" style={{ display: 'flex' }}>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 bottom-0 z-50
                    lg:sticky lg:top-0 lg:h-screen lg:z-20
                    w-72 xl:w-80 bg-[#05070A] border-r border-white/5
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="relative px-6 pt-6 pb-2 shrink-0">
                    <div className="flex items-start justify-between gap-4">
                        <Link href="/" className="flex items-start gap-3 group min-w-0">
                            <img
                                src="/images/logo_darkmode.svg"
                                alt="Logo"
                                className="h-8 sm:h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
                            />
                        </Link>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
                        >
                            <CloseIcon size={18} />
                        </button>
                    </div>
                </div>

                <div className="px-4 sm:px-5 py-3 sm:py-4 shrink-0 border-b border-white/5">
                    <Link href="/profil" className="block">
                        <div className="flex items-center gap-3 mb-3.5 p-2 sm:p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#2f4cd1] flex items-center justify-center text-white font-black text-lg shrink-0">
                                {auth.pengguna.nama?.[0] ?? '?'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h2 className="text-sm sm:text-base font-bold text-white leading-tight">{auth.pengguna.nama}</h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {auth.pengguna.level_pemahaman || 'Beginner'} · {auth.pengguna.jalur_belajar || 'Frontend'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 sm:py-2">
                                <Zap size={13} className="text-[#f7d046] shrink-0" />
                                <span className="text-xs font-semibold text-white truncate">{new Intl.NumberFormat('id-ID').format(auth.pengguna.xp || 0)} XP</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 sm:py-2">
                                <Clock size={13} className="text-[#ff8c1a] shrink-0" />
                                <span className="text-xs font-semibold text-white truncate">{auth.pengguna.streak_harian || 0} Hari</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4">
                    <div className="mb-4 sm:mb-5">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 group mb-1.5 sm:mb-2 ${isActive(item.href)
                                        ? 'bg-[#2348b7] text-white shadow-[0_10px_24px_rgba(35,72,183,0.28)]'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon
                                    size={18}
                                    className={`${isActive(item.href) ? 'text-white' : 'group-hover:text-white transition-colors'} shrink-0`}
                                />
                                <span className="font-semibold text-sm tracking-[-0.01em] truncate flex-1 text-inherit">{item.label}</span>
                                {isActive(item.href) && <ChevronRight size={16} className="text-white/90 shrink-0" />}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-white/10">
                        <p className="px-3 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-gray-600 mb-2.5 sm:mb-3 mt-3 sm:mt-4">Lainnya</p>

                        <Link
                            href="/pengaturan"
                            className={`flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all group mb-1 text-xs sm:text-sm ${isActive('/pengaturan') ? 'bg-[#2348b7] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Settings size={15} className={`${isActive('/pengaturan') ? 'text-white' : 'group-hover:text-white transition-colors'} shrink-0`} />
                            <span className="font-medium tracking-[-0.01em] truncate">Pengaturan</span>
                        </Link>

                        {auth.pengguna.peran?.toLowerCase() === 'admin' && (
                            <Link
                                href="/admin/overview"
                                className="flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-red-400/70 hover:text-red-300 hover:bg-red-500/5 transition-all mb-1 text-xs sm:text-sm"
                            >
                                <ShieldCheck size={15} className="shrink-0" />
                                <span className="font-medium tracking-[-0.01em] truncate">Admin Control</span>
                            </Link>
                        )}
                    </div>
                </nav>

                <div className="px-3 sm:px-4 py-3 border-t border-white/5 shrink-0">
                    <Link
                        href="/keluar"
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-all font-medium text-xs sm:text-sm"
                    >
                        <LogOut size={15} className="shrink-0" /> <span className="hidden sm:inline">Keluar</span>
                    </Link>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="sticky top-0 z-10 bg-[#05070A]/80 backdrop-blur-xl border-b border-white/5 px-3 sm:px-5 lg:px-10 py-3 sm:py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0"
                        >
                            <Menu size={18} className="sm:w-5 sm:h-5" />
                        </button>

                        <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-white/5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl border border-white/5 focus-within:border-primary/50 transition-all flex-1">
                            <Search size={14} className="text-gray-500 shrink-0 sm:w-4 sm:h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-xs sm:text-sm w-full font-light text-white placeholder-gray-600"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
