import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Award, Clock, Zap, Target, ArrowRight, Star, ChevronRight, 
    Sparkles, Rocket, Monitor, Server, BookOpen, Map
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

const LEVEL_CONFIG = {
    beginner:     { label: 'Beginner',     color: 'from-emerald-500 to-teal-400',    text: 'text-emerald-400',  bg: 'bg-emerald-500/10', emoji: '🌱' },
    intermediate: { label: 'Intermediate', color: 'from-yellow-500 to-orange-400',   text: 'text-yellow-400',   bg: 'bg-yellow-500/10',  emoji: '⚡' },
    advanced:     { label: 'Advanced',     color: 'from-red-500 to-rose-400',        text: 'text-red-400',      bg: 'bg-red-500/10',     emoji: '🔥' },
};

const JALUR_CONFIG = {
    frontend: { label: 'Frontend Developer', icon: Monitor, color: 'from-blue-500 to-cyan-400',    text: 'text-blue-400',   bg: 'bg-blue-500/10' },
    backend:  { label: 'Backend Developer',  icon: Server,  color: 'from-violet-500 to-indigo-400', text: 'text-violet-400', bg: 'bg-violet-500/10' },
};

export default function Indeks({ auth, semua_kursus, kursus_rekomendasi }) {
    const user       = auth.pengguna;
    const jalurCfg   = JALUR_CONFIG[user.jalur_belajar] || JALUR_CONFIG.frontend;
    const levelCfg   = LEVEL_CONFIG[user.level_pemahaman] || LEVEL_CONFIG.beginner;
    const JalurIcon  = jalurCfg.icon;

    const displayKursus = kursus_rekomendasi?.length > 0 ? kursus_rekomendasi : semua_kursus;

    return (
        <UserLayout auth={auth}>
            <Head title="Dashboard — Code Genius" />
            
            <div className="px-6 lg:px-12 py-8 lg:py-12 space-y-8 lg:space-y-12 relative z-10">

                {/* Welcome Hero — Personalized */}
                <section className={`relative p-8 lg:p-12 rounded-[32px] lg:rounded-[40px] bg-gradient-to-r ${jalurCfg.color} overflow-hidden shadow-2xl group`}>
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700 hidden lg:block">
                        <Sparkles size={250} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-5">
                            <JalurIcon size={12} />
                            {jalurCfg.label}
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-black mb-4 lg:mb-6 leading-tight text-white">
                            Selamat datang, <br className="hidden sm:block" />
                            <span className="italic underline decoration-white/30">{user.nama}!</span>
                        </h1>
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`text-2xl`}>{levelCfg.emoji}</span>
                            <div className={`px-3 py-1 rounded-full ${levelCfg.bg} border border-white/20 text-white text-xs font-black uppercase tracking-widest`}>
                                Level: {levelCfg.label}
                            </div>
                        </div>
                        <p className="text-white/80 font-light mb-8 lg:mb-10 leading-relaxed text-base lg:text-lg">
                            Materi yang ditampilkan sudah disesuaikan dengan <span className="font-bold text-white">jalur & level</span> pemahamanmu.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/roadmap" className="inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] lg:text-xs rounded-2xl hover:bg-white/90 transition-all shadow-xl">
                                <Map size={16} /> Lihat Roadmap
                            </Link>
                            <Link href="/kursus" className="inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-white/20 text-white font-black uppercase tracking-widest text-[10px] lg:text-xs rounded-2xl hover:bg-white/30 transition-all border border-white/30">
                                <BookOpen size={16} /> Semua Kursus
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Jalur Belajar',    val: jalurCfg.label,                      icon: JalurIcon,  color: jalurCfg.text,   bg: jalurCfg.bg   },
                        { label: 'Level Pemahaman',  val: `${levelCfg.emoji} ${levelCfg.label}`, icon: Target,     color: levelCfg.text,   bg: levelCfg.bg   },
                        { label: 'Total XP',         val: `${user.xp || 0} XP`,                 icon: Award,      color: 'text-secondary', bg: 'bg-secondary/10' },
                        { label: 'Streak Harian',    val: `${user.streak_harian || 0} Hari`,    icon: Zap,        color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                    ].map((s, i) => (
                        <div key={i} className="group relative glass-card p-6 lg:p-8 transition-all hover:bg-white/5 border-white/5 hover:border-white/10 overflow-hidden">
                            <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity`}>
                                <s.icon size={100} />
                            </div>
                            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                <s.icon size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 mb-1">{s.label}</p>
                            <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">{s.val}</h3>
                        </div>
                    ))}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Rekomendasi Kursus */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-end justify-between px-2">
                            <div>
                                <h2 className="text-2xl font-black mb-2">
                                    {kursus_rekomendasi?.length > 0 ? 'Kursus ' : 'Semua '}
                                    <span className={`${jalurCfg.text} italic`}>
                                        {kursus_rekomendasi?.length > 0 ? 'Untukmu' : 'Kursus'}
                                    </span>
                                </h2>
                                <p className="text-gray-600 text-sm font-light italic">
                                    {kursus_rekomendasi?.length > 0
                                        ? `Dipilih berdasarkan jalur ${jalurCfg.label} & level ${levelCfg.label}mu.`
                                        : 'Jelajahi semua materi yang tersedia.'}
                                </p>
                            </div>
                            <Link href="/kursus" className="text-secondary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                                Semua <ChevronRight size={14} />
                            </Link>
                        </div>

                        {displayKursus.length === 0 ? (
                            <div className="glass-card p-12 text-center border-white/5">
                                <BookOpen size={48} className="text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-500 font-light">Belum ada kursus tersedia untuk jalur dan level ini.</p>
                                <p className="text-gray-600 text-xs mt-2">Admin sedang menyiapkan materi untukmu.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {displayKursus.map((k) => (
                                    <Link 
                                        key={k.id} 
                                        href={`/kursus/${k.slug}`} 
                                        className="group relative glass-card p-0 overflow-hidden border-white/5 hover:border-primary/20 transition-all flex flex-col"
                                    >
                                        <div className="p-8 pb-2">
                                            <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner text-white/50 group-hover:text-secondary">
                                                {k.ikon}
                                            </div>
                                            {/* Level & Jalur badges */}
                                            <div className="flex gap-2 mb-3">
                                                {k.level_kesulitan && (
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${LEVEL_CONFIG[k.level_kesulitan]?.bg} ${LEVEL_CONFIG[k.level_kesulitan]?.text}`}>
                                                        {LEVEL_CONFIG[k.level_kesulitan]?.label}
                                                    </span>
                                                )}
                                                {k.jalur && k.jalur !== 'umum' && (
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${JALUR_CONFIG[k.jalur]?.bg} ${JALUR_CONFIG[k.jalur]?.text}`}>
                                                        {JALUR_CONFIG[k.jalur]?.label}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-3">{k.nama}</h3>
                                            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-light">{k.deskripsi}</p>
                                        </div>
                                        <div className="p-8 pt-6 mt-auto border-t border-white/5 flex items-center justify-between bg-white/2">
                                            <div className="flex items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> 5h</span>
                                                <span className="flex items-center gap-1.5"><Star size={12} className="text-secondary" /> 4.9</span>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-700 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Learning Progress */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-black mb-2 px-2">Learning <span className="text-yellow-500 italic">Progress</span></h2>
                        <div className="glass-card p-8 space-y-6 bg-gradient-to-b from-white/[0.03] to-transparent">
                            {/* Level progress visual */}
                            <div className={`p-5 rounded-2xl bg-gradient-to-br ${levelCfg.color} bg-opacity-10 border ${levelCfg.bg} border-white/10`}>
                                <p className="text-[10px] font-black uppercase tracking-[3px] text-white/60 mb-2">Level Saat Ini</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{levelCfg.emoji}</span>
                                    <div>
                                        <p className={`text-xl font-black bg-gradient-to-r ${levelCfg.color} bg-clip-text text-transparent`}>{levelCfg.label}</p>
                                        <p className="text-xs text-white/50">Berdasarkan hasil tes penjajakan</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { task: 'Selesaikan kursus pertama', reward: '+100 XP', done: false },
                                    { task: 'Belajar 7 hari berturut-turut', reward: '+200 XP', done: false },
                                    { task: 'Naik ke level berikutnya', reward: '🏆 Badge', done: false },
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-secondary transition-colors">
                                            <Rocket size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{t.task}</h4>
                                            <p className="text-[10px] font-black uppercase text-gray-600 tracking-wider">{t.reward}</p>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-primary transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/roadmap" className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest hover:from-primary/30 hover:to-secondary/30 transition-all">
                                <Map size={14} /> Lihat Roadmapku <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
