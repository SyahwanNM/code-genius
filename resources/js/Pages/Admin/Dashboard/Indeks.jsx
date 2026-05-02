import React from 'react';
import { Head } from '@inertiajs/react';
import { 
    Users, BookOpen, DollarSign, TrendingUp, Activity, 
    ShieldCheck, Star, HardDrive, Cpu, Server, 
    Database, CheckCircle2, Clock
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Indeks({ auth, stats, revenue_monthly, system_health }) {
    const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

    const statCards = [
        { title: 'Total Revenue',     value: fmt(stats.total_revenue),  icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { title: 'Total Siswa',       value: stats.total_users,          icon: Users,      color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
        { title: 'Kursus Aktif',      value: stats.active_courses,       icon: BookOpen,   color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20' },
        { title: 'Total Materi',      value: stats.total_materi,         icon: Star,       color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
    ];

    const maxRevenue = Math.max(...(revenue_monthly?.map(d => d.amount) || [1]));

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Overview" />

            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-7xl mx-auto">

                {/* Page header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                            Dashboard <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent underline decoration-amber-500/30">Overview</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                            <Activity size={14} className="text-amber-500" />
                            Ringkasan performa dan kesehatan platform Code Genius hari ini.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-gray-300">System Live</span>
                    </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((s, i) => (
                        <div key={i} className={`group bg-[#0D1117] border ${s.border} rounded-3xl p-6 transition-all hover:scale-[1.02] hover:bg-[#121820] hover:shadow-2xl hover:shadow-black/50`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg} ${s.color} shrink-0 shadow-inner`}>
                                    <s.icon size={22} />
                                </div>
                                <div className="text-[10px] font-black bg-white/5 px-2 py-1 rounded-md text-gray-500 uppercase tracking-tighter">Live Stats</div>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1">{s.title}</p>
                                <p className="text-2xl lg:text-3xl font-black text-white tracking-tight">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Revenue chart section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#0D1117] border border-white/5 rounded-3xl p-6 lg:p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                <TrendingUp size={120} />
                            </div>
                            
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 rounded-xl">
                                        <TrendingUp size={20} className="text-amber-500" />
                                    </div>
                                    <h2 className="text-lg font-black text-white">Revenue Analysis</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 uppercase">Monthly Report</span>
                                </div>
                            </div>

                            <div className="h-64 flex items-end gap-3 sm:gap-6 border-b border-white/5 px-2 pb-6 relative z-10">
                                {revenue_monthly?.map((data, i) => {
                                    const pct = (data.amount / maxRevenue) * 100;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
                                            <div className="w-full relative flex items-end justify-center" style={{ height: `${pct || 5}%` }}>
                                                <div className="w-full max-w-[40px] bg-gradient-to-t from-amber-600 to-yellow-500 rounded-t-xl transition-all duration-500 group-hover:from-amber-500 group-hover:to-yellow-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl whitespace-nowrap z-20">
                                                        {fmt(data.amount)}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors">{data.month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Users List */}
                        <div className="bg-[#0D1117] border border-white/5 rounded-3xl p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-xl">
                                        <Users size={20} className="text-blue-500" />
                                    </div>
                                    <h2 className="text-lg font-black text-white">Recent Registrations</h2>
                                </div>
                                <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">View All</button>
                            </div>
                            
                            <div className="space-y-4">
                                {stats.recent_users?.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold border border-white/10 group-hover:scale-110 transition-transform">
                                                {user.nama?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{user.nama}</p>
                                                <p className="text-[11px] text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                                <Clock size={10} /> {new Date(user.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 font-bold uppercase tracking-tighter">Student</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* System health sidebar */}
                    <div className="space-y-8">
                        <div className="bg-[#0D1117] border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col gap-8 relative overflow-hidden">
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-indigo-500/10 rounded-xl">
                                    <Activity size={20} className="text-indigo-500" />
                                </div>
                                <h2 className="text-lg font-black text-white">System Vitality</h2>
                            </div>

                            <div className="space-y-6 relative z-10">
                                {/* Disk Usage */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            <HardDrive size={14} /> Storage Usage
                                        </span>
                                        <span className={system_health.disk.usage_pct > 80 ? 'text-red-400' : 'text-emerald-400'}>
                                            {system_health.disk.usage_pct}%
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5 p-[1px]">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                system_health.disk.usage_pct > 80 ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                            }`}
                                            style={{ width: `${system_health.disk.usage_pct}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-medium text-gray-500">
                                        <span>Used: {system_health.disk.total}</span>
                                        <span>Free: {system_health.disk.free}</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-white/5 w-full"></div>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors">
                                        <Cpu size={16} className="text-blue-400 mb-2" />
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">PHP Version</p>
                                        <p className="text-sm font-black text-white">{system_health.php_version}</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors">
                                        <Server size={16} className="text-purple-400 mb-2" />
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">Laravel</p>
                                        <p className="text-sm font-black text-white">v{system_health.laravel_version}</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors">
                                        <Database size={16} className="text-amber-400 mb-2" />
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">Database</p>
                                        <p className="text-sm font-black text-white">{system_health.database.status}</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors">
                                        <Activity size={16} className="text-emerald-400 mb-2" />
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">Memory</p>
                                        <p className="text-sm font-black text-white">{system_health.memory.usage}</p>
                                    </div>
                                </div>

                                {/* Security Status */}
                                <div className="mt-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex gap-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-xl self-start">
                                        <ShieldCheck size={20} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-emerald-500 mb-1 uppercase tracking-wider">Security Shield Active</p>
                                        <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Environment is currently in <span className="text-white font-bold">{system_health.environment}</span> mode. All protocols are running within normal parameters.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Courses */}
                        <div className="bg-[#0D1117] border border-white/5 rounded-3xl p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-500/10 rounded-xl">
                                    <Star size={20} className="text-amber-500" />
                                </div>
                                <h2 className="text-lg font-black text-white">Top Courses</h2>
                            </div>
                            <div className="space-y-4">
                                {stats.top_courses?.map((course, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-default">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-gray-600 group-hover:text-amber-500 transition-colors">0{i+1}</span>
                                            <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{course.nama}</p>
                                        </div>
                                        <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded text-gray-500 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-all border border-transparent group-hover:border-amber-500/20">
                                            {course.students_count} Siswa
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Tips or Advice */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <CheckCircle2 size={120} />
                            </div>
                            <h3 className="text-xl font-black mb-2 relative z-10">Optimasi Platform</h3>
                            <p className="text-sm text-blue-100/80 mb-6 relative z-10 leading-relaxed">
                                Pastikan untuk membersihkan cache database secara berkala untuk menjaga performa tetap optimal bagi para siswa.
                            </p>
                            <button className="bg-white text-blue-700 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-50 transition-all relative z-10 shadow-lg active:scale-95">
                                Maintenance Guide
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
