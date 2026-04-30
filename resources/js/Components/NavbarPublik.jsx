import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function NavbarPublik({ auth }) {
    const { url } = usePage();

    const navLinks = [
        { label: 'Kursus', href: '/#jalur-belajar', native: true },
        { label: 'Harga', href: '/pricing', native: false },
        { label: 'Tentang Kami', href: '/tentang-kami', native: false },
    ];

    const isActive = (href) => {
        if (href.startsWith('/#')) return false;
        return url === href || url.startsWith(href + '/');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between relative">

                {/* Logo */}
                <Link href="/" className="flex items-start gap-3 group flex-shrink-0">
                    <img
                        src="/images/logo_darkmode.svg"
                        alt="Logo"
                        className="h-8 sm:h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
                    />
                </Link>

                {/* Nav links — absolutely centered */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) =>
                        link.native ? (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`transition-colors ${isActive(link.href)
                                        ? 'text-yellow-400'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </div>

                {/* Auth buttons */}
                <div className="flex items-center gap-3">
                    {auth?.pengguna ? (
                        <Link
                            href="/dashboard"
                            className="px-5 py-2.5 rounded-lg bg-yellow-400 text-black text-sm font-black hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/masuk"
                                className="hidden sm:block text-sm font-semibold text-gray-400 hover:text-white px-3 py-2 transition-colors"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/daftar"
                                className="px-5 py-2.5 rounded-lg bg-yellow-400 text-black text-sm font-black hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
                            >
                                Daftar Gratis
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
