import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Book, Clock, BookOpen, Server, Database, Code2 } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import NavbarPublik from '@/Components/NavbarPublik';

export default function DaftarKursus({ auth, semua_kursus }) {
    const isPublic = !auth.pengguna;

    const getIconComponent = (iconName) => {
        const icons = {
            'Book': <Book size={32} />,
            'BookOpen': <BookOpen size={32} />,
            'Server': <Server size={32} />,
            'Database': <Database size={32} />,
            'Code2': <Code2 size={32} />,
        };
        return icons[iconName] || <Code2 size={32} />;
    };

    const getIconBgColor = (nama) => {
        const colors = [
            'bg-red-500',
            'bg-green-500',
            'bg-blue-500',
            'bg-yellow-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-cyan-500',
        ];
        return colors[nama.charCodeAt(0) % colors.length];
    };

    const getLevelColor = (level) => {
        if (!level) return 'bg-slate-800 text-slate-300';
        const normalized = level.toLowerCase();
        if (normalized === 'beginner') return 'bg-emerald-900 text-emerald-400';
        if (normalized === 'intermediate') return 'bg-sky-900 text-sky-400';
        if (normalized === 'advanced') return 'bg-zinc-800 text-zinc-300';
        return 'bg-slate-800 text-slate-300';
    };

    const Content = (
        <div className={`w-full ${isPublic ? 'px-6 sm:px-8 lg:px-10' : 'px-4 sm:px-6 lg:px-10'} ${isPublic ? 'py-16 sm:py-24 lg:py-32' : 'py-8 sm:py-10 lg:py-12'}`}>
            <header className="mb-5">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <BookOpen size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-[3px]">Learning Roadmap</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2">Pilih Jalur <span className="text-accent italic">Keahlianmu</span></h1>
                <p className="text-gray-500 max-w-2xl font-light text-sm sm:text-base">
                    Temukan kursus yang tepat untuk kamu
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                {semua_kursus.map((k) => (
                    <div
                        key={k.id}
                        className="group glass-card rounded-2xl p-5 sm:p-6 hover:border-secondary/30 transition-all flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-5">
                            {/* Icon */}
                            <div className={`${getIconBgColor(k.nama)} w-10 h-10 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-lg`}>
                                {getIconComponent(k.ikon)}
                            </div>

                            {/* Title and Badges */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                                    {k.nama}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {k.level_kesulitan && (
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold capitalize ${getLevelColor(k.level_kesulitan)}`}>
                                            {k.level_kesulitan}
                                        </span>
                                    )}
                                    {k.jalur && (
                                        <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold capitalize bg-indigo-900 text-indigo-400">
                                            {k.jalur}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 font-light line-clamp-2">
                            {k.deskripsi}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-gray-500 font-semibold mb-auto">
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-gray-400" />
                                <span>{k.modul_count ? k.modul_count * 2 : 0} jam</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Book size={16} className="text-gray-400" />
                                <span>{k.modul_count || 0} modul</span>
                            </div>
                        </div>

                        {/* Action Button - pushes to bottom */}
                        <Link href={`/kursus/${k.slug}`} className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl bg-primary hover:bg-primary/70 text-white text-sm sm:text-base font-semibold transition-all shadow-lg shadow-primary/20 mt-5 sm:mt-6 text-center inline-flex items-center justify-center">
                            Mulai Kursus
                        </Link>
                    </div>
                ))}
            </div>

            {semua_kursus.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                    <p className="text-gray-500 text-sm sm:text-base">Tidak ada kursus tersedia</p>
                </div>
            )}
        </div>
    );

    if (isPublic) {
        return (
            <div className="min-h-screen bg-[#0B0E14] text-white">
                <Head title="Katalog Kursus - Code Genius" />
                <NavbarPublik auth={auth} />
                {Content}
            </div>
        );
    }

    return (
        <UserLayout auth={auth}>
            <Head title="Katalog Kursus - Code Genius" />
            {Content}
        </UserLayout>
    );
}
