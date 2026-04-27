import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { TrendingUp, Award, Clock, BookOpen, ChevronRight, Zap, Target, BarChart3, ArrowLeft } from 'lucide-react';

export default function Progres({ auth }) {
    const stats = [
        { label: 'Poin Belajar', value: '2,450', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { label: 'Modul Selesai', value: '12/45', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Peringkat', value: '#128', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
    ];

    const kursus_aktif = [
        { nama: 'HTML Dasar', progres: 85, terakhir: 'Tag Paragraf', ikon: '🌐', warna: 'from-orange-500 to-red-500' },
        { nama: 'JavaScript Modern', progres: 25, terakhir: 'Variabel Let', ikon: '⚡', warna: 'from-yellow-400 to-orange-500' },
        { nama: 'CSS Grid & Flexbox', progres: 10, terakhir: 'Pengenalan Flex', ikon: '🎨', warna: 'from-blue-500 to-indigo-500' },
    ];

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col md:flex-row">
            <Head title="Progres Belajar" />
            
            {/* Minimalist Side Nav if accessing from dashboard */}
            <aside className="w-20 border-r border-white/5 h-screen sticky top-0 bg-[#0D1117] hidden lg:flex flex-col items-center py-8 gap-8">
                <Link href="/dashboard" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-gray-500 hover:text-white">
                    <ArrowLeft size={20} />
                </Link>
                <div className="w-1 h-20 bg-gradient-to-b from-primary to-transparent rounded-full opacity-20" />
            </aside>

            <main className="flex-1 p-8 lg:p-16 max-w-6xl mx-auto w-full">
                <div className="mb-16">
                    <h1 className="text-4xl font-black mb-4">Statistik Belajar Anda</h1>
                    <p className="text-gray-500 font-light">Pantau pencapaian Anda dan teruslah konsisten dalam belajar.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((s, i) => (
                        <div key={i} className="glass-card p-8 group hover:bg-white/5 transition-all">
                            <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-6`}>
                                <s.icon size={24} />
                            </div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-[2px] mb-2">{s.label}</p>
                            <p className="text-3xl font-black">{s.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Courses Progress */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
                            <BarChart3 size={20} className="text-secondary" /> Kursus yang Sedang Diikuti
                        </h2>
                        
                        <div className="space-y-6">
                            {kursus_aktif.map((k, i) => (
                                <div key={i} className="glass-card p-8 group hover:border-white/10 transition-all">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-6">
                                            <div className="text-4xl w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                {k.ikon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{k.nama}</h3>
                                                <p className="text-sm text-gray-500 italic">Terakhir dipelajari: <span className="text-secondary font-medium">{k.terakhir}</span></p>
                                            </div>
                                        </div>
                                        <span className="text-2xl font-black text-gray-800">{k.progres}%</span>
                                    </div>
                                    
                                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${k.warna} rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(75,59,201,0.3)]`} 
                                            style={{ width: `${k.progres}%` }} 
                                        />
                                    </div>
                                    
                                    <div className="mt-8 flex justify-end">
                                        <Link href="/kursus" className="text-sm font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                                            Lanjutkan Belajar <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Activity / Leaderboard Mini */}
                    <div className="space-y-12">
                        <section className="glass-card p-8">
                            <h3 className="font-bold mb-8 flex items-center gap-2">
                                <TrendingUp size={18} className="text-accent" /> Aktivitas Mingguan
                            </h3>
                            <div className="flex items-end justify-between h-32 gap-2">
                                {[30, 60, 45, 90, 20, 55, 80].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div 
                                            className={`w-full rounded-t-lg bg-primary/20 hover:bg-primary transition-all cursor-help`}
                                            style={{ height: `${h}%` }}
                                            title={`${h} Menit`}
                                        />
                                        <span className="text-[10px] text-gray-700 font-bold">SMSTKJS</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="glass-card p-8 bg-accent/5 border-accent/20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-accent/20 text-accent">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Next Milestone</h4>
                                    <p className="text-xs text-gray-500">Sertifikat HTML Dasar</p>
                                </div>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-4">
                                <div className="bg-accent h-full w-[85%]" />
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Tinggal 2 modul lagi!</p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CheckCircle({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    )
}
