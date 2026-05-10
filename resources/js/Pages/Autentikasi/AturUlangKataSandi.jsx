import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

export default function AturUlangKataSandi({ email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        otp: '',
        email: email || '',
        kata_sandi: '',
        kata_sandi_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/atur-ulang-password', {
            onFinish: () => reset('kata_sandi', 'kata_sandi_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-[#08090D] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
            <Head title="Atur Ulang Password — Code Genius" />

            {/* Background glows */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 blur-[140px] rounded-full" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-600/8 blur-[110px] rounded-full" />
            </div>

            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#0F1118] border border-white/5 rounded-2xl p-10 shadow-2xl shadow-black/40">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block mb-6 group">
                            <img
                                src="/images/logo_darkmode.svg"
                                alt="Code Genius"
                                className="h-12 mx-auto group-hover:scale-105 transition-transform drop-shadow-[0_0_20px_rgba(250,204,21,0.25)]"
                            />
                        </Link>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Sparkles size={10} />
                            Reset Password
                        </div>

                        <h1 className="text-3xl font-black text-white tracking-tight">Buat Password Baru</h1>
                        <p className="text-gray-500 text-xs mt-2">Silakan masukkan password baru Anda</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Email (Hidden or Readonly) */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500">
                                Email Anda
                            </label>
                            <div className="relative group">
                                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                <input
                                    type="email"
                                    className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all text-sm text-white/50 cursor-not-allowed"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    readOnly
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-[10px] font-bold">{errors.email}</p>}
                        </div>

                        {/* OTP */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Kode OTP (6 Digit)</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    maxLength="6"
                                    className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3.5 text-center focus:border-yellow-400/50 focus:bg-yellow-400/[0.02] focus:ring-0 outline-none transition-all text-xl tracking-[5px] font-black text-yellow-400 placeholder-gray-700 uppercase"
                                    placeholder="------"
                                    value={data.otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        setData('otp', val);
                                    }}
                                    autoFocus
                                    required
                                />
                            </div>
                            {errors.otp && <p className="text-red-400 text-center text-[10px] font-bold">{errors.otp}</p>}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Password Baru</label>
                            <div className="relative group">
                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-400 transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-11 pr-4 py-3.5 focus:border-yellow-400/50 focus:bg-yellow-400/[0.02] focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                    placeholder="••••••••"
                                    value={data.kata_sandi}
                                    onChange={(e) => setData('kata_sandi', e.target.value)}
                                    required
                                />
                            </div>
                            {!errors.kata_sandi && <p className="text-gray-500 text-[10px] mt-1 ml-1">Minimal 8 karakter.</p>}
                            {errors.kata_sandi && <p className="text-red-400 text-[10px] font-bold">{errors.kata_sandi}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Konfirmasi Password</label>
                            <div className="relative group">
                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-400 transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-11 pr-4 py-3.5 focus:border-yellow-400/50 focus:bg-yellow-400/[0.02] focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-700"
                                    placeholder="••••••••"
                                    value={data.kata_sandi_confirmation}
                                    onChange={(e) => setData('kata_sandi_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.kata_sandi_confirmation && <p className="text-red-400 text-[10px] font-bold">{errors.kata_sandi_confirmation}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing || data.otp.length !== 6}
                            className="group w-full flex items-center justify-center gap-2 py-3.5 bg-yellow-400 text-black font-black text-sm uppercase tracking-wider rounded-xl hover:bg-yellow-300 transition-all duration-200 shadow-[0_0_30px_rgba(250,204,21,0.25)] hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {processing ? 'Menyimpan...' : (
                                <>
                                    Simpan Password Baru
                                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
