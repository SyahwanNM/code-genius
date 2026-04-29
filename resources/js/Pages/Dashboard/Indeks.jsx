import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    BookOpen,
    Brain,
    CalendarDays,
    ChevronRight,
    CircleCheck,
    Code2,
    Flame,
    Lightbulb,
    Medal,
    Palette,
    Sparkles,
    Swords,
    Target,
    Timer,
    Trophy,
    Zap,
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

const LEVEL_CONFIG = {
    beginner: { label: 'Beginner' },
    intermediate: { label: 'Intermediate' },
    advanced: { label: 'Advanced' },
};

const JALUR_CONFIG = {
    frontend: { label: 'Frontend Developer' },
    backend: { label: 'Backend Developer' },
};

export default function Indeks({ auth, semua_kursus, kursus_rekomendasi }) {
    const user = auth.pengguna;
    const jalurCfg = JALUR_CONFIG[user.jalur_belajar] || JALUR_CONFIG.frontend;
    const levelCfg = LEVEL_CONFIG[user.level_pemahaman] || LEVEL_CONFIG.beginner;
    const displayKursus = kursus_rekomendasi?.length > 0 ? kursus_rekomendasi : semua_kursus;
    const previewCourses = displayKursus.slice(0, 4);

    const xp = Number(user.xp || 0);
    const targetXp = 5000;
    const progressPercent = Math.min(100, Math.round((xp / targetXp) * 100));
    const numberID = new Intl.NumberFormat('id-ID');

    const cards = [
        { title: 'Jalur Belajar', value: user.jalur_belajar || 'Frontend', icon: Palette, color: 'text-pink-300' },
        { title: 'Level Kamu', value: levelCfg.label, icon: Zap, color: 'text-orange-400' },
        { title: 'Total XP', value: numberID.format(xp), icon: Sparkles, color: 'text-purple-400' },
        { title: 'Streak Harian', value: `${user.streak_harian || 0} Hari`, icon: Flame, color: 'text-orange-500' },
    ];

    const achievements = [
        { label: 'First Code', icon: Trophy },
        { label: '7-Day Streak', icon: Flame },
        { label: 'Course Complete', icon: Medal },
        { label: 'AI Chat Master', icon: Brain },
        { label: 'Code Warrior', icon: Swords },
        { label: 'Speed Coder', icon: Zap },
    ];


    return (
        <UserLayout auth={auth}>
            <Head title="Dashboard — Code Genius" />

            <div className="px-6 lg:px-10 py-6 space-y-5 font-sans">
                <section className="relative overflow-hidden rounded-2xl border border-[#2b4eae] bg-[#2142a0] p-6 lg:p-8">
                    <div className="absolute right-8 top-2 opacity-15 hidden md:block">
                        <Palette size={120} className="text-[#6d86d2]" />
                    </div>

                    {/* Labels for Large Screen */}
                    <div className="absolute right-6 top-6 hidden lg:flex lg:items-center lg:gap-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
                            <Palette size={14} /> {jalurCfg.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
                            <Zap size={14} /> {levelCfg.label}
                        </span>
                    </div>

                    <p className="text-sm font-medium text-white/70">Selamat datang kembali</p>
                    <h1 className="text-4xl font-bold leading-tight mt-1">{user.nama}!</h1>

                    {/* Labels for Small Screen */}
                    <div className="mt-3 flex flex-wrap gap-2.5 lg:hidden">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
                            <Palette size={14} /> {jalurCfg.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
                            <Zap size={14} /> {levelCfg.label}
                        </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            href="/kursus"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#f4c400] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#ffd84a] transition-colors"
                        >
                            <BookOpen size={16} /> Semua Kursus
                        </Link>
                        <Link
                            href="/roadmap"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            <Target size={16} /> Lihat Roadmap
                        </Link>
                    </div>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {cards.map((card) => (
                        <div key={card.title} className="rounded-xl border border-[#17326d] bg-[#0f1b3a] p-5">
                            <div className="flex items-center justify-between mb-3.5">
                                <p className="text-sm font-medium text-[#7e92bf]">{card.title}</p>
                                <card.icon size={18} className={card.color} />
                            </div>
                            <h3 className="text-2xl font-semibold capitalize leading-tight">{card.value}</h3>
                        </div>
                    ))}
                </section>

                <section className="rounded-xl border border-[#17326d] bg-[#0f1b3a] p-5">
                    <div className="flex items-end justify-between mb-2">
                        <div>
                            <h2 className="text-xl font-semibold">Progress ke Level Advanced</h2>
                            <p className="text-sm text-[#7e92bf] mt-0.5">{numberID.format(xp)} / {numberID.format(targetXp)} XP</p>
                        </div>
                        <p className="text-xl font-semibold text-[#f4c400]">{progressPercent}%</p>
                    </div>
                    <div className="h-3 w-full rounded-full bg-[#172a54] overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#2b5ce7] via-[#7ea2e6] to-[#f4c400]"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </section>

                <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                    

                    <div className="xl:col-span-8 h-full">
                        <div className="rounded-xl border border-[#17326d] bg-[#0f1b3a] p-5 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold">Aktivitas Minggu Ini</h3>
                                    <p className="text-xs text-[#7e92bf] mt-1">Total XP: <span className="text-[#f4c400] font-semibold">1.300 XP</span></p>
                                </div>
                                <span className="text-xs text-[#2ce0b0] bg-[#123d39] px-2.5 py-1 rounded-full font-medium">+12% dari minggu lalu</span>
                            </div>
                            <svg viewBox="0 0 600 200" className="w-full flex-1" style={{ minHeight: '240px' }}>
                                <defs>
                                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#4f79ff" />
                                        <stop offset="100%" stopColor="#2b5ce7" />
                                    </linearGradient>
                                </defs>
                                <g opacity="0.2" stroke="#35508f" strokeWidth="1">
                                    <line x1="0" y1="40" x2="600" y2="40" />
                                    <line x1="0" y1="80" x2="600" y2="80" />
                                    <line x1="0" y1="120" x2="600" y2="120" />
                                    <line x1="0" y1="160" x2="600" y2="160" />
                                </g>
                                <polyline
                                    fill="none"
                                    stroke="url(#lineGrad)"
                                    strokeWidth="3"
                                    points="10,140 100,160 190,80 280,100 370,30 460,60 560,100"
                                />
                            </svg>
                            <div className="flex justify-between text-[11px] text-[#7e92bf] mt-3 font-medium">
                                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((d) => (
                                    <span key={d}>{d}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-4 space-y-4 h-full flex flex-col">
                        <div className="rounded-xl border border-[#3f56b8] bg-gradient-to-b from-[#3650bd] to-[#21378f] p-5">
                            <h3 className="inline-flex items-center gap-2.5 text-base font-semibold mb-3">
                                <Lightbulb size={18} className="text-[#f4c400]" /> Tips Hari Ini
                            </h3>
                            <p className="text-sm leading-relaxed text-white">
                                Konsistensi lebih penting dari intensitas. 30 menit setiap hari jauh lebih efektif daripada 5 jam sekali.
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#17326d] bg-[#0f1b3a] p-5 flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="inline-flex items-center gap-2 text-base font-semibold">
                                    <Trophy size={16} className="text-[#f4c400]" /> Pencapaian
                                </h3>
                                <span className="text-xs text-[#7e92bf] bg-[#122142] px-2.5 py-1 rounded-full">3/6</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {achievements.map((item, i) => (
                                    <div
                                        key={item.label}
                                        className={`rounded-lg border p-3 text-center transition-all ${i < 3 ? 'border-[#3d4f82] bg-[#1a2a54]' : 'border-[#223560] bg-[#101a34] opacity-60'}`}
                                    >
                                        <item.icon size={18} className={`mx-auto mb-2 ${i < 3 ? 'text-[#f4c400]' : 'text-[#7e92bf]'}`} />
                                        <p className="text-[11px] leading-snug text-[#9bb0da] font-medium">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-12">
                        <div className="rounded-xl border border-[#17326d] bg-[#0f1b3a] p-5">
                            <h3 className="inline-flex items-center gap-2 text-base font-semibold mb-4">
                                <CalendarDays size={16} className="text-[#6d91ff]" /> Tantangan Mendatang
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 text-[#d7e1ff] bg-[#0a0f1f] p-4 rounded-lg border border-[#172a54]">
                                    <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-[#f4c400]" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Weekly Challenge: Array Sorting Basics</p>
                                        <p className="text-xs text-[#7e92bf] mt-2"><span className="text-[#f4c400] font-semibold">+150 XP</span></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-[#d7e1ff] bg-[#0a0f1f] p-4 rounded-lg border border-[#172a54]">
                                    <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-[#f4c400]" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Live Coding Session Sabtu 10:00</p>
                                        <p className="text-xs text-[#7e92bf] mt-2"><span className="text-[#f4c400] font-semibold">+300 XP</span></p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/roadmap" className="inline-flex items-center justify-center gap-2 text-[#6d91ff] text-sm font-medium mt-4 hover:text-[#9bb0ff] transition-colors w-full">
                                Lihat Semua Progres <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
