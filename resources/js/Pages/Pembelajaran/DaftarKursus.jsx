import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Book, ChevronRight, Clock, Search } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import NavbarPublik from '@/Components/NavbarPublik';

export default function DaftarKursus({ auth, semua_kursus }) {
    const isPublic = !auth.pengguna;

    const Content = (
        <div className={`max-w-7xl mx-auto px-8 ${isPublic ? 'py-32' : 'py-12'}`}>
            <header className="mb-16">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Book size={24} />
                    <span className="text-[10px] font-black uppercase tracking-[4px]">Course Catalog</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black mb-6">Pilih Jalur <span className="text-secondary italic">Keahlianmu</span></h1>
                <p className="text-gray-500 max-w-2xl font-light leading-relaxed">
                    Mulai perjalanan karir Anda sebagai pengembang profesional dengan kurikulum yang dirancang khusus untuk kebutuhan industri.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {semua_kursus.map((k) => (
                    <Link 
                        key={k.id} 
                        href={`/kursus/${k.slug}`} 
                        className="group relative glass-card p-0 overflow-hidden hover:border-secondary/30 transition-all flex flex-col h-full"
                    >
                        <div className="p-8 pb-4">
                            <div className="text-4xl mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-inner">
                                {k.ikon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">{k.nama}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light italic line-clamp-3">
                                {k.deskripsi}
                            </p>
                            
                            <div className="flex items-center gap-6 text-xs text-gray-600 font-bold uppercase tracking-widest mb-6">
                                <div className="flex items-center gap-1.5 font-black"><Book size={14} className="text-primary" /> {k.modul_count} Modul</div>
                                <div className="flex items-center gap-1.5 font-black"><Clock size={14} className="text-secondary" /> {k.modul_count * 2} Jam</div>
                            </div>
                        </div>
                        
                        <div className="mt-auto border-t border-white/5 p-6 flex items-center justify-between bg-white/2 group-hover:bg-white/5 transition-colors">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                {isPublic ? 'Daftar untuk Belajar' : 'Lanjutkan Belajar'}
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

    if (isPublic) {
        return (
            <div className="min-h-screen bg-[#0B0E14] text-white">
                <Head title="Katalog Kursus - Code Genius" />
                <NavbarPublik auth={auth} />
                {Content}
            </div>
        );
    }

    return (
        <UserLayout auth={auth}>
            <Head title="Katalog Kursus - Code Genius" />
            {Content}
        </UserLayout>
    );
}
