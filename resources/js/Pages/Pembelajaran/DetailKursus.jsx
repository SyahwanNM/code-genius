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
    ChevronRight
} from 'lucide-react';

export default function DetailKursus({ kursus }) {
    const isCompleted = kursus.is_completed || false;
    const totalMateri = kursus.modul?.reduce((total, m) => total + m.materi.length, 0) || 0;
    const totalLatihan = kursus.modul?.reduce((total, m) => total + m.materi.filter(mt => mt.tipe === 'latihan').length, 0) || 0;

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white">
            <Head title={kursus.nama} />

            {/* ── Hero Header ── */}
            <div className="relative border-b border-white/5 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#2348b7]/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 lg:pt-12 lg:pb-14 relative">
                    {/* Back link */}
                    <Link
                        href="/kursus"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group text-sm font-medium"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                        Kembali ke Katalog
                    </Link>

                    {/* Course identity */}
                    <div className="flex flex-col sm:flex-row items-start gap-5 lg:gap-8">
                        {/* Icon */}
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#111827] flex items-center justify-center border border-white/8 shrink-0 shadow-xl">
                            <Code2 size={32} className="text-[#2348b7]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            {/* Level badge */}
                            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2348b7] bg-[#2348b7]/10 border border-[#2348b7]/20 rounded-full mb-3">
                                {kursus.level || 'Beginner'}
                            </span>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                                {kursus.nama}
                            </h1>

                            <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-2xl">
                                {kursus.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

                    {/* ── Curriculum (left, 2/3) ── */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-[#2348b7]/10 text-[#2348b7] flex items-center justify-center border border-[#2348b7]/20 shrink-0">
                                <BookOpen size={16} />
                            </div>
                            <h2 className="text-lg font-bold text-white">Kurikulum Belajar</h2>
                        </div>

                        <div className="space-y-6">
                            {kursus.modul?.map((modul, i) => (
                                <div key={modul.id}>
                                    {/* Module header */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-7 h-7 rounded-full bg-[#161B22] text-gray-400 flex items-center justify-center text-[11px] font-bold border border-white/8 shrink-0">
                                            {i + 1}
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-200">{modul.judul}</h3>
                                    </div>

                                    {/* Materi list */}
                                    <div className="ml-10 space-y-2">
                                        {modul.materi?.map((materi) => (
                                            <Link
                                                key={materi.id}
                                                href={`/kursus/${kursus.slug}/${materi.slug}`}
                                                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0D1117] border border-white/5 hover:border-white/10 hover:bg-[#111827] transition-all group"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                                        materi.tipe === 'latihan'
                                                            ? 'bg-[#fbbc05]/10 text-[#fbbc05] group-hover:bg-[#fbbc05]/20'
                                                            : 'bg-[#2348b7]/10 text-[#2348b7] group-hover:bg-[#2348b7]/20'
                                                    }`}>
                                                        {materi.tipe === 'latihan'
                                                            ? <Code2 size={15} />
                                                            : <Play size={14} fill="currentColor" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                                                            {materi.judul}
                                                        </p>
                                                        <p className="text-[11px] text-gray-600 mt-0.5">
                                                            {materi.tipe === 'latihan' ? 'Tantangan Coding' : 'Materi Teks'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={15} className="text-gray-600 group-hover:text-gray-300 shrink-0 transition-colors" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Info Sidebar (right, sticky) ── */}
                    <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 lg:sticky lg:top-6">
                        <div className="bg-[#0D1117] rounded-2xl border border-white/8 overflow-hidden">
                            {/* CTA */}
                            <div className="p-5 border-b border-white/5">
                                {isCompleted ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center gap-2 text-[#00b27b] font-bold text-sm py-2">
                                            <CheckCircle2 size={18} /> Kursus Selesai!
                                        </div>
                                        <button className="w-full flex justify-center items-center py-3 rounded-xl border border-[#00b27b]/30 bg-[#00b27b]/5 text-[#00b27b] text-sm font-bold hover:bg-[#00b27b]/10 transition-all">
                                            Ulangi Kursus
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href={kursus.modul?.[0]?.materi?.[0]
                                            ? `/kursus/${kursus.slug}/${kursus.modul[0].materi[0].slug}`
                                            : '#'}
                                        className="w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-[#2348b7] text-white text-sm font-bold hover:bg-[#2348b7]/90 transition-all shadow-[0_4px_20px_rgba(35,72,183,0.35)]"
                                    >
                                        <Play size={14} fill="currentColor" /> Mulai Belajar
                                    </Link>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="divide-y divide-white/5">
                                {[
                                    { icon: <Trophy size={15} className="text-[#fbbc05]" />, label: 'Level', value: kursus.level || 'Beginner' },
                                    { icon: <Clock size={15} className="text-[#2348b7]" />, label: 'Durasi', value: kursus.durasi || '16 jam' },
                                    { icon: <BookOpen size={15} className="text-[#00b27b]" />, label: 'Total Materi', value: `${totalMateri} materi` },
                                    { icon: <FileText size={15} className="text-gray-400" />, label: 'Modul', value: `${kursus.modul?.length || 0} modul` },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className="flex items-center justify-between px-5 py-3.5">
                                        <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                                            {icon}
                                            <span>{label}</span>
                                        </div>
                                        <span className="text-white text-sm font-semibold">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
