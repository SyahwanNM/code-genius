import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Compass, Monitor, Server, Code2, Leaf, Zap, Lock, CheckCircle2, Play, ChevronRight } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced'];

const LEVEL_CONFIG = {
    beginner: {
        label: 'Beginner',
        icon: Leaf,
        iconColor: 'text-emerald-400',
        labelColor: 'text-emerald-400',
        bg: 'bg-emerald-950',
        border: 'border-emerald-500/30',
        desc: 'Fondasi yang kuat untuk menjadi developer'
    },
    intermediate: {
        label: 'Intermediate',
        icon: Zap,
        iconColor: 'text-yellow-400',
        labelColor: 'text-blue-500',
        bg: 'bg-blue-950',
        border: 'border-blue-500/30',
        desc: 'Framework modern dan tools yang digunakan industri'
    },
    advanced: {
        label: 'Advanced',
        icon: Lock,
        iconColor: 'text-yellow-500',
        labelColor: 'text-gray-400',
        bg: 'bg-gray-900',
        border: 'border-gray-700/50',
        desc: 'Skill premium untuk senior developer'
    },
};

const JALUR_CONFIG = {
    frontend: { label: 'Frontend Developer', icon: Monitor, color: 'text-blue-400', desc: 'Kuasai pembuatan antarmuka web yang modern dan responsif.' },
    backend: { label: 'Backend Developer', icon: Server, color: 'text-violet-400', desc: 'Pelajari arsitektur server, database, dan keamanan API.' },
};

export default function Roadmap({ auth, kursus_per_level }) {
    const user = auth.pengguna;
    const jalurCfg = JALUR_CONFIG[user.jalur_belajar] || JALUR_CONFIG.frontend;
    const userLevel = user.level_pemahaman || 'beginner';

    const isLevelAccessible = (level) => {
        const userIdx = LEVEL_ORDER.indexOf(userLevel);
        const levelIdx = LEVEL_ORDER.indexOf(level);
        return levelIdx <= userIdx;
    };

    const isLevelCompleted = (level) => {
        const userIdx = LEVEL_ORDER.indexOf(userLevel);
        const levelIdx = LEVEL_ORDER.indexOf(level);
        return levelIdx < userIdx;
    };

    const isUserLevel = (level) => level === userLevel;

    return (
        <UserLayout auth={auth}>
            <Head title="Learning Roadmap — Code Genius" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                        <Compass size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-[2px]">Learning Roadmap</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white">
                        Roadmap <span className={`italic ${jalurCfg.color}`}>{jalurCfg.label}</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        Jalur belajarmu yang dipersonalisasi. Mulai dari level <span className={`font-semibold ${LEVEL_CONFIG[userLevel]?.labelColor}`}>{LEVEL_CONFIG[userLevel]?.label}</span> sesuai hasil tes penjajakan.
                    </p>
                </header>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[31px] top-6 bottom-10 w-px bg-gray-800 hidden md:block"></div>

                    <div className="space-y-12">
                        {LEVEL_ORDER.map((level) => {
                            const cfg = LEVEL_CONFIG[level];
                            const accessible = isLevelAccessible(level);
                            const completed = isLevelCompleted(level);
                            const isCurrent = isUserLevel(level);
                            const kursusLevel = kursus_per_level?.[level] || [];
                            const Icon = cfg.icon;

                            return (
                                <div key={level} className="relative flex flex-col md:flex-row gap-6 md:gap-8">
                                    {/* Level Icon */}
                                    <div className="relative z-10 flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${cfg.border} ${cfg.bg}`}>
                                            <Icon size={24} className={cfg.iconColor} />
                                        </div>
                                    </div>

                                    {/* Level Content */}
                                    <div className="flex-1 pt-2">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className={`text-xl font-bold ${cfg.labelColor}`}>
                                                {cfg.label}
                                            </h2>
                                            {completed && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-500 text-[10px] font-medium border border-emerald-900/50">
                                                    <CheckCircle2 size={10} /> Selesai
                                                </span>
                                            )}
                                            {!accessible && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800/50 text-gray-500 text-[10px] font-medium border border-gray-700/50">
                                                    <Lock size={10} /> Terkunci
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-sm mb-6">{cfg.desc}</p>

                                        {/* Courses Grid */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {kursusLevel.map((kursus) => (
                                                accessible ? (
                                                    <Link
                                                        href={`/kursus/${kursus.slug}`}
                                                        key={kursus.id}
                                                        className="group flex flex-col p-5 rounded-2xl border border-gray-800 bg-[#0f1523] hover:bg-[#151c2e] hover:border-gray-700 transition-all"
                                                    >
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${completed ? 'text-emerald-400 bg-emerald-950/30' : 'text-blue-400 bg-blue-950/30'}`}>
                                                                <Code2 size={20} />
                                                            </div>
                                                            {completed ? (
                                                                <CheckCircle2 size={18} className="text-emerald-500" />
                                                            ) : (
                                                                <Play size={18} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-sm font-bold text-gray-200 mb-2 group-hover:text-white transition-colors">
                                                                {kursus.nama}
                                                            </h3>
                                                            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                                                                {kursus.deskripsi}
                                                            </p>
                                                        </div>
                                                        <div className={`mt-auto flex items-center text-xs font-medium ${completed ? 'text-emerald-500 group-hover:text-emerald-400' : 'text-blue-500 group-hover:text-blue-400'}`}>
                                                            {completed ? 'Lihat Kembali' : 'Mulai Kursus'}
                                                            <ChevronRight size={14} className="ml-1" />
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div
                                                        key={kursus.id}
                                                        className="flex flex-col p-5 rounded-2xl border border-gray-800/50 bg-[#0b0f19]/50"
                                                    >
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-900/50">
                                                                <Code2 size={20} />
                                                            </div>
                                                            <Lock size={16} className="text-gray-700" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-sm font-bold text-gray-500 mb-2">
                                                                {kursus.nama}
                                                            </h3>
                                                            <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4">
                                                                {kursus.deskripsi}
                                                            </p>
                                                        </div>
                                                        <div className="mt-auto text-xs font-medium text-gray-600">
                                                            Selesaikan level sebelumnya
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                            {kursusLevel.length === 0 && (
                                                <div className="col-span-full p-8 rounded-2xl border border-dashed border-gray-800 text-center">
                                                    <Code2 size={24} className="text-gray-600 mx-auto mb-2" />
                                                    <p className="text-gray-500 text-sm">Belum ada kursus untuk level ini.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
