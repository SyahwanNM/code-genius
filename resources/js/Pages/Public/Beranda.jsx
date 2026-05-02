import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Sparkles, Compass, Brain, Target, Code2, Layers, CheckCircle2,
    Star, ArrowRight, Users, BookOpen, Award, TrendingUp, Zap,
    ChevronRight, Play, Globe, Monitor
} from 'lucide-react';
import Footer from '@/Components/Footer';
import NavbarPublik from '@/Components/NavbarPublik';

/* ─── DATA ───────────────────────────────────────────────── */

const STATS = [
    { value: '12,600+', label: 'Pelajar Aktif' },
    { value: '150+',    label: 'Materi Kursus' },
    { value: '98%',     label: 'Tingkat Kepuasan' },
    { value: '4.9/5',   label: 'Rating Platform' },
];

const FEATURES = [
    {
        icon: Compass,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        badge: 'Adaptif',
        title: 'Personalized Roadmap',
        desc: 'Kurikulum menyesuaikan dengan tingkat pemahaman awal Anda — Beginner, Intermediate, hingga Advanced — sehingga belajar terasa pas dan tidak membebani.',
    },
    {
        icon: Brain,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        badge: 'AI Review',
        title: 'AI Code Tinjauan',
        desc: 'Tidak perlu menunggu mentor manusia. AI menganalisis setiap baris kode Anda secara instan dan akurat, memberikan feedback yang kontekstual.',
    },
    {
        icon: Target,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        badge: 'Tantangan',
        title: 'Tantangan Terstruktur',
        desc: 'Uji pemahaman Anda langsung di browser. Selesaikan tantangan untuk membuka level berikutnya dan lacak progres secara real-time.',
    },
];

const PATHS = [
    {
        icon: Monitor,
        title: 'Frontend Developer',
        desc: 'Kuasai seni membangun antarmuka yang indah dan responsif.',
        techs: ['HTML', 'CSS', 'JavaScript', 'React'],
        gradient: 'from-blue-600/20 to-cyan-600/20',
        border: 'border-blue-500/30',
        accent: 'text-blue-400',
    },
    {
        icon: Globe,
        title: 'Backend Developer',
        desc: 'Bangun sistem server yang kuat, skalabel, dan aman.',
        techs: ['Node.js', 'PHP', 'Laravel', 'MySQL'],
        gradient: 'from-purple-600/20 to-pink-600/20',
        border: 'border-purple-500/30',
        accent: 'text-purple-400',
    },
];

const STEPS = [
    { title: 'Pilih Jalur Belajar',    desc: 'Tentukan track yang sesuai dengan tujuan kariermu — Frontend atau Backend.' },
    { title: 'Ikuti Materinya',         desc: 'Pelajari materi interaktif yang sudah dirancang oleh para ahli industri.' },
    { title: 'Selesaikan Roadmap',      desc: 'Kerjakan tantangan di setiap tahap dan dapatkan sertifikat penyelesaian.' },
    { title: 'Raih Karir Impian',       desc: 'Portofolio proyek nyata siap dipresentasikan ke recruiter top Indonesia.' },
];

const TESTIMONIALS = [
    {
        name: 'Andi Kurniawan',
        role: 'Frontend Dev @ Tokopedia',
        avatar: 'AK',
        rating: 5,
        text: 'Dalam 6 bulan saya berhasil mendapat pekerjaan impian! Roadmap-nya sangat terstruktur dan AI Mentor benar-benar membantu debug kode saya.',
    },
    {
        name: 'Siti Rahayu',
        role: 'Full-Stack Engineer',
        avatar: 'SR',
        rating: 5,
        text: 'Saya sudah coba berbagai platform belajar coding, tapi Code Genius paling komprehensif. Feedback AI-nya seperti punya mentor pribadi 24/7.',
    },
    {
        name: 'Budi Santoso',
        role: 'Junior Dev @ Startup',
        avatar: 'BS',
        rating: 5,
        text: 'Dari nol sampai bisa bikin web app sendiri! Materi yang ada sangat praktis dan tidak membosankan. Highly recommended untuk pemula!',
    },
];

