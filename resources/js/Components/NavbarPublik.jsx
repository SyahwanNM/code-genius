import React from 'react';
import { Link } from '@inertiajs/react';

export default function NavbarPublik({ auth }) {
    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/images/logo_darkmode.svg"
                        alt="Logo"
                        className="w-10 h-10 object-contain"
                    />
                </Link>
                
                <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-400">
                    <Link href="/explorasi" className="hover:text-white transition-all">Kursus</Link>
                    <Link href="/pricing" className="hover:text-white transition-all">Harga</Link>
                    <Link href="/tentang-kami" className="hover:text-white transition-all">Tentang Kami</Link>
                </div>

                <div className="flex items-center gap-4">
                    {auth?.pengguna ? (
                        <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/masuk" className="hidden sm:block text-sm font-bold text-gray-400 hover:text-white px-4 py-2 transition-all">Masuk</Link>
                            <Link href="/daftar" className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Mulai Belajar</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
