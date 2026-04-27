import React from 'react';
import { Head } from '@inertiajs/react';
import { Users, BookOpen, Star, DollarSign, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Indeks({ auth, stats, revenue_monthly }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Platform Metrics" />
            
            <div className="px-6 lg:px-12 py-12 space-y-12">
                <header>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Platform <span className="text-red-500 italic">Metrics</span></h1>
                    <p className="text-gray-500 font-light">Ringkasan performa dan kesehatan finansial platform Code Genius.</p>
                </header>

                {/* Top Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Total Revenue', value: formatCurrency(stats.total_revenue), icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
                        { title: 'Total Students', value: stats.total_users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        { title: 'Active Courses', value: stats.active_courses, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                        { title: 'Pending Mentors', value: stats.pending_mentors, icon: Star, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-8 bg-white/[0.02] border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <stat.icon size={80} />
                            </div>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2">{stat.title}</h4>
                            <p className="text-3xl font-black">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Growth Chart Simulation */}
                    <div className="lg:col-span-2 glass-card p-10 bg-white/[0.02] border-white/5 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black flex items-center gap-3"><TrendingUp className="text-red-500" /> Revenue Growth</h2>
                            <span className="text-xs font-bold px-3 py-1 bg-red-500/10 text-red-500 rounded-lg">2026 Q1</span>
                        </div>
                        
                        <div className="h-64 flex items-end gap-6 pt-10 border-b border-l border-white/10 px-4 pb-4">
                            {revenue_monthly.map((data, i) => {
                                const maxAmount = Math.max(...revenue_monthly.map(d => d.amount));
                                const heightPercentage = (data.amount / maxAmount) * 100;
                                
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <div className="w-full relative flex items-end justify-center h-full">
                                            <div 
                                                className="w-full bg-gradient-to-t from-red-500/80 to-orange-400/80 rounded-t-xl group-hover:from-red-500 group-hover:to-orange-400 transition-all cursor-pointer relative"
                                                style={{ height: `${heightPercentage}%` }}
                                            >
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {formatCurrency(data.amount)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500">{data.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="glass-card p-10 bg-white/[0.02] border-white/5 space-y-8">
                        <h2 className="text-xl font-black flex items-center gap-3"><Activity className="text-secondary" /> System Health</h2>
                        
                        <div className="space-y-6">
                            {[
                                { label: 'Server Uptime', value: '99.99%', status: 'optimal' },
                                { label: 'Database Load', value: '12%', status: 'optimal' },
                                { label: 'AI API Quota', value: '78%', status: 'warning' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-gray-400">
                                        <span>{item.label}</span>
                                        <span className={item.status === 'optimal' ? 'text-green-500' : 'text-yellow-500'}>{item.value}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${item.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                            style={{ width: item.value }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex gap-4 mt-8">
                            <ShieldCheck className="text-primary shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-sm text-primary mb-1">Security Normal</h4>
                                <p className="text-xs text-gray-400">Tidak ada indikasi akses mencurigakan dalam 24 jam terakhir.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
