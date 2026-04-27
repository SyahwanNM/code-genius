import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Masuk() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        kata_sandi: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/masuk');
    };

    return (
        <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Masuk" />
            
            {/* Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />

            <div className="w-full max-w-md relative z-10">
                <div className="glass-card p-10">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CG</span>
                            </div>
                            <span className="text-xl font-bold">Code Genius</span>
                        </Link>
                        <h1 className="text-3xl font-bold mb-2">Selamat Datang</h1>
                        <p className="text-gray-400">Masuk untuk melanjutkan pembelajaran Anda.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Alamat Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                                placeholder="name@example.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-300">Kata Sandi</label>
                                <Link href="#" className="text-xs text-secondary hover:underline">Lupa kata sandi?</Link>
                            </div>
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                                placeholder="••••••••"
                                value={data.kata_sandi}
                                onChange={(e) => setData('kata_sandi', e.target.value)}
                            />
                            {errors.kata_sandi && <p className="text-red-400 text-xs mt-1">{errors.kata_sandi}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full btn-premium py-4"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-400 text-sm">
                        Belum punya akun?{' '}
                        <Link href="/daftar" className="text-secondary hover:underline font-medium">Daftar sekarang</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
