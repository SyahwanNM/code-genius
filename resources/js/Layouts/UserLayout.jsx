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
    Bell,
    CheckCircle,
    Info,
    AlertTriangle,
} from 'lucide-react';

export default function UserLayout({ auth, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const { url, props } = usePage();
    const { notifikasi, notif_unread_count } = props.auth;
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
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-amber-600 flex items-center justify-center text-black font-black text-lg shrink-0">
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
                                        ? 'bg-amber-500 text-black shadow-[0_10px_24px_rgba(245,158,11,0.2)]'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon
                                    size={18}
                                    className={`${isActive(item.href) ? 'text-black' : 'group-hover:text-white transition-colors'} shrink-0`}
                                />
                                <span className="font-black text-sm tracking-tight uppercase truncate flex-1 text-inherit">{item.label}</span>
                                {isActive(item.href) && <ChevronRight size={16} className="text-black/80 shrink-0" />}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-white/10">
                        <p className="px-3 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-gray-600 mb-2.5 sm:mb-3 mt-3 sm:mt-4">Lainnya</p>

                        <Link
                            href="/pengaturan"
                            className={`flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all group mb-1 text-xs sm:text-sm ${isActive('/pengaturan') ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Settings size={15} className={`${isActive('/pengaturan') ? 'text-black' : 'group-hover:text-white transition-colors'} shrink-0`} />
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
                <header className="sticky top-0 z-50 bg-[#05070A]/80 backdrop-blur-xl border-b border-white/5 px-3 sm:px-5 lg:px-10 py-3 sm:py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0"
                        >
                            <Menu size={18} className="sm:w-5 sm:h-5" />
                        </button>

                        {/* Search Bar - Hidden for cleaner UI (Saran Antigravity) */}
                        <div className="hidden sm:flex items-center gap-3 text-gray-500 hover:text-white transition-colors cursor-pointer group">
                             {/* Anda bisa menambahkan tombol search kecil di sini jika nanti dibutuhkan */}
                        </div>

                        {/* Notification Center */}
                        <div className="relative ml-auto">
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                className={`p-2.5 rounded-xl transition-all relative ${notifOpen ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                            >
                                <Bell size={18} />
                                {notif_unread_count > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#05070A]">
                                        {notif_unread_count}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Notifikasi */}
                            {notifOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                                    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0D1117] border border-white/10 rounded-[24px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-white italic">Pusat Notifikasi</h3>
                                            <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Terbaru</span>
                                        </div>

                                        <div className="max-h-[400px] overflow-y-auto divide-y divide-white/5">
                                            {notifikasi?.length > 0 ? (
                                                notifikasi.map((notif) => (
                                                    <div key={notif.id} className={`p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group ${!notif.dibaca ? 'bg-amber-500/[0.02]' : ''}`}>
                                                        <div className="flex gap-4">
                                                            <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                                                                notif.tipe === 'sukses' ? 'bg-emerald-500/10 text-emerald-500' : 
                                                                notif.tipe === 'peringatan' ? 'bg-orange-500/10 text-orange-500' : 
                                                                'bg-blue-500/10 text-blue-500'
                                                            }`}>
                                                                {notif.tipe === 'sukses' ? <CheckCircle size={16} /> : 
                                                                 notif.tipe === 'peringatan' ? <AlertTriangle size={16} /> : 
                                                                 <Info size={16} />}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors">{notif.judul}</p>
                                                                <p className="text-[10px] text-gray-500 mt-1 font-medium leading-relaxed line-clamp-2">{notif.pesan}</p>
                                                                <p className="text-[9px] text-gray-600 mt-2 font-bold uppercase tracking-widest italic">
                                                                    {new Date(notif.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-10 text-center">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-700">
                                                        <Bell size={20} />
                                                    </div>
                                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Tidak ada notifikasi baru</p>
                                                </div>
                                            )}
                                        </div>

                                        <button className="w-full py-4 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-black uppercase tracking-[3px] text-gray-500 transition-all border-t border-white/5">
                                            Lihat Semua Riwayat
                                        </button>
                                    </div>
                                </>
                            )}
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
