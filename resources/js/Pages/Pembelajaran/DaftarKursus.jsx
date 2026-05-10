import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Book, Clock, BookOpen, Server, Database, Code2, ChevronRight, Layers, Sparkles, Hammer, FlaskConical, Lightbulb } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import NavbarPublik from '@/Components/NavbarPublik';

export default function DaftarKursus({ auth, semua_kursus }) {
    const isPublic = !auth.pengguna;

    const getIconComponent = (iconName) => {
        const icons = {
            'Book': <Book size={24} />,
            'BookOpen': <BookOpen size={24} />,
            'Server': <Server size={24} />,
            'Database': <Database size={24} />,
            'Code2': <Code2 size={24} />,
        };
        return icons[iconName] || <Code2 size={24} />;
    };

    const getLevelColor = (level) => {
        if (!level) return 'text-accent bg-accent/10 border-accent/20';
        const normalized = level.toLowerCase();
        if (normalized === 'beginner') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        if (normalized === 'intermediate') return 'text-accent bg-accent/10 border-accent/20';
        if (normalized === 'advanced') return 'text-red-500 bg-red-500/10 border-red-500/20';
        return 'text-accent bg-accent/10 border-accent/20';
    };

    const Content = (
        <div className={`w-full ${isPublic ? 'max-w-7xl mx-auto px-6 lg:px-8 py-24' : 'px-6 lg:px-10 py-10'}`}>
            <header className="mb-12">
                <div className="flex items-center gap-3 text-accent mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="p-2 rounded-xl bg-accent/10 border border-accent/20">
                        <BookOpen size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[4px]">Learning Path</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-4 text-white italic uppercase tracking-tight">Pilih Jalur <span className="text-accent">Keahlianmu</span></h1>
                <p className="text-gray-500 max-w-2xl font-bold uppercase text-[10px] tracking-[2px] leading-relaxed">
                    Kuasai teknologi industri melalui kurikulum berbasis proyek yang dirancang oleh pakar.
                </p>
            </header>

            {/* ── Lab Kreatif CTA — hanya tampil untuk user login ── */}
            {!isPublic && (
                <div className="mb-10">
                    <Link
                        href="/lab"
                        className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-7 rounded-[28px] bg-[#0D1117] border border-white/5 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 overflow-hidden"
                    >
                        {/* Glow orb */}
                        <div className="absolute -right-10 -top-10 w-52 h-52 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all pointer-events-none" />

                        {/* Icon */}
                        <div className="shrink-0 w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all duration-500 shadow-xl shadow-accent/10">
                            <Hammer size={28} />
                        </div>

                        {/* Text */}
                        <div className="flex-1 relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-widest">
                                    New Feature
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <Lightbulb size={9} /> AI-Guided
                                </span>
                            </div>
                            <h2 className="text-xl font-black text-white uppercase italic tracking-tight group-hover:text-accent transition-colors mb-1">
                                Lab Kreatif
                            </h2>
                            <p className="text-gray-500 text-xs leading-relaxed max-w-lg">
                                Asah skill dengan membangun proyek nyata. Pilih template, kerjakan step-by-step, dan minta hint dari AI jika menemui kendala — tanpa spoiler jawaban!
                            </p>
                        </div>

                        {/* CTA Arrow */}
                        <div className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-accent text-black text-[10px] font-black uppercase tracking-widest group-hover:bg-amber-400 transition-all shadow-xl shadow-accent/20 active:scale-95 self-start sm:self-center">
                            <FlaskConical size={14} />
                            <span>Coba Sekarang</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {semua_kursus.map((k, i) => (
                    <div
                        key={k.id}
                        className="group relative bg-[#0D1117] border border-white/5 rounded-[32px] overflow-hidden hover:border-accent/30 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-accent/5"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {/* Course Image Placeholder / Visual Area */}
                        <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                             <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="text-white/10 group-hover:text-accent/40 transition-all duration-500 transform group-hover:scale-110">
                                     {getIconComponent(k.ikon)}
                                 </div>
                             </div>
                             <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${getLevelColor(k.level_kesulitan)}`}>
                                    {k.level_kesulitan || 'Beginner'}
                                </span>
                             </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest mb-3">
                                <Layers size={12} /> {k.jalur || 'Fullstack'} Developer
                            </div>
                            <h3 className="text-xl font-black text-white mb-3 group-hover:text-accent transition-colors uppercase tracking-tight leading-tight">
                                {k.nama}
                            </h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-8 font-medium line-clamp-3">
                                {k.deskripsi || 'Pelajari konsep fundamental dan bangun portofolio kelas dunia dengan teknologi terkini.'}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <Book size={14} className="text-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{k.modul_count || 0} Modul</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} className="text-gray-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{k.modul_count ? k.modul_count * 2 : 1} Jam</span>
                                    </div>
                                </div>
                                <div className="text-accent/50 group-hover:text-accent transition-colors">
                                    <Sparkles size={16} />
                                </div>
                            </div>
                        </div>

                        <Link 
                            href={`/kursus/${k.slug}`} 
                            className="w-full py-5 bg-white/[0.02] border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[3px] text-gray-500 group-hover:bg-accent group-hover:text-black transition-all flex items-center justify-center gap-2"
                        >
                            Pelajari Sekarang <ChevronRight size={14} />
                        </Link>
                    </div>
                ))}
            </div>

            {semua_kursus.length === 0 && (
                <div className="text-center py-32 border border-dashed border-white/10 rounded-[32px] bg-white/[0.01]">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-700">
                        <BookOpen size={32} />
                    </div>
                    <p className="text-xs font-black text-gray-600 uppercase tracking-[4px]">Katalog kursus sedang diperbarui</p>
                </div>
            )}
        </div>
    );

    if (isPublic) {
        return (
            <div className="min-h-screen bg-[#08090D] text-white selection:bg-accent/20">
                <Head title="Katalog Kursus - Code Genius" />
                <NavbarPublik auth={auth} />
                {Content}
            </div>
        );
    }

    return (
        <UserLayout auth={auth}>
            <Head title="Katalog Kursus - Code Genius" />
            <div className="bg-[#05070A] min-h-full">
                {Content}
            </div>
        </UserLayout>
    );
}
