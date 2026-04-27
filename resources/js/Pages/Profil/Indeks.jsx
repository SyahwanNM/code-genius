import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Award, Star, Clock, Zap, Target, BookOpen, 
    Link as LinkIcon, GitBranch, AtSign, MapPin, Calendar, Edit3, Code2
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Indeks({ auth }) {
    return (
        <UserLayout auth={auth}>
            <Head title={`${auth.pengguna.nama} - Profil Code Genius`} />
            
            <div className="px-6 lg:px-12 py-12 space-y-12 relative z-10">
                {/* Profile Header Card */}
                <section className="glass-card p-0 overflow-hidden border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                    <div className="h-48 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <SparkleBackground />
                    </div>
                    
                    <div className="px-12 pb-12 relative">
                        <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 mb-12">
                            <div className="w-40 h-40 rounded-[40px] bg-gradient-to-br from-primary to-secondary p-1 shadow-2xl shadow-primary/20">
                                <div className="w-full h-full rounded-[38px] bg-[#05070A] flex items-center justify-center text-5xl font-black italic">
                                    {auth.pengguna.nama[0]}
                                </div>
                            </div>
                            <div className="flex-1 pb-4">
                                <div className="flex items-center gap-4 mb-3">
                                    <h1 className="text-4xl font-black">{auth.pengguna.nama}</h1>
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[2px] border border-primary/20">Level {auth.pengguna.level || 1}</span>
                                </div>
                                <div className="flex flex-wrap gap-6 text-gray-500 text-sm font-light">
                                    <span className="flex items-center gap-2"><MapPin size={16} className="text-secondary" /> Indonesia</span>
                                    <span className="flex items-center gap-2"><Calendar size={16} className="text-secondary" /> Member since {new Date().getFullYear()}</span>
                                    <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                                        <Zap size={14} fill="currentColor" /> {auth.pengguna.streak_harian || 0} Day Streak
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 pb-4">
                                <Link href="/profil/edit" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                                    <Edit3 size={18} /> Edit Profil
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                            {/* Left Col: Stats & Info */}
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[4px] text-gray-700 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#A78BFA]" /> Achievement Stats
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                            <p className="text-[10px] font-black text-gray-600 uppercase mb-2">Total XP</p>
                                            <p className="text-2xl font-black text-secondary">{auth.pengguna.xp || 0}</p>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                            <p className="text-[10px] font-black text-gray-600 uppercase mb-2">Projects</p>
                                            <p className="text-2xl font-black text-primary">12</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[4px] text-gray-700 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#A78BFA]" /> Social Links
                                    </h2>
                                    <div className="space-y-3">
                                        {[
                                            { icon: GitBranch, label: 'GitHub', value: '@' + auth.pengguna.nama.toLowerCase().replace(' ', '') },
                                            { icon: LinkIcon, label: 'Website', value: 'portfolio.dev' },
                                            { icon: AtSign, label: 'Twitter', value: '@' + auth.pengguna.nama.toLowerCase().replace(' ', '') },
                                        ].map((social, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 text-sm">
                                                <div className="flex items-center gap-3 text-gray-400"><social.icon size={16} /> <span className="font-bold">{social.label}</span></div>
                                                <span className="text-gray-600 italic">{social.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Bio & Skills */}
                            <div className="lg:col-span-2 space-y-12">
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-black flex items-center gap-3 italic underline decoration-primary/20">
                                        <Code2 className="text-primary" /> Bio & Expertise
                                    </h2>
                                    <div className="glass-card p-10 bg-white/[0.02] border-white/5">
                                        <p className={`text-lg text-gray-400 font-light leading-relaxed mb-10 ${!auth.pengguna.bio ? 'italic opacity-30 text-sm' : ''}`}>
                                            {auth.pengguna.bio || "Belum ada biodata yang ditambahkan. Perkenalkan diri Anda kepada dunia di menu Edit Profil agar member lain mengenal keahlian Anda."}
                                        </p>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-600">Top Skills</p>
                                            <div className="flex flex-wrap gap-4">
                                                {['Laravel Expert', 'React Ninja', 'Node.js', 'UI Design', 'PostgreSQL'].map((skill, i) => (
                                                    <span key={i} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-300 hover:border-secondary/30 transition-all cursor-default">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}

function SparkleBackground() {
    return (
        <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animationDelay: Math.random() * 5 + 's',
                        opacity: Math.random() * 0.5
                    }}
                />
            ))}
        </div>
    );
}
