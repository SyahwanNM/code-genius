import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Target, Users, BookOpen, Star, ArrowRight, Zap } from 'lucide-react';
import Footer from '@/Components/Footer';
import NavbarPublik from '@/Components/NavbarPublik';

export default function TentangKami({ auth }) {
    return (
        <div className="min-h-screen bg-[#0B0E14] text-white">
            <Head title="Tentang Kami - Visi Code Genius" />
            
            <NavbarPublik auth={auth} />

            {/* Hero Section */}
            <header className="pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[120px] rounded-full translate-x-[-10%] translate-y-[-20%]" />
                <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Mencetak Generasi <br /><span className="text-secondary italic">Digital Global</span></h1>
                    <p className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Code Genius lahir dari keresahan akan sulitnya belajar pemrograman secara mandiri. Kami membangun ekosistem yang menggabungkan Kurikulum Expert dengan bantuan AI Mentor 24/7.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-20 divide-y divide-white/5">
                {/* Mission Section */}
                <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-primary/20 text-secondary flex items-center justify-center mb-8">
                            <Target size={24} />
                        </div>
                        <h2 className="text-3xl font-black mb-6">Misi Kami</h2>
                        <p className="text-gray-400 font-light leading-relaxed mb-6 italic">
                            "Mendemokratisasi pendidikan teknologi tingkat tinggi agar bisa diakses oleh siapa saja, di mana saja, tanpa hambatan biaya yang mencekik."
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Membangun platform belajar yang interaktif dan menyenangkan.',
                                'Menyediakan asisten AI khusus sebagai mentor pribadi 24/7.',
                                'Membentuk komunitas developer yang saling mendukung.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="glass-card aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <Zap size={150} className="text-white/20 animate-pulse" />
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24">
                    <h2 className="text-3xl font-black mb-16 text-center">Kenapa Kami Berbeda?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Project First', desc: 'Kami fokus pada pembuatan proyek nyata, bukan sekadar teori membosankan.', icon: BookOpen },
                            { title: 'Community Driven', desc: 'Belajar bersama ribuan talenta berbakat lainnya dari seluruh Indonesia.', icon: Users },
                            { title: 'Expert Standards', desc: 'Materi yang kami susun selalu menyesuaikan dengan standar industri global.', icon: Star },
                        ].map((v, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform text-primary group-hover:text-secondary">
                                    <v.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="py-32 text-center">
                    <h2 className="text-4xl font-black mb-8">Siap Memulai Perjalananmu?</h2>
                    <Link href="/daftar" className="px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-3">
                        Daftar Code Genius Sekarang <ArrowRight size={20} />
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
