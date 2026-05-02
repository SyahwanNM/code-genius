import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Award, Star, Clock, Zap, Target, BookOpen, 
    Link as LinkIcon, Globe, Calendar, Edit3, Code2, Sparkles, MapPin, GitBranch
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Indeks({ auth }) {
    const pengguna = auth.pengguna;
    const avatarStyle = pengguna.avatar_style || 'avataaars';
    const socialLinks = pengguna.tautan_sosial || {};
    const skills = pengguna.keahlian_utama || [];

    return (
        <UserLayout auth={auth}>
            <Head title={`${pengguna.nama} - Profil Code Genius`} />
            
            <div className="px-6 lg:px-12 py-12 space-y-12 relative z-10 max-w-7xl mx-auto">
                {/* Profile Header Card */}
                <section className="glass-card p-0 overflow-hidden border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
                    <div className="h-56 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] to-transparent opacity-80" />
                        <SparkleBackground />
                    </div>
                    
                    <div className="px-12 pb-12 relative">
                        <div className="flex flex-col md:flex-row items-end gap-10 -mt-20 mb-12">
                            <div className="w-44 h-44 rounded-[44px] bg-amber-500 p-1 shadow-2xl shadow-amber-500/30">
                                <div className="w-full h-full rounded-[42px] bg-[#05070A] overflow-hidden flex items-center justify-center">
                                    <img 
                                        src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${pengguna.nama}`} 
                                        alt={pengguna.nama} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 pb-6">
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h1 className="text-4xl font-black text-white">{pengguna.nama}</h1>
                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-[2px] shadow-lg shadow-amber-500/20">
                                        <Award size={12} /> Level {pengguna.level || 1}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-6 text-gray-500 text-sm font-medium">
                                    <span className="flex items-center gap-2"><MapPin size={16} className="text-amber-500" /> Indonesia</span>
                                    <span className="flex items-center gap-2"><Calendar size={16} className="text-amber-500" /> Joined Code Genius</span>
                                    <span className="flex items-center gap-2 text-amber-500 font-black uppercase tracking-widest text-[10px] bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                                        <Zap size={14} fill="currentColor" /> {pengguna.streak_harian || 0} Day Streak
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 pb-6">
                                <Link href="/profil/edit" className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all flex items-center gap-3 text-white">
                                    <Edit3 size={18} className="text-amber-500" /> Customize Profile
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                            {/* Left Col: Stats & Social */}
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[4px] text-gray-700 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" /> Experience Points
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5 group hover:border-amber-500/30 transition-all">
                                            <p className="text-[10px] font-black text-gray-600 uppercase mb-3 tracking-widest">Total XP</p>
                                            <div className="flex items-end gap-2">
                                                <p className="text-3xl font-black text-white">{pengguna.xp || 0}</p>
                                                <span className="text-[10px] font-black text-amber-500 mb-1.5 uppercase">Pts</span>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5 group hover:border-amber-500/30 transition-all">
                                            <p className="text-[10px] font-black text-gray-600 uppercase mb-3 tracking-widest">Global Rank</p>
                                            <p className="text-3xl font-black text-amber-500 italic">#1</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[4px] text-gray-700 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]" /> Social Links
                                    </h2>
                                    <div className="space-y-3">
                                        {socialLinks.github && (
                                            <a href={`https://github.com/${socialLinks.github}`} target="_blank" className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 text-sm hover:bg-white/5 transition-all group">
                                                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white"><GitBranch size={18} /> <span className="font-black uppercase tracking-widest text-[10px]">GitHub</span></div>
                                                <span className="text-amber-500 font-medium italic">@{socialLinks.github}</span>
                                            </a>
                                        )}
                                        {socialLinks.linkedin && (
                                            <a href={socialLinks.linkedin} target="_blank" className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 text-sm hover:bg-white/5 transition-all group">
                                                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white"><LinkIcon size={18} /> <span className="font-black uppercase tracking-widest text-[10px]">LinkedIn</span></div>
                                                <span className="text-amber-500 font-medium italic">View Profile</span>
                                            </a>
                                        )}
                                        {socialLinks.website && (
                                            <a href={socialLinks.website} target="_blank" className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 text-sm hover:bg-white/5 transition-all group">
                                                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white"><Globe size={18} /> <span className="font-black uppercase tracking-widest text-[10px]">Website</span></div>
                                                <span className="text-amber-500 font-medium italic">Visit Site</span>
                                            </a>
                                        )}
                                        {!socialLinks.github && !socialLinks.linkedin && !socialLinks.website && (
                                            <div className="p-10 border border-dashed border-white/10 rounded-3xl text-center">
                                                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">No social links added</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Bio & Skills */}
                            <div className="lg:col-span-2 space-y-12">
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-black flex items-center gap-4 italic">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black">
                                            <Sparkles size={20} />
                                        </div>
                                        Digital Persona & Expertise
                                    </h2>
                                    <div className="glass-card p-12 bg-white/[0.02] border-white/5 rounded-[40px]">
                                        <p className={`text-xl text-gray-400 font-medium leading-relaxed mb-12 ${!pengguna.bio ? 'italic opacity-30 text-base' : ''}`}>
                                            {pengguna.bio || "Siswa luar biasa ini belum membagikan ceritanya. Setiap baris kode adalah cerita, apa cerita Anda? Tambahkan biodata Anda sekarang."}
                                        </p>
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-700 flex items-center gap-3">
                                                <Code2 size={14} className="text-amber-500" /> Specialized Skills
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                {skills.length > 0 ? skills.map((skill, i) => (
                                                    <span key={i} className="px-6 py-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-[10px] font-black text-amber-500 uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all cursor-default">
                                                        {skill}
                                                    </span>
                                                )) : (
                                                    <span className="text-xs text-gray-700 italic">Belum ada keahlian yang ditambahkan...</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Learning Path Badge - Optional Future Feature */}
                                <div className="p-10 rounded-[40px] bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-between group overflow-hidden relative shadow-2xl shadow-amber-500/20">
                                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                                        <Target size={180} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mb-2">Current Learning Path</p>
                                        <h3 className="text-3xl font-black text-black uppercase italic tracking-tighter">
                                            {pengguna.jalur_belajar ? pengguna.jalur_belajar.replace('-', ' ') : 'General Path'}
                                        </h3>
                                    </div>
                                    <div className="relative z-10 w-20 h-20 rounded-full bg-black/10 flex items-center justify-center text-black border border-black/10">
                                        <BookOpen size={32} />
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
                    className="absolute w-1 h-1 bg-amber-500 rounded-full animate-pulse"
                    style={{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animationDelay: Math.random() * 5 + 's',
                        opacity: Math.random() * 0.3
                    }}
                />
            ))}
        </div>
    );
}
