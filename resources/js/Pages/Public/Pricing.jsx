import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Check, Zap, Rocket, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import Footer from '@/Components/Footer';
import NavbarPublik from '@/Components/NavbarPublik';

export default function Pricing({ auth }) {
    const plans = [
        {
            name: 'Free Starter',
            price: 'Rp 0',
            desc: 'Pilihan tepat untuk mulai belajar dasar-dasar pemrograman.',
            icon: Rocket,
            color: 'from-gray-500 to-gray-400',
            features: ['Akses 5 Kursus Dasar', 'Editor Kode Standar', 'Progress Tracking Dasar', 'Komunitas Showcase'],
            popular: false
        },
        {
            name: 'Premium Pro',
            price: 'Rp 99rb',
            period: '/bulan',
            desc: 'Akses penuh ke seluruh ekosistem Code Genius tanpa batas.',
            icon: Zap,
            color: 'from-primary to-secondary',
            features: [
                'Semua Kursus (Basic to Advanced)',
                'AI Mentor 24/7 (Gemini Powered)',
                '1-on-1 Debugging Sessions',
                'Sertifikat Kelulusan Resmi',
                'Prioritas Support',
                'Hapus Iklan (Coming Soon)'
            ],
            popular: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white">
            <Head title="Paket Premium - Investasi Skill Masa Depan" />
            
            <NavbarPublik auth={auth} />

            <header className="pt-32 pb-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
                <div className="max-w-3xl mx-auto px-8 relative z-10">
                    <h1 className="text-5xl font-black leading-tight">Pilih Jalur <span className="text-accent">Kesuksesanmu</span></h1>
                    <p className="text-gray-500 text-lg font-light">Investasi terbaik adalah investasi pada dirimu sendiri. Mulai belajar hari ini.</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative group glass-card p-12 transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10' : 'border-white/5'}`}>
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest">
                                    Paling Populer
                                </div>
                            )}
                            
                            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-8 shadow-lg`}>
                                <plan.icon size={32} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                            <div className="flex items-end gap-1 mb-6">
                                <span className="text-4xl font-black">{plan.price}</span>
                                <span className="text-gray-500 mb-1">{plan.period}</span>
                            </div>
                            <p className="text-gray-500 text-sm font-light mb-10 leading-relaxed">
                                {plan.desc}
                            </p>

                            <ul className="space-y-4 mb-12">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary/20 text-secondary' : 'bg-white/5 text-gray-600'}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                href="/daftar"
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20' : 'bg-white/5 text-white hover:bg-white/10'}`}
                            >
                                Mulai Sekarang <ArrowRight size={18} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="mt-32 pt-20 border-t border-white/5 text-center">
                    <h4 className="text-sm font-black text-gray-500 uppercase tracking-[4px] mb-12">Dilengkapi Dengan Keamanan</h4>
                    <div className="flex flex-wrap justify-center gap-12 text-gray-600">
                        <div className="flex items-center gap-2"><ShieldCheck size={20} /> Pembayaran Aman</div>
                        <div className="flex items-center gap-2"><Star size={20} /> Mentor Expert</div>
                        <div className="flex items-center gap-2"><Zap size={20} /> Akses Selamanya</div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
