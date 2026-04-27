import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Trophy, Target, Zap, ArrowRight, CheckCircle2, XCircle, ChevronDown, ChevronUp, Rocket } from 'lucide-react';

const LEVEL_CONFIG = {
    beginner: {
        label: 'Beginner',
        emoji: '🌱',
        color: 'from-emerald-500 to-teal-400',
        glow: 'shadow-emerald-500/40',
        border: 'border-emerald-500/40',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        desc: 'Kamu baru memulai perjalanan coding-mu. Tidak apa-apa! Semua developer hebat pernah ada di titik ini. Kami akan memandu dari dasar.',
        next: 'Mulai dari fundamental, bangun fondasi yang kuat untuk perjalanan panjangmu.',
    },
    intermediate: {
        label: 'Intermediate',
        emoji: '⚡',
        color: 'from-yellow-500 to-orange-400',
        glow: 'shadow-yellow-500/40',
        border: 'border-yellow-500/40',
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        desc: 'Bagus! Kamu sudah punya pemahaman dasar yang cukup solid. Saatnya naik level dengan konsep yang lebih dalam dan praktik nyata.',
        next: 'Fokus pada konsep lanjutan, pola desain, dan proyek yang lebih kompleks.',
    },
    advanced: {
        label: 'Advanced',
        emoji: '🔥',
        color: 'from-red-500 to-rose-400',
        glow: 'shadow-red-500/40',
        border: 'border-red-500/40',
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        desc: 'Luar biasa! Kemampuanmu sudah di level yang tinggi. Kami akan langsung ke topik-topik advanced, arsitektur, dan tantangan industri.',
        next: 'Kuasai arsitektur skala besar, optimasi performa, dan best practice industri.',
    },
};

const JALUR_LABEL = {
    frontend: 'Frontend Developer',
    backend:  'Backend Developer',
};

export default function HasilTes({ hasil, pengguna }) {
    const [revealed, setRevealed]       = useState(false);
    const [showDetail, setShowDetail]   = useState(false);
    const level  = hasil.level_didapat;
    const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.beginner;

    useEffect(() => {
        // Animasi reveal setelah 600ms
        const t = setTimeout(() => setRevealed(true), 600);
        return () => clearTimeout(t);
    }, []);

    const benar  = hasil.detail?.filter(d => d.benar).length ?? 0;
    const salah  = (hasil.detail?.length ?? 0) - benar;

    return (
        <div className="min-h-screen bg-[#080B12] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <Head title="Hasil Tes Penjajakan — Code Genius" />

            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-br ${config.color} opacity-5 blur-[120px] rounded-full transition-all duration-1000 ${revealed ? 'scale-100' : 'scale-50'}`} />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                {/* Celebration Icon */}
                <div className={`text-center mb-8 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className={`inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br ${config.color} items-center justify-center text-4xl shadow-2xl ${config.glow} mb-4 ${revealed ? 'scale-100 rotate-0' : 'scale-50 rotate-12'} transition-all duration-700`}>
                        {config.emoji}
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Hei, {pengguna.nama}! Hasil tesmu sudah keluar 🎉</p>
                </div>

                {/* Level Reveal Card */}
                <div className={`relative bg-white/[0.03] border-2 ${config.border} rounded-3xl p-8 mb-6 shadow-2xl ${config.glow} transition-all duration-700 ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-2/3 bg-gradient-to-r ${config.color} rounded-full`} />

                    <div className="text-center mb-8">
                        <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-500 mb-3">Level Pemahaman Kamu</p>
                        <h1 className={`text-5xl md:text-7xl font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent mb-2`}>
                            {config.label}
                        </h1>
                        <p className="text-gray-400 text-sm mt-4 max-w-sm mx-auto leading-relaxed">{config.desc}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className={`p-4 rounded-2xl ${config.bg} text-center border ${config.border}`}>
                            <p className="text-2xl font-black text-white">{hasil.persentase}%</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Skor</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-green-500/10 text-center border border-green-500/20">
                            <p className="text-2xl font-black text-green-400">{benar}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Benar</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-500/10 text-center border border-red-500/20">
                            <p className="text-2xl font-black text-red-400">{salah}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Salah</p>
                        </div>
                    </div>

                    {/* Jalur & Next Steps */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Rocket size={16} className={config.text} />
                            <span className="text-xs font-black uppercase tracking-[2px] text-gray-400">Jalur: {JALUR_LABEL[hasil.jalur] || hasil.jalur}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{config.next}</p>
                    </div>
                </div>

                {/* Detail Jawaban (Collapsible) */}
                {hasil.detail && hasil.detail.length > 0 && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowDetail(!showDetail)}
                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-gray-400 text-sm font-bold hover:bg-white/[0.05] transition-all"
                        >
                            <span>Lihat Detail Jawaban</span>
                            {showDetail ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {showDetail && (
                            <div className="mt-3 space-y-3">
                                {hasil.detail.map((item, i) => (
                                    <div key={i} className={`p-4 rounded-2xl border text-sm ${item.benar ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                        <div className="flex items-start gap-3">
                                            {item.benar
                                                ? <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                                                : <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                                            }
                                            <div>
                                                <p className="text-gray-300 font-medium leading-snug mb-1">{item.pertanyaan}</p>
                                                {!item.benar && item.penjelasan && (
                                                    <p className="text-gray-500 text-xs leading-relaxed">{item.penjelasan}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* CTA */}
                <div className={`text-center transition-all duration-700 delay-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Link
                        id="btn-mulai-belajar"
                        href="/dashboard"
                        className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r ${config.color} shadow-2xl ${config.glow} hover:scale-105 transition-all duration-300`}
                    >
                        Mulai Belajar Sekarang
                        <ArrowRight size={18} />
                    </Link>
                    <p className="text-gray-600 text-xs mt-4">
                        Kamu bisa melihat roadmap dan kursus yang sesuai di dashboard
                    </p>
                </div>
            </div>
        </div>
    );
}
