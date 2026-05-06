import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Brain,
    ChevronRight,
    Code2,
    Flame,
    Lightbulb,
    Medal,
    Palette,
    Sparkles,
    Swords,
    Target,
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
    frontend: { label: 'Frontend' },
    backend: { label: 'Backend' },
};

export default function Indeks({ auth, semua_kursus, kursus_rekomendasi }) {
    const user = auth.pengguna;
    const jalurCfg = JALUR_CONFIG[user.jalur_belajar] || JALUR_CONFIG.frontend;
    const levelCfg = LEVEL_CONFIG[user.level_pemahaman] || LEVEL_CONFIG.beginner;

    const xp = Number(user.xp || 0);
    const targetXp = 5000;
    const progressPercent = Math.min(100, Math.round((xp / targetXp) * 100));
    const numberID = new Intl.NumberFormat('id-ID');

    const cards = [
        { title: 'Jalur Belajar', value: jalurCfg.label, icon: Palette, color: 'text-amber-400' },
        { title: 'Level Kamu', value: levelCfg.label, icon: Zap, color: 'text-yellow-400' },
        { title: 'Total XP', value: numberID.format(xp), icon: Sparkles, color: 'text-accent' },
        { title: 'Streak Harian', value: `${user.streak_harian || 0} Hari`, icon: Flame, color: 'text-orange-500' },
    ];

    const achievements = [
        { id: 'first_code', label: 'First Code', icon: Trophy, desc: 'Selesaikan materi pertama', isUnlocked: xp > 0 },
        { id: 'streak_7', label: '7-Day Streak', icon: Flame, desc: 'Belajar 7 hari berturut-turut', isUnlocked: (user.streak_harian || 0) >= 7 },
        { id: 'course_master', label: 'Course Master', icon: Medal, desc: 'Selesaikan 1 kursus penuh', isUnlocked: xp >= 1000 },
        { id: 'ai_expert', label: 'AI Chat Master', icon: Brain, desc: 'Bertanya ke AI 10 kali', isUnlocked: xp >= 500 },
        { id: 'warrior', label: 'Code Warrior', icon: Swords, desc: 'Selesaikan 5 tantangan kode', isUnlocked: xp >= 2500 },
        { id: 'speed_coder', label: 'Speed Coder', icon: Zap, desc: 'Capai 5000 XP', isUnlocked: xp >= 5000 },
    ];

    return (
        <UserLayout auth={auth}>
            <Head title="Dashboard — Code Genius" />

            <div className="px-4 sm:px-6 lg:px-10 py-6 space-y-6 md:space-y-8 font-sans">
                {/* Banner Hero */}
                <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D1117] backdrop-blur-xl p-6 md:p-8 lg:p-10 shadow-2xl shadow-black/20 hover:border-accent/20 transition-all group">
                    <div className="absolute right-6 md:right-10 -top-4 opacity-5 hidden md:block rotate-12 pointer-events-none">
                        <Sparkles size={200} className="text-white" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
                        <div className="space-y-5">
                            <div>
                                <p className="text-white/60 font-bold text-sm uppercase tracking-widest mb-1">Welcome Back,</p>
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight break-words">{user.nama}</h1>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <Link
                                    href="/kursus"
                                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2.5 rounded-2xl bg-accent text-black px-6 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-accent/80 transition-all shadow-lg active:scale-95"
                                >
                                    <BookOpen size={16} /> Explore Courses
                                </Link>
                                <Link
                                    href="/roadmap"
                                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
                                >
                                    <Target size={16} /> My Roadmap
                                </Link>
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 border border-white/10 flex flex-col gap-4 w-full">
                            <div className="flex flex-wrap gap-2">
                                <span className="flex-1 text-center px-6 py-1.5 rounded-full bg-white/10 border border-white text-[11px] font-bold uppercase tracking-widest text-white">
                                    {jalurCfg.label}
                                </span>
                                <span className="flex-1 text-center px-6 py-1.5 rounded-full bg-white/10 border border-accent text-[11px] font-bold uppercase tracking-widest text-accent">
                                    {levelCfg.label}
                                </span>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-black/20 flex-shrink-0 flex items-center justify-center text-accent">
                                    <Medal size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Platform Rank</p>
                                    <p className="text-lg font-bold text-white tracking-tight">Elite Coder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stat Cards */}
                <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {cards.map((card) => (
                        <div key={card.title} className="rounded-3xl border border-white/5 bg-[#0D1117] p-5 hover:border-accent/20 transition-all group">
                            <div className="flex items-start justify-between mb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{card.title}</p>
                                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
                                    <card.icon size={18} />
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight break-words">{card.value}</h3>
                        </div>
                    ))}
                </section>

                {/* Progress Bar */}
                <section className="rounded-3xl border border-white/5 bg-[#0D1117] p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
                        <div>
                            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight italic uppercase">Level Progression</h2>
                            <p className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-widest">
                                <span className="text-accent">{numberID.format(xp)}</span> / {numberID.format(targetXp)} XP Collected
                            </p>
                        </div>
                        <p className="text-2xl font-black text-accent italic">{progressPercent}%</p>
                    </div>
                    <div className="h-4 w-full rounded-full bg-white/5 overflow-hidden border border-white/5 p-1">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-white shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Weekly Activity Chart */}
                    <div className="xl:col-span-8">
                        <div className="rounded-[2rem] border border-white/5 bg-[#0D1117] p-6 md:p-8 h-full">
                            <div className="flex flex-col sm:flex-row sm:items-stretch justify-between gap-4 mb-10">
                                <div>
                                    <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider italic">Weekly Momentum</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Lacak konsistensi belajarmu</p>
                                </div>
                                <div className="flex-shrink-0 text-left sm:text-right">
                                    <span className="text-[10px] text-accent bg-accent/10 px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-accent/20">Activity Streak</span>
                                    <p className="text-sm text-white font-black mt-2">{user.streak_harian || 0} Days</p>
                                </div>
                            </div>
                            
                            <div className="flex items-end justify-between gap-3 sm:gap-4 px-2 min-h-[180px]">
                                {[
                                    { day: 'Mon', val: 65 }, { day: 'Tue', val: 40 }, { day: 'Wed', val: 85 },
                                    { day: 'Thu', val: 55 }, { day: 'Fri', val: 95 }, { day: 'Sat', val: 30 },
                                    { day: 'Sun', val: 20 }
                                ].map((item) => (
                                    <div key={item.day} className="flex-1 flex flex-col items-center gap-4 group/bar">
                                        <div className="w-full relative flex items-end justify-center h-36">
                                            <div 
                                                className="absolute bottom-0 w-full max-w-[28px] bg-accent/20 blur-lg opacity-0 group-hover/bar:opacity-100 transition-opacity"
                                                style={{ height: `${item.val}%` }}
                                            />
                                            <div 
                                                className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ease-out ${
                                                    item.val > 80 ? 'bg-accent shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/5 group-hover/bar:bg-white/10'
                                                }`}
                                                style={{ height: `${item.val}%` }}
                                            />
                                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 pointer-events-none">
                                                <span className="text-[10px] font-black text-accent bg-black border border-accent/20 px-2 py-1 rounded-md whitespace-nowrap">
                                                    {Math.round(item.val * 12)} XP
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                                            item.val > 80 ? 'text-accent' : 'text-gray-600 group-hover/bar:text-gray-400'
                                        }`}>
                                            {item.day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="xl:col-span-4 space-y-6">
                        {/* Daily Tips */}
                        <div className="rounded-3xl border border-accent/20 bg-accent/10 p-6 md:p-8 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform pointer-events-none">
                                <Lightbulb size={100} />
                            </div>
                            <h3 className="flex items-center gap-2 text-sm font-black text-accent uppercase tracking-[3px] mb-3 italic">
                                <Zap size={16} /> Daily Insight
                            </h3>
                            <p className="text-sm font-medium leading-relaxed text-gray-300">
                                Konsistensi lebih penting dari intensitas. 30 menit setiap hari lebih efektif daripada 5 jam sekali.
                            </p>
                        </div>

                        {/* Achievements Mini Grid */}
                        <div className="rounded-3xl border border-white/5 bg-[#0D1117] p-6 md:p-8">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-sm font-black text-white uppercase tracking-[3px] italic">Badges</h3>
                                <span className="text-[10px] font-black bg-white/5 px-2.5 py-1 rounded-lg text-gray-500 tracking-widest">
                                    {achievements.filter(a => a.isUnlocked).length}/{achievements.length}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-3 gap-3">
                                {achievements.map((item) => (
                                    <div
                                        key={item.id}
                                        title={item.isUnlocked ? `Terbuka: ${item.desc}` : `Terkunci: ${item.desc}`}
                                        className={`aspect-square rounded-2xl border flex items-center justify-center p-2 transition-all cursor-help group/badge ${
                                            item.isUnlocked 
                                            ? 'border-accent/30 bg-accent/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                                            : 'border-white/5 bg-white/[0.02] opacity-40 grayscale'
                                        }`}
                                    >
                                        <item.icon size={24} className={`${item.isUnlocked ? 'text-accent animate-in zoom-in' : 'text-gray-600'}`} />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-black border border-white/10 rounded-lg text-[10px] font-bold text-white text-center whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-50">
                                            <p>{item.label}</p>
                                            <p className="text-white/60 text-[9px] font-normal">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Challenges */}
                    <div className="xl:col-span-12">
                        <div className="rounded-[2rem] border border-white/5 bg-[#0D1117] p-6 md:p-8">
                            <h3 className="flex items-center gap-3 text-base md:text-lg font-black text-white uppercase tracking-wider italic mb-6">
                                <Flame size={20} className="text-orange-500" /> Hot Challenges
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="#" className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex-shrink-0 flex items-center justify-center text-accent">
                                            <Code2 size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">Weekly Challenge: Array Sorting</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Reward: +150 XP</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-700 group-hover:text-accent transition-colors flex-shrink-0" />
                                </Link>
                                <Link href="#" className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-500">
                                            <Brain size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Logic Mastery: Recursion 101</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Reward: +300 XP</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-700 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
