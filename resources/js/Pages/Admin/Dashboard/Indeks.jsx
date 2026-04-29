import React from 'react';
import { Head } from '@inertiajs/react';
import { Users, BookOpen, DollarSign, TrendingUp, Activity, ShieldCheck, Star } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Indeks({ auth, stats, revenue_monthly }) {
    const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

    const statCards = [
        { title: 'Total Revenue',     value: fmt(stats.total_revenue),  icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
        { title: 'Total Siswa',       value: stats.total_users,          icon: Users,      color: 'text-blue-400',  bg: 'bg-blue-500/10' },
        { title: 'Kursus Aktif',      value: stats.active_courses,       icon: BookOpen,   color: 'text-purple-400',bg: 'bg-purple-500/10' },
        { title: 'Mentor Pending',    value: stats.pending_mentors,      icon: Star,       color: 'text-orange-400',bg: 'bg-orange-500/10' },
    ];

    const maxRevenue = Math.max(...(revenue_monthly?.map(d => d.amount) || [1]));

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Overview" />

            <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8 max-w-7xl mx-auto">

                {/* Page header */}
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                        Platform <span className="text-red-500">Overview</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Ringkasan performa dan kesehatan platform Code Genius.</p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((s, i) => (
                        <div key={i} className="bg-[#0D1117] border border-white/5 rounded-2xl p-4 lg:p-5 flex flex-col gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg} ${s.color} shrink-0`}>
                                <s.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">{s.title}</p>
                                <p className="text-xl lg:text-2xl font-black text-white truncate">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Revenue chart */}
                    <div className="lg:col-span-2 bg-[#0D1117] border border-white/5 rounded-2xl p-5 lg:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-base font-bold flex items-center gap-2">
                                <TrendingUp size={16} className="text-red-500" /> Revenue Growth
                            </h2>
                            <span className="text-[10px] font-bold px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg">2026</span>
                        </div>

                        <div className="h-48 flex items-end gap-2 sm:gap-3 border-b border-l border-white/8 px-2 pb-2">
                            {revenue_monthly?.map((data, i) => {
                                const pct = (data.amount / maxRevenue) * 100;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                                        <div className="w-full relative flex items-end justify-center" style={{ height: `${pct}%` }}>
                                            <div className="w-full bg-gradient-to-t from-red-500/70 to-orange-400/70 rounded-t-lg group-hover:from-red-500 group-hover:to-orange-400 transition-all relative">
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {fmt(data.amount)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold text-gray-600">{data.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* System health */}
                    <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 lg:p-6 flex flex-col gap-5">
                        <h2 className="text-base font-bold flex items-center gap-2">
                            <Activity size={16} className="text-[#2348b7]" /> System Health
                        </h2>

                        <div className="space-y-4">
                            {[
                                { label: 'Server Uptime',  value: '99.99%', pct: 99.99, ok: true },
                                { label: 'Database Load',  value: '12%',    pct: 12,    ok: true },
                                { label: 'AI API Quota',   value: '78%',    pct: 78,    ok: false },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-gray-400">{item.label}</span>
                                        <span className={item.ok ? 'text-green-400' : 'text-yellow-400'}>{item.value}</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${item.ok ? 'bg-green-500' : 'bg-yellow-500'}`}
                                            style={{ width: `${item.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-[#2348b7]/10 border border-[#2348b7]/20 flex gap-3">
                            <ShieldCheck size={18} className="text-[#2348b7] shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-[#2348b7] mb-0.5">Keamanan Normal</p>
                                <p className="text-[11px] text-gray-500 leading-relaxed">Tidak ada akses mencurigakan dalam 24 jam terakhir.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
