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
        { title: 'Jalur Belajar', value: user.jalur_belajar || 'Frontend', icon: Palette, color: 'text-amber-400' },
        { title: 'Level Kamu', value: levelCfg.label, icon: Zap, color: 'text-yellow-400' },
        { title: 'Total XP', value: numberID.format(xp), icon: Sparkles, color: 'text-amber-500' },
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

            <div className="px-6 lg:px-10 py-6 space-y-5 font-sans">
                {/* Banner Hero */}
                <section className="relative overflow-hidden rounded-[32px] border border-amber-500/20 bg-gradient-to-br from-amber-600 to-yellow-500 p-8 lg:p-10 shadow-2xl shadow-amber-500/10">
                    <div className="absolute right-12 top-0 opacity-10 hidden md:block rotate-12">
                        <Sparkles size={180} className="text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                    {jalurCfg.label}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-black">
                                    {levelCfg.label}
                                </span>
                            </div>
                            <div>
                                <p className="text-black/60 font-bold text-sm uppercase tracking-widest mb-1">Welcome Back,</p>
                                <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight">{user.nama}</h1>
                            </div>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Link
                                    href="/kursus"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-6 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl active:scale-95"
                                >
                                    <BookOpen size={16} /> Explore Courses
                                </Link>
                                <Link
                                    href="/roadmap"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-black hover:bg-white/30 transition-all"
                                >
                                    <Target size={16} /> My Roadmap
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats Right */}
                        <div className="bg-black/10 backdrop-blur-sm rounded-[24px] p-6 border border-white/10 flex flex-col items-center justify-center min-w-[160px]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Platform Rank</p>
                            <div className="w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center text-black mb-3">
                                <Medal size={32} />
                            </div>
                            <p className="text-lg font-black text-black tracking-tight">Elite Coder</p>
                        </div>
                    </div>
                </section>

                {/* Stat Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {cards.map((card) => (
                        <div key={card.title} className="rounded-3xl border border-white/5 bg-[#0D1117] p-6 hover:border-amber-500/20 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{card.title}</p>
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
                                    <card.icon size={20} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">{card.value}</h3>
                        </div>
                    ))}
                </section>

                {/* Progress Bar */}
                <section className="rounded-3xl border border-white/5 bg-[#0D1117] p-8">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight italic uppercase">Level Progression</h2>
                            <p className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-widest">
                                <span className="text-amber-500">{numberID.format(xp)}</span> / {numberID.format(targetXp)} XP Collected
                            </p>
                        </div>
                        <p className="text-2xl font-black text-amber-500 italic">{progressPercent}%</p>
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
                        <div className="rounded-[32px] border border-white/5 bg-[#0D1117] p-8 h-full group/activity">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-wider italic">Weekly Momentum</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Lacak konsistensi belajarmu setiap hari</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-amber-500/20">Active Streak</span>
                                    <p className="text-xs text-white font-black mt-2">{user.streak_harian || 0} Days 🔥</p>
                                </div>
                            </div>
                            
                            <div className="flex items-end justify-between gap-3 sm:gap-6 px-2 min-h-[200px]">
                                {[
                                    { day: 'Mon', val: 65 },
                                    { day: 'Tue', val: 40 },
                                    { day: 'Wed', val: 85 },
                                    { day: 'Thu', val: 55 },
                                    { day: 'Fri', val: 95 },
                                    { day: 'Sat', val: 30 },
                                    { day: 'Sun', val: 20 }
                                ].map((item, i) => (
                                    <div key={item.day} className="flex-1 flex flex-col items-center gap-4 group/bar">
                                        <div className="w-full relative flex items-end justify-center h-40">
                                            {/* Glow Effect on Hover */}
                                            <div 
                                                className="absolute bottom-0 w-full max-w-[32px] bg-amber-500/20 blur-xl opacity-0 group-hover/bar:opacity-100 transition-opacity duration-500"
                                                style={{ height: `${item.val}%` }}
                                            />
                                            {/* Main Bar */}
                                            <div 
                                                className={`w-full max-w-[32px] rounded-t-xl transition-all duration-700 ease-out relative overflow-hidden ${
                                                    item.val > 80 ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-white/5 group-hover/bar:bg-white/10'
                                                }`}
                                                style={{ height: `${item.val}%` }}
                                            >
                                                {item.val > 80 && (
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                )}
                                            </div>
                                            {/* Value Tooltip */}
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                                                <span className="text-[10px] font-black text-amber-500 bg-black border border-amber-500/20 px-2 py-1 rounded-md whitespace-nowrap">
                                                    {Math.round(item.val * 12)} XP
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                                            item.val > 80 ? 'text-amber-500' : 'text-gray-600 group-hover/bar:text-gray-400'
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
                        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Lightbulb size={100} />
                            </div>
                            <h3 className="flex items-center gap-2 text-sm font-black text-amber-500 uppercase tracking-[3px] mb-4 italic">
                                <Zap size={16} /> Daily Insight
                            </h3>
                            <p className="text-sm font-medium leading-relaxed text-gray-300">
                                Konsistensi lebih penting dari intensitas. 30 menit setiap hari jauh lebih efektif daripada 5 jam sekali.
                            </p>
                        </div>

                        {/* Achievements Mini Grid */}
                        <div className="rounded-3xl border border-white/5 bg-[#0D1117] p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-black text-white uppercase tracking-[3px] italic">Badges</h3>
                                <span className="text-[10px] font-black bg-white/5 px-2.5 py-1 rounded-lg text-gray-500 tracking-widest">
                                    {achievements.filter(a => a.isUnlocked).length}/{achievements.length}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {achievements.map((item) => (
                                    <div
                                        key={item.id}
                                        title={item.isUnlocked ? `Terbuka: ${item.desc}` : `Terkunci: ${item.desc}`}
                                        className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-2 transition-all cursor-help relative group/badge ${
                                            item.isUnlocked 
                                            ? 'border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                                            : 'border-white/5 bg-white/[0.02] opacity-30 grayscale'
                                        }`}
                                    >
                                        <item.icon size={20} className={`${item.isUnlocked ? 'text-amber-500 animate-in zoom-in' : 'text-gray-600'}`} />
                                        
                                        {/* Simple Tooltip on hover */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black border border-white/10 rounded-lg text-[9px] font-bold text-white whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-50">
                                            {item.label}: {item.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Challenges */}
                    <div className="xl:col-span-12">
                        <div className="rounded-[32px] border border-white/5 bg-[#0D1117] p-8">
                            <h3 className="flex items-center gap-3 text-lg font-black text-white uppercase tracking-wider italic mb-6">
                                <Flame size={20} className="text-orange-500" /> Hot Challenges
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                            <Code2 size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">Weekly Challenge: Array Sorting</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Reward: +150 XP</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-700 group-hover:text-amber-500 transition-colors" />
                                </div>
                                <div className="flex items-center justify-between p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Brain size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-blue-500 transition-colors">Logic Mastery: Recursion 101</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Reward: +300 XP</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
