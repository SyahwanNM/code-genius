import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { MessageSquare, ShieldCheck, Zap, Clock, Star, Search, ArrowRight } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Mentor({ auth }) {
    const [search, setSearch] = useState('');

    const mentors = [
        { nama: 'Budi Santoso', spesialis: 'Frontend Expert (React/Next.js)', rating: 4.9, review: 120, harga: 'Rp 50rb', ava: 'BS', tags: ['React', 'Next.js', 'CSS'] },
        { nama: 'Siti Aminah', spesialis: 'Backend Guru (Laravel/Node.js)', rating: 5.0, review: 85, harga: 'Rp 75rb', ava: 'SA', tags: ['Laravel', 'PHP', 'MySQL'] },
        { nama: 'Rian Wijaya', spesialis: 'Fullstack Developer', rating: 4.8, review: 210, harga: 'Rp 60rb', ava: 'RW', tags: ['Vue.js', 'Node.js', 'PostgreSQL'] },
    ];

    const filtered = mentors.filter(m =>
        m.nama.toLowerCase().includes(search.toLowerCase()) ||
        m.spesialis.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <UserLayout auth={auth}>
            <Head title="1-on-1 Mentorship - Code Genius" />

            <div className="px-6 lg:px-12 py-12 space-y-12">
                {/* Header */}
                <header>
                    <div className="flex items-center gap-3 text-secondary mb-4">
                        <MessageSquare size={22} />
                        <span className="text-[10px] font-black uppercase tracking-[4px]">Live Mentorship</span>
                    </div>
                    <h1 className="text-4xl font-black mb-4">1-on-1 <span className="text-primary italic">Debugging</span> Session</h1>
                    <p className="text-gray-500 max-w-2xl font-light leading-relaxed">
                        Stuck di satu bug selama berjam-jam? Selesaikan masalah coding Anda dalam menit bersama mentor berpengalaman.
                    </p>
                </header>

                {/* Search */}
                <div className="relative max-w-xl">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Cari mentor berdasarkan teknologi (React, Laravel...)"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-primary transition-all font-light text-sm"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Mentor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filtered.map((m, i) => (
                        <div key={i} className="glass-card p-0 overflow-hidden group hover:border-primary/30 transition-all flex flex-col bg-white/[0.02]">
                            <div className="p-8">
                                <div className="flex items-start gap-5 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20 shrink-0">
                                        {m.ava}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black group-hover:text-secondary transition-colors mb-1">{m.nama}</h3>
                                        <p className="text-sm text-gray-500 font-light">{m.spesialis}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm mb-6">
                                    <div className="flex items-center gap-1.5 text-yellow-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="font-black text-white">{m.rating}</span>
                                        <span className="text-xs text-gray-600 font-light">({m.review} sesi)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-green-500 text-xs">
                                        <ShieldCheck size={14} /> Terverifikasi
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {m.tags.map((t, j) => (
                                        <span key={j} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-wider text-gray-400">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Clock size={12} className="text-secondary" /> Rata-rata respon 15 menit
                                </div>
                            </div>

                            <div className="mt-auto p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Mulai dari</p>
                                    <p className="text-xl font-black">{m.harga}<span className="text-xs text-gray-500 font-normal">/sesi</span></p>
                                </div>
                                <button className="px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
                                    Book Sesi
                                </button>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-600">
                            <p className="font-bold">Tidak ada mentor yang cocok dengan "{search}"</p>
                        </div>
                    )}
                </div>

                {/* CTA Daftar Mentor */}
                <div className="glass-card p-10 lg:p-14 bg-gradient-to-r from-primary/10 to-secondary/5 border-primary/20 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-black mb-3">Punya keahlian coding? <span className="text-primary italic">Jadilah Mentor!</span></h2>
                        <p className="text-gray-400 font-light max-w-lg">Bantu para siswa belajar lebih cepat sekaligus tambah penghasilan. Daftar sekarang dan mulai terima booking sesi.</p>
                    </div>
                    <Link
                        href="/mentor/daftar"
                        className="shrink-0 flex items-center gap-3 px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                    >
                        Daftar Sebagai Mentor <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </UserLayout>
    );
}
