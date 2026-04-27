import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Play, Code2, Award, ArrowRight, Zap, Target, Sparkles, Brain, Compass, ShieldCheck } from 'lucide-react';
import Footer from '@/Components/Footer';
import NavbarPublik from '@/Components/NavbarPublik';

export default function Beranda({ auth }) {
    return (
        <div className="min-h-screen bg-[#05070A] text-white selection:bg-blue-500/30 font-outfit">
            <Head title="Code Genius - Master Coding with AI" />
            <NavbarPublik auth={auth} />

            {/* Hero Section */}
            <header className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                        <Sparkles size={14} className="text-blue-400" /> The Future of Learning
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
                        Kuasai Coding dengan <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            AI-Driven Roadmap
                        </span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        Platform pembelajaran terstruktur dengan evaluasi otomatis oleh AI Mentor. Dapatkan feedback seketika, lewati rintangan, dan capai keahlian developer sejati.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/daftar" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            Mulai Belajar Gratis
                        </Link>
                        <Link href="/explorasi" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/5 text-white font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-colors">
                            Lihat Kurikulum
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 border-t border-white/5 bg-[#080A0F]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Mengapa Memilih Kami?</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">Kami merancang pengalaman belajar mandiri yang tidak pernah membuat Anda merasa sendirian.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Personalized Roadmap', desc: 'Kurikulum menyesuaikan dengan tingkat pemahaman awal Anda (Beginner, Intermediate, Advanced).', icon: Compass, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { title: 'AI Code Review', desc: 'Tidak perlu menunggu mentor manusia. AI menganalisis setiap baris kode Anda secara instan dan akurat.', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                            { title: 'Tantangan Terstruktur', desc: 'Uji pemahaman Anda langsung di browser. Anda harus menyelesaikan tugas untuk membuka level selanjutnya.', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        ].map((f, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-[#0D1117] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center ${f.color} mb-6 group-hover:scale-110 transition-transform`}>
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Siap Membangun Karir Anda?</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Bergabunglah hari ini dan rasakan bagaimana AI mengubah cara Anda belajar coding menjadi jauh lebih cepat dan terukur.
                    </p>
                    <Link href="/daftar" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-black uppercase tracking-widest text-sm transition-colors shadow-lg shadow-blue-500/25">
                        Daftar Sekarang <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
