import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Target, Users, BookOpen, Star, ArrowRight, Zap, Sparkles } from 'lucide-react';
import Footer from '@/Components/Footer';
import NavbarPublik from '@/Components/NavbarPublik';

export default function TentangKami({ auth }) {
    return (
        <div className="min-h-screen bg-[#08090D] text-white font-outfit selection:bg-yellow-400/20">
            <Head title="Tentang Kami - Visi Code Genius" />

            <NavbarPublik auth={auth} />

            {/* ══════════════════════════════════════
                HERO
            ══════════════════════════════════════ */}
            <header className="relative pt-40 pb-28 overflow-hidden flex items-center justify-center min-h-[60vh]">
                {/* Glow blobs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-yellow-400/5 blur-[160px] rounded-full" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full" />
                </div>

                {/* Dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-8">
                        <Sparkles size={12} />
                        Tentang Kami
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
                        Mencetak Generasi <br />
                        <span className="text-yellow-400 italic">Digital Global</span>
                    </h1>

                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Code Genius lahir dari keresahan akan sulitnya belajar pemrograman secara mandiri.
                        Kami membangun ekosistem yang menggabungkan Kurikulum Expert dengan bantuan AI Mentor 24/7.
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-8">

                {/* ══════════════════════════════════════
                    MISSION SECTION
                ══════════════════════════════════════ */}
                <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-white/5">
                    {/* Left — text */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Target size={11} className="text-yellow-400" /> Misi Kami
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Misi Kami</h2>

                        <p className="text-gray-400 font-light leading-relaxed mb-8 italic border-l-2 border-yellow-400/40 pl-4">
                            "Mendemokratisasi pendidikan teknologi tingkat tinggi agar bisa diakses oleh siapa saja,
                            di mana saja, tanpa hambatan biaya yang mencekik."
                        </p>

                        <ul className="space-y-4">
                            {[
                                'Membangun platform belajar yang interaktif dan menyenangkan.',
                                'Menyediakan asisten AI khusus sebagai mentor pribadi 24/7.',
                                'Membentuk komunitas developer yang saling mendukung.',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                    <div className="w-5 h-5 rounded-full bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — visual */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-600/20 blur-3xl rounded-3xl" />
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square bg-gradient-to-br from-yellow-900/20 to-blue-900/20 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-2xl" />
                            </div>
                            <Zap size={120} className="text-yellow-400/25 relative z-10 animate-pulse" />
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    VALUES SECTION
                ══════════════════════════════════════ */}
                <section className="py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <Star size={11} className="text-yellow-400" /> Nilai Kami
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                            Kenapa Kami <span className="text-yellow-400">Berbeda?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Project First',      desc: 'Kami fokus pada pembuatan proyek nyata, bukan sekadar teori membosankan.',            icon: BookOpen, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                            { title: 'Community Driven',   desc: 'Belajar bersama ribuan talenta berbakat lainnya dari seluruh Indonesia.',             icon: Users,    color: 'text-blue-400',   bg: 'bg-blue-400/10'   },
                            { title: 'Expert Standards',   desc: 'Materi yang kami susun selalu menyesuaikan dengan standar industri global.',           icon: Star,     color: 'text-emerald-400',bg: 'bg-emerald-400/10'},
                        ].map((v, i) => (
                            <div
                                key={i}
                                className="relative p-8 rounded-2xl bg-[#0F1118] border border-white/5 hover:border-yellow-400/20 transition-all group overflow-hidden text-center"
                            >
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={`w-16 h-16 rounded-2xl ${v.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${v.color}`}>
                                    <v.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{v.title}</h3>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    CTA SECTION
                ══════════════════════════════════════ */}
                <section className="py-24 border-t border-white/5">
                    <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#13151D] to-[#0F1018] border border-white/10 overflow-hidden text-center">
                        {/* Top glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles size={11} /> Mulai Sekarang
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">
                                Siap Memulai <span className="text-yellow-400">Perjalananmu?</span>
                            </h2>

                            <Link
                                href="/daftar"
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-yellow-400 text-black font-black uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.3)]"
                            >
                                Daftar Code Genius Sekarang <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
