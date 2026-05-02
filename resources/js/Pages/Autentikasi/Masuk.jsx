import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Masuk() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        kata_sandi: '',
        ingat_saya: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/masuk');
    };

    return (
        <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Masuk" />
            
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
                        <h1 className="text-3xl font-black mb-2 text-white">Selamat Datang</h1>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Portal Pembelajaran Masa Depan</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500">Alamat Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                placeholder="nama@email.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-amber-500 text-[10px] font-bold">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Kata Sandi</label>
                                <Link href="#" className="text-[10px] font-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest">Lupa Password?</Link>
                            </div>
                            <input
                                type="password"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                placeholder="••••••••"
                                value={data.kata_sandi}
                                onChange={(e) => setData('kata_sandi', e.target.value)}
                            />
                            {errors.kata_sandi && <p className="text-amber-500 text-[10px] font-bold">{errors.kata_sandi}</p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only"
                                        checked={data.ingat_saya}
                                        onChange={e => setData('ingat_saya', e.target.checked)}
                                    />
                                    <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${data.ingat_saya ? 'bg-primary' : 'bg-white/10'}`} />
                                    <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow transition-transform ${data.ingat_saya ? 'translate-x-5' : ''}`} />
                                </div>
                                <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">Ingat Saya</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary transition-all shadow-2xl shadow-primary/10 active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Otentikasi...' : 'Masuk Sekarang'}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        Belum punya akun?{' '}
                        <Link href="/daftar" className="text-primary hover:text-secondary transition-colors font-black">Daftar sekarang</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
