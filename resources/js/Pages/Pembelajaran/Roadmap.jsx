import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Lock, CheckCircle2, Globe, Database, Compass, Monitor, Server, BookOpen, Layers } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

const LEVEL_ORDER   = ['beginner', 'intermediate', 'advanced'];
const LEVEL_CONFIG  = {
    beginner:     { label: 'Beginner',     emoji: '🌱', color: 'from-emerald-500 to-teal-400',    text: 'text-emerald-400',  bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    intermediate: { label: 'Intermediate', emoji: '⚡', color: 'from-yellow-500 to-orange-400',   text: 'text-yellow-400',   bg: 'bg-yellow-500/10',  border: 'border-yellow-500/30' },
    advanced:     { label: 'Advanced',     emoji: '🔥', color: 'from-red-500 to-rose-400',        text: 'text-red-400',      bg: 'bg-red-500/10',     border: 'border-red-500/30' },
};
const JALUR_CONFIG  = {
    frontend: { label: 'Frontend Developer', icon: Monitor, color: 'from-blue-500 to-cyan-400',    desc: 'Kuasai pembuatan antarmuka web yang modern dan responsif.' },
    backend:  { label: 'Backend Developer',  icon: Server,  color: 'from-violet-500 to-indigo-400', desc: 'Pelajari arsitektur server, database, dan keamanan API.' },
};

export default function Roadmap({ auth, kursus_per_level }) {
    const user      = auth.pengguna;
    const jalurCfg  = JALUR_CONFIG[user.jalur_belajar] || JALUR_CONFIG.frontend;
    const userLevel = user.level_pemahaman || 'beginner';
    const JalurIcon = jalurCfg.icon;

    const isLevelAccessible = (level) => {
        const userIdx   = LEVEL_ORDER.indexOf(userLevel);
        const levelIdx  = LEVEL_ORDER.indexOf(level);
        return levelIdx <= userIdx;
    };

    const isUserLevel = (level) => level === userLevel;

    return (
        <UserLayout auth={auth}>
            <Head title="Learning Roadmap — Code Genius" />
            
            <div className="px-6 lg:px-12 py-12 space-y-12 relative z-10">
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-secondary mb-4">
                        <Compass size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[4px]">Learning Roadmap</span>
                    </div>
                    <h1 className="text-4xl font-black mb-4">
                        Roadmap <span className={`bg-gradient-to-r ${jalurCfg.color} bg-clip-text text-transparent italic`}>{jalurCfg.label}</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl font-light leading-relaxed">
                        Jalur belajarmu yang dipersonalisasi. Mulai dari level <span className={`font-bold ${LEVEL_CONFIG[userLevel]?.text}`}>{LEVEL_CONFIG[userLevel]?.label}</span> sesuai hasil tes penjajakan.
                    </p>
                </header>

                {/* Jalur Banner */}
                <div className={`relative p-8 rounded-3xl bg-gradient-to-r ${jalurCfg.color} overflow-hidden shadow-2xl`}>
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <JalurIcon size={180} />
                    </div>
                    <div className="relative z-10 text-white">
                        <div className="flex items-center gap-3 mb-3">
                            <JalurIcon size={24} />
                            <span className="font-black text-lg">{jalurCfg.label}</span>
                        </div>
                        <p className="text-white/70 text-sm max-w-md">{jalurCfg.desc}</p>
                        <div className="flex items-center gap-3 mt-5">
                            <span className="text-2xl">{LEVEL_CONFIG[userLevel]?.emoji}</span>
                            <div className="px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-black uppercase tracking-widest">
                                Level kamu: {LEVEL_CONFIG[userLevel]?.label}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Level Sections */}
                <div className="space-y-16">
                    {LEVEL_ORDER.map((level) => {
                        const cfg       = LEVEL_CONFIG[level];
                        const accessible = isLevelAccessible(level);
                        const isCurrent  = isUserLevel(level);
                        const kursusLevel = kursus_per_level?.[level] || [];

                        return (
                            <div key={level} className={`transition-all duration-300 ${!accessible ? 'opacity-40' : ''}`}>
                                {/* Level Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${cfg.color} shadow-lg ${isCurrent ? 'scale-110 ring-2 ring-white/20' : ''}`}>
                                        {cfg.emoji}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className={`text-2xl font-black bg-gradient-to-r ${cfg.color} bg-clip-text text-transparent`}>
                                                {cfg.label}
                                            </h2>
                                            {isCurrent && (
                                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border} animate-pulse`}>
                                                    Level Kamu
                                                </span>
                                            )}
                                            {!accessible && (
                                                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10">
                                                    🔒 Terkunci
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-sm mt-0.5">{kursusLevel.length} kursus tersedia</p>
                                    </div>
                                </div>

                                {/* Kursus Grid */}
                                {kursusLevel.length === 0 ? (
                                    <div className="p-10 rounded-3xl border border-dashed border-white/10 text-center">
                                        <BookOpen size={32} className="text-gray-700 mx-auto mb-3" />
                                        <p className="text-gray-600 text-sm">Admin sedang menyiapkan materi untuk level ini.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {kursusLevel.map((kursus, idx) => (
                                            accessible ? (
                                                <Link
                                                    key={kursus.id}
                                                    href={`/kursus/${kursus.slug}`}
                                                    className={`group p-6 rounded-3xl border-2 ${cfg.border} ${cfg.bg} hover:scale-[1.02] transition-all duration-300 flex flex-col gap-4`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="text-3xl w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            {kursus.ikon || '📚'}
                                                        </div>
                                                        <ChevronRight size={16} className={`${cfg.text} mt-1 group-hover:translate-x-1 transition-transform`} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-white mb-1">{kursus.nama}</h3>
                                                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{kursus.deskripsi}</p>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div
                                                    key={kursus.id}
                                                    className="p-6 rounded-3xl border-2 border-white/5 bg-white/[0.02] flex flex-col gap-4 cursor-not-allowed"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="text-3xl w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center opacity-50">
                                                            {kursus.ikon || '📚'}
                                                        </div>
                                                        <Lock size={16} className="text-gray-700 mt-1" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-gray-600 mb-1">{kursus.nama}</h3>
                                                        <p className="text-gray-700 text-xs leading-relaxed line-clamp-2">{kursus.deskripsi}</p>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </UserLayout>
    );
}
