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
                        <h1 className="text-3xl font-bold mb-2">Buat Akun Baru</h1>
                        <p className="text-gray-400">Bergabunglah dengan ribuan pelajar lainnya.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                                placeholder="Masukkan nama Anda"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                            />
                            {errors.nama && <p className="text-red-400 text-xs mt-1">{errors.nama}</p>}
                        </div>

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
                            <label className="block text-sm font-medium text-gray-300 mb-2">Kata Sandi</label>
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                                placeholder="••••••••"
                                value={data.kata_sandi}
                                onChange={(e) => setData('kata_sandi', e.target.value)}
                            />
                            {errors.kata_sandi && <p className="text-red-400 text-xs mt-1">{errors.kata_sandi}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Kata Sandi</label>
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                                placeholder="••••••••"
                                value={data.kata_sandi_confirmation}
                                onChange={(e) => setData('kata_sandi_confirmation', e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full btn-premium py-4"
                        >
                            {processing ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-400 text-sm">
                        Sudah punya akun?{' '}
                        <Link href="/masuk" className="text-secondary hover:underline font-medium">Masuk di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
