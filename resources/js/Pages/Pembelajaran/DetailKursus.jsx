import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Play, CheckCircle, Lock, ArrowLeft, Info, Bookmark } from 'lucide-react';

export default function DetailKursus({ kursus }) {
    return (
        <div className="min-h-screen bg-[#0B0E14] text-white">
            <Head title={kursus.nama} />
            
            {/* Header / Intro */}
            <header className="relative py-24 px-8 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full -z-10" />
                <div className="max-w-5xl mx-auto">
                    <Link href="/kursus" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Katalog
                    </Link>
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-4">
                        <div className="text-7xl bg-white/5 w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
                            {kursus.ikon}
                        </div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tight mb-4">{kursus.nama}</h1>
                            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">{kursus.deskripsi}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-8 py-20 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Curriculum */}
                    <div className="lg:col-span-2 space-y-12">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <Info size={24} className="text-secondary" /> Kurikulum Belajar
                        </h2>

                        <div className="space-y-12 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/5">
                            {kursus.modul.map((modul, i) => (
                                <div key={modul.id} className="relative pl-16">
                                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-[#0D1117] border-4 border-[#0B0E14] shadow-lg flex items-center justify-center font-black text-xs text-gray-600">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-6 text-gray-300">{modul.judul}</h3>
                                    <div className="space-y-3">
                                        {modul.materi.map((materi) => (
                                            <Link 
                                                key={materi.id} 
                                                href={`/kursus/${kursus.slug}/${materi.slug}`}
                                                className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary/30 hover:bg-white/10 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                                        <Play size={16} className={materi.tipe === 'latihan' ? 'text-accent' : 'text-secondary'} fill="currentColor" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm">{materi.judul}</h4>
                                                        <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">{materi.tipe === 'latihan' ? 'Tantangan Coding' : 'Materi Teks'}</span>
                                                    </div>
                                                </div>
                                                <div className="text-gray-700 group-hover:text-white transition-colors">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <div className="glass-card p-8 border-primary/20 bg-primary/5">
                                <h3 className="font-black mb-6 flex items-center gap-2">
                                    <Bookmark size={18} className="text-primary" /> Informasi Kursus
                                </h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li className="flex justify-between text-gray-500">
                                        <span>Level</span>
                                        <span className="text-white">Pemula</span>
                                    </li>
                                    <li className="flex justify-between text-gray-500">
                                        <span>Durasi</span>
                                        <span className="text-white">~5 Jam</span>
                                    </li>
                                    <li className="flex justify-between text-gray-500">
                                        <span>Bahasa</span>
                                        <span className="text-white">Indonesia</span>
                                    </li>
                                </ul>
                                <button className="w-full btn-premium py-4 mt-8">Mulai Belajar Sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function ChevronRight({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    )
}
