import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Play,
    CheckCircle2,
    ArrowLeft,
    Trophy,
    Clock,
    BookOpen,
    FileText,
    Code2,
    ChevronRight,
    Sparkles,
    ShieldCheck,
    Lock,
    Check
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function DetailKursus({ auth, kursus }) {
    const isCompleted = kursus.is_completed || false;
    const totalMateri = kursus.modul?.reduce((total, m) => total + m.materi.length, 0) || 0;
    
    const Content = (
        <div className="min-h-screen bg-[#05070A] text-white">
            <Head title={kursus.nama} />

            {/* ── Hero Header ── */}
            <div className="relative border-b border-white/5 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-10 pb-12 relative">
                    {/* Back link */}
                    <Link
                        href="/kursus"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 mb-10 transition-colors group text-[10px] font-black uppercase tracking-[3px]"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Katalog
                    </Link>

                    {/* Course identity */}
                    <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
                        {/* Visual / Icon Box */}
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[32px] bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0 shadow-2xl shadow-amber-500/20">
                            <Code2 size={40} className="text-black" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                    {kursus.level_kesulitan || 'Beginner'}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                    <ShieldCheck size={12} /> Terverifikasi
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 uppercase italic tracking-tight">
                                {kursus.nama}
                            </h1>

                            <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-3xl font-medium">
                                {kursus.deskripsi || 'Kuasai kurikulum industri yang dirancang untuk membawa Anda dari nol hingga menjadi tenaga ahli profesional.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* ── Curriculum (left) ── */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase italic tracking-wider">Kurikulum Belajar</h2>
                                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-1">Selesaikan semua modul untuk sertifikasi</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {kursus.modul?.map((modul, i) => (
                                <div key={modul.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                    {/* Module header */}
                                    <div className="flex items-center gap-4 mb-5 group">
                                        <div className="w-8 h-8 rounded-xl bg-white/5 text-gray-500 flex items-center justify-center text-[11px] font-black border border-white/5 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="text-sm font-black text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">{modul.judul}</h3>
                                    </div>

                                    {/* Materi list */}
                                    <div className="ml-4 pl-8 border-l border-white/5 space-y-3">
                                        {modul.materi?.map((materi) => (
                                            <Link
                                                key={materi.id}
                                                href={modul.terkunci ? '#' : `/kursus/${kursus.slug}/${materi.slug}`}
                                                className={`flex items-center justify-between px-6 py-4 rounded-[20px] border transition-all group/materi ${
                                                    modul.terkunci 
                                                        ? 'bg-black/20 border-white/5 cursor-not-allowed opacity-50' 
                                                        : 'bg-[#0D1117] border-white/5 hover:border-amber-500/30 hover:bg-amber-500/[0.02]'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                                        modul.terkunci 
                                                            ? 'bg-white/5 text-gray-700' 
                                                            : materi.selesai 
                                                                ? 'bg-emerald-500/10 text-emerald-500' 
                                                                : materi.tipe === 'latihan'
                                                                    ? 'bg-yellow-500/10 text-yellow-500 group-hover/materi:scale-110'
                                                                    : 'bg-amber-500/10 text-amber-500 group-hover/materi:scale-110'
                                                    }`}>
                                                        {modul.terkunci ? <Lock size={16} /> : 
                                                         materi.selesai ? <Check size={18} /> :
                                                         materi.tipe === 'latihan' ? <Code2 size={18} /> : <Play size={16} fill="currentColor" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className={`text-sm font-black transition-colors truncate uppercase tracking-tight ${
                                                            modul.terkunci ? 'text-gray-600' : 'text-gray-300 group-hover/materi:text-white'
                                                        }`}>
                                                            {materi.judul}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                                                                {materi.tipe === 'latihan' ? 'Coding Challenge' : 'Theory Lesson'}
                                                            </span>
                                                            {materi.selesai && (
                                                                <span className="text-[9px] text-emerald-500 font-black tracking-widest uppercase">Lulus</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-800 group-hover/materi:text-amber-500 transition-colors">
                                                    {modul.terkunci ? null : <ChevronRight size={18} />}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Info Sidebar ── */}
                    <div className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-24">
                        <div className="bg-[#0D1117] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
                            {/* CTA Area */}
                            <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                                {isCompleted ? (
                                    <div className="space-y-4">
                                        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                            <CheckCircle2 size={32} />
                                            <p className="text-xs font-black uppercase tracking-widest">Kursus Selesai</p>
                                        </div>
                                        <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                            Ulangi Materi
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href={kursus.modul?.[0]?.materi?.[0]
                                            ? `/kursus/${kursus.slug}/${kursus.modul[0].materi[0].slug}`
                                            : '#'}
                                        className="w-full flex justify-center items-center gap-3 py-5 rounded-2xl bg-amber-500 text-black text-[10px] font-black uppercase tracking-[3px] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98]"
                                    >
                                        <Play size={14} fill="currentColor" /> Mulai Belajar
                                    </Link>
                                )}
                            </div>

                            {/* Stats List */}
                            <div className="p-4 space-y-1">
                                {[
                                    { icon: <Trophy size={16} className="text-amber-500" />, label: 'Level Kesulitan', value: kursus.level_kesulitan || 'Beginner' },
                                    { icon: <Clock size={16} className="text-amber-500" />, label: 'Estimasi Durasi', value: `${kursus.modul?.length * 2 || 2} Jam` },
                                    { icon: <BookOpen size={16} className="text-amber-500" />, label: 'Total Materi', value: `${totalMateri} Pelajaran` },
                                    { icon: <Sparkles size={16} className="text-amber-500" />, label: 'Rewards', value: 'Sertifikat & XP' },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 text-gray-500 group-hover:text-amber-500 transition-colors">
                                                {icon}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</span>
                                        </div>
                                        <span className="text-white text-xs font-black uppercase tracking-tight">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );

    if (!auth.pengguna) {
        return (
            <div className="min-h-screen bg-[#08090D] text-white">
                <Head title={kursus.nama} />
                <NavbarPublik auth={auth} />
                {Content}
            </div>
        );
    }

    return (
        <UserLayout auth={auth}>
            {Content}
        </UserLayout>
    );
}