/* ─── HELPERS ────────────────────────────────────────────── */

function StarRating({ count = 5 }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
            ))}
        </div>
    );
}

/* ─── COMPONENT ──────────────────────────────────────────── */

export default function Beranda({ auth, kursus_populer }) {
    return (
        <div className="min-h-screen bg-[#08090D] text-white font-outfit selection:bg-yellow-400/20">
            <Head title="Code Genius — Kuasai Coding dengan AI-Driven Roadmap" />
            <NavbarPublik auth={auth} />

            {/* ══════════════════════════════════════
                HERO
            ══════════════════════════════════════ */}
            <header className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-0 overflow-hidden">
                {/* Background glows */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 blur-[160px] rounded-full" />
                    <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
                </div>

                {/* Subtle dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-8">
                        <Sparkles size={12} />
                        Platform Belajar Coding karya Anak Bangsa
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
                        Kuasai Coding dengan
                        <br className="hidden md:block" />
                        {' '}<span className="text-yellow-400">AI-Driven</span>{' '}
                        <span className="text-white">Roadmap</span>
                    </h1>

                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                        Dari nol hingga siap kerja dalam hitungan bulan. Belajar mandiri dengan kurikulum
                        berbasis AI yang menyesuaikan kecepatan dan kemampuan Anda secara personal.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                        <Link
                            href="/daftar"
                            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-yellow-400 text-black font-black text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.35)]"
                        >
                            Mulai Belajar Gratis
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/explorasi"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
                        >
                            <Play size={13} className="fill-white" />
                            Lihat Kurikulum
                        </Link>
                    </div>
                </div>
            </header>

            {/* ══════════════════════════════════════
                FEATURES — Belajar Lebih Cerdas dengan AI
            ══════════════════════════════════════ */}
            <section className="py-28 bg-[#0A0C11] border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <Zap size={11} className="text-yellow-400" /> Fitur Unggulan
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                            Belajar Lebih Cerdas <span className="text-yellow-400">dengan AI</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                            Tiga pilar utama yang menjadikan Code Genius berbeda dari platform lain —
                            dirancang untuk hasil nyata, bukan sekadar teori.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {FEATURES.map((f, i) => (
                            <div
                                key={i}
                                className="relative p-7 rounded-2xl bg-[#0F1118] border border-white/5 hover:border-yellow-400/20 transition-all group overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start justify-between mb-5">
                                    <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform`}>
                                        <f.icon size={22} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 text-gray-500">
                                        {f.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                POPULAR COURSES — Kursus Paling Diminati
            ══════════════════════════════════════ */}
            <section id="jalur-belajar" className="py-28 bg-[#08090D]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                            <Layers size={11} /> Kursus Terpopuler
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                            Mulai <span className="text-amber-500">Petualangan Kodemu</span>
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                            Pilih dari berbagai kursus yang dirancang khusus untuk membawa Anda dari tingkat pemula hingga siap kerja.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {kursus_populer?.map((k, i) => (
                            <div
                                key={k.id}
                                className="group relative bg-[#0D1117] border border-white/5 rounded-[32px] overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5"
                            >
                                {/* Course Image Placeholder / Visual */}
                                <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Code2 size={48} className="text-white/20 group-hover:text-amber-500/40 transition-colors duration-500" />
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                            {k.level_kesulitan || 'Beginner'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-500 transition-colors">{k.nama}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                                        {k.deskripsi || 'Kuasai fundamental dan kembangkan proyek nyata dengan kurikulum terstruktur.'}
                                    </p>

                                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Layers size={14} className="text-amber-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{k.materi_count || 0} Materi</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-blue-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Aktif</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={auth.pengguna ? `/kursus/${k.slug || k.id}` : '/daftar'}
                                    className="mt-auto block w-full py-5 bg-white/[0.02] border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[3px] text-gray-500 group-hover:bg-amber-500 group-hover:text-black transition-all"
                                >
                                    Lihat Detail Kursus
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/explorasi"
                            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-amber-500 transition-colors"
                        >
                            Lihat Semua Koleksi Kursus <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                HOW IT WORKS — Dari Nol ke Developer dalam 6 Bulan
            ══════════════════════════════════════ */}
            <section className="py-28 bg-[#0A0C11]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left — text */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <TrendingUp size={11} className="text-yellow-400" /> Proses Belajar
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                                Dari Nol ke Developer<br />
                                <span className="text-yellow-400">dalam 6 Bulan</span>
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-10">
                                Ikuti 4 tahap sederhana yang telah terbukti mengantarkan ribuan pelajar meraih
                                pekerjaan impian di perusahaan teknologi ternama.
                            </p>

                            <div className="space-y-5">
                                {STEPS.map((step, i) => (
                                    <div key={i} className="flex items-start gap-5 group">
                                        <div className="mt-0.5 w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                                            <span className="text-yellow-400 font-black text-sm">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm mb-1">{step.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/daftar"
                                className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-yellow-400 text-black font-black text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.25)]"
                            >
                                Mulai Sekarang <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Right — visual orb */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 blur-3xl rounded-3xl" />
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                                <div className="absolute inset-0 flex items-center justify-center p-10">
                                    <div className="relative w-full h-full">
                                        {/* Spinning rings */}
                                        <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]" />
                                        <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                                        <div className="absolute inset-8 rounded-full border border-cyan-500/20 animate-[spin_10s_linear_infinite]" />

                                        {/* Center glow */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-2xl opacity-60" />
                                        </div>

                                        {/* Center text */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <Code2 size={48} className="text-white/80 mx-auto mb-2" />
                                                <span className="text-white font-black text-2xl">6 Bulan</span>
                                                <p className="text-blue-300 text-xs mt-1">Jadi Developer</p>
                                            </div>
                                        </div>

                                        {/* Floating tech badges */}
                                        {[
                                            { label: 'HTML',  top: '8%',  left: '4%',  cls: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
                                            { label: 'CSS',   top: '8%',  right: '4%', cls: 'bg-blue-500/20   text-blue-400   border-blue-500/30'   },
                                            { label: 'JS',    bottom: '18%', left: '4%',  cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
                                            { label: 'React', bottom: '18%', right: '4%', cls: 'bg-cyan-500/20  text-cyan-400   border-cyan-500/30'   },
                                        ].map((b, i) => (
                                            <div
                                                key={i}
                                                style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }}
                                                className={`absolute px-3 py-1.5 rounded-full border text-xs font-black ${b.cls}`}
                                            >
                                                {b.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                TESTIMONIALS — Kata Mereka yang Sudah Berhasil
            ══════════════════════════════════════ */}
            <section className="py-28 bg-[#08090D]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <Users size={11} className="text-yellow-400" /> Testimoni
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                            Kata Mereka yang <span className="text-yellow-400">Sudah Berhasil</span>
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto text-sm">
                            Bergabunglah dengan ribuan developer yang telah membuktikan efektivitas platform kami.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <div
                                key={i}
                                className="p-7 rounded-2xl bg-[#0F1118] border border-white/5 hover:border-yellow-400/20 transition-all flex flex-col"
                            >
                                <StarRating count={t.rating} />
                                <p className="text-gray-400 text-sm leading-relaxed my-5 flex-1">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-xs flex-shrink-0">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">{t.name}</div>
                                        <div className="text-gray-600 text-xs">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                CTA — Siap Menjadi Developer Handal?
            ══════════════════════════════════════ */}
            <section className="py-28 bg-[#0A0C11]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#13151D] to-[#0F1018] border border-white/10 overflow-hidden">
                        {/* Top glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles size={11} /> Mulai Perjalananmu
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">
                                Siap Menjadi{' '}
                                <span className="text-yellow-400">Developer Handal?</span>
                            </h2>

                            <p className="text-gray-500 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
                                Daftarkan diri sekarang dan mulai perjalanan belajar yang dipersonalisasi
                                oleh AI. Gratis untuk dimulai, tanpa perlu kartu kredit.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/daftar"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-yellow-400 text-black font-black text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.3)]"
                                >
                                    Daftar Sekarang Gratis
                                </Link>
                                <Link
                                    href="/explorasi"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
                                >
                                    Lihat Semua Kursus <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
