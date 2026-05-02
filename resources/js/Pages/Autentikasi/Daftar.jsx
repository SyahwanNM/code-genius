import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Daftar() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        email: '',
        kata_sandi: '',
        kata_sandi_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/daftar');
    };

    return (
        <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Daftar Akun" />
            
            {/* Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full" />

            <div className="w-full max-w-md relative z-10">
                <div className="glass-card p-10 border-white/5">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block mb-6 group">
                            <img 
                                src="/images/logo_darkmode.svg" 
                                alt="Code Genius" 
                                className="h-14 mx-auto group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                            />
                        </Link>
                        <h1 className="text-3xl font-black mb-2 text-white text-center">Buat Akun</h1>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[3px] text-center">Bergabung dengan Masa Depan</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500">Nama Lengkap</label>
                            <input
                                type="text"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                placeholder="Masukkan nama Anda"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                            />
                            {errors.nama && <p className="text-amber-500 text-[10px] font-bold">{errors.nama}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500">Alamat Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                placeholder="name@example.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-amber-500 text-[10px] font-bold">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500">Kata Sandi</label>
                            <input
                                type="password"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                placeholder="••••••••"
                                value={data.kata_sandi}
                                onChange={(e) => setData('kata_sandi', e.target.value)}
                            />
                            {errors.kata_sandi && <p className="text-amber-500 text-[10px] font-bold">{errors.kata_sandi}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500">Konfirmasi Sandi</label>
                            <input
                                type="password"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                placeholder="••••••••"
                                value={data.kata_sandi_confirmation}
                                onChange={(e) => setData('kata_sandi_confirmation', e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary transition-all shadow-2xl shadow-primary/10 active:scale-95 disabled:opacity-50 mt-4"
                        >
                            {processing ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        Sudah punya akun?{' '}
                        <Link href="/masuk" className="text-primary hover:text-secondary transition-colors font-black">Masuk di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
