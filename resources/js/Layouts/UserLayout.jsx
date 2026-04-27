import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, BookOpen, Award,
    User as UserIcon, LogOut, Search, Zap, 
    MessageSquare, Target, Compass, Settings,
    Menu, X as CloseIcon, ShieldCheck
} from 'lucide-react';

export default function UserLayout({ auth, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    const menuItems = [
        { label: 'Overview',   icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Roadmaps',   icon: Compass,         href: '/roadmap' },
        { label: 'Catalog',    icon: BookOpen,        href: '/kursus' },
    ];

    const isActive = (href) => currentPath === href;

    return (
        <div className="min-h-screen bg-[#05070A] text-white font-outfit" style={{ display: 'flex' }}>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className={`
                    fixed top-0 left-0 bottom-0 z-50
                    lg:sticky lg:top-0 lg:h-screen lg:z-20
                    w-64 xl:w-72 bg-[#05070A] border-r border-white/5
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-7 py-8 shrink-0">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <span className="text-lg font-black tracking-tighter uppercase italic">Genius</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
                    >
                        <CloseIcon size={18} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto px-4 space-y-1 pb-4">
                    <p className="px-4 text-[9px] font-black uppercase tracking-[4px] text-gray-700 mb-3 mt-2">Menu</p>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                                isActive(item.href)
                                    ? 'bg-primary/10 text-white border border-primary/20'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <item.icon
                                size={18}
                                className={isActive(item.href) ? 'text-secondary' : 'group-hover:text-primary transition-colors'}
                            />
                            <span className="font-bold text-sm">{item.label}</span>
                            {isActive(item.href) && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}

                    <div className="pt-6 mt-4 border-t border-white/5">
                        <p className="px-4 text-[9px] font-black uppercase tracking-[4px] text-gray-700 mb-3">Account</p>
                        <Link
                            href="/profil"
                            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all group ${
                                isActive('/profil') ? 'bg-primary/10 text-white border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <UserIcon size={18} className={isActive('/profil') ? 'text-secondary' : 'group-hover:text-primary transition-colors'} />
                            <span className="font-bold text-sm">Profile</span>
                        </Link>
                        <Link
                            href="/pengaturan"
                            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all group ${
                                isActive('/pengaturan') ? 'bg-primary/10 text-white border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Settings size={18} className={isActive('/pengaturan') ? 'text-secondary' : 'group-hover:text-primary transition-colors'} />
                            <span className="font-bold text-sm">Settings</span>
                        </Link>
                        {auth.pengguna.peran?.toLowerCase() === 'admin' && (
                            <Link
                                href="/admin/overview"
                                className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                            >
                                <ShieldCheck size={18} />
                                <span className="font-bold text-sm">Admin Control</span>
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Logout */}
                <div className="px-4 py-5 border-t border-white/5 shrink-0">
                    <Link
                        href="/keluar"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all font-bold text-sm"
                    >
                        <LogOut size={18} /> Logout
                    </Link>
                </div>
            </aside>

            {/* ── Main Area ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="sticky top-0 z-10 bg-[#05070A]/80 backdrop-blur-xl border-b border-white/5 px-5 lg:px-10 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Hamburger (mobile) */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        {/* Search */}
                        <div className="hidden sm:flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-xl border border-white/5 focus-within:border-primary/50 transition-all md:w-80">
                            <Search size={16} className="text-gray-500 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm w-full font-light text-white placeholder-gray-600"
                            />
                        </div>
                    </div>
                    {/* Profile Avatar */}
                    <Link href="/profil" className="flex items-center gap-3 group cursor-pointer">
                        <div className="hidden md:block text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary leading-none mb-1">
                                {auth.pengguna.peran}
                            </p>
                            <p className="text-sm font-bold leading-none">{auth.pengguna.nama}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px] group-hover:scale-105 transition-transform shrink-0">
                            <div className="w-full h-full rounded-[9px] bg-[#05070A] flex items-center justify-center font-black text-sm">
                                {auth.pengguna.nama?.[0] ?? '?'}
                            </div>
                        </div>
                    </Link>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
