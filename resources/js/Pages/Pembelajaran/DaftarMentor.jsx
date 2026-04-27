import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Star, Zap, CheckCircle2, ArrowLeft, User, Link as LinkIcon, FileText } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import axios from 'axios';

export default function DaftarMentor({ auth }) {
    const [form, setForm] = useState({ motivasi: '', portofolio: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.motivasi.trim()) { setError('Motivasi tidak boleh kosong.'); return; }
        setLoading(true);
        setError('');
        try {
            await axios.post('/mentor/ajukan', form);
            setSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserLayout auth={auth}>
            <Head title="Daftar Menjadi Mentor - Code Genius" />

            <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
                {submitted ? (
                    <div className="text-center py-20 glass-card p-16 bg-white/[0.02]">
                        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="text-green-500" size={40} />
                        </div>
                        <h2 className="text-3xl font-black mb-4">Pengajuan Terkirim!</h2>
                        <p className="text-gray-400 font-light leading-relaxed max-w-sm mx-auto">
                            Tim Code Genius akan meninjau profil dan motivasi Anda. Jika disetujui, akun Anda akan otomatis diupgrade menjadi <span className="text-secondary font-bold">Mentor</span>.
                        </p>
                        <p className="mt-6 text-[10px] font-black uppercase tracking-[3px] text-gray-700">
                            Estimasi waktu review: 1-3 hari kerja
                        </p>
                    </div>
                ) : (
                    <>
                        <header className="mb-12">
                            <div className="flex items-center gap-3 text-secondary mb-4">
                                <Star size={22} fill="currentColor" />
                                <span className="text-[10px] font-black uppercase tracking-[4px]">Mentor Program</span>
                            </div>
                            <h1 className="text-4xl font-black mb-4">Apply as a <span className="text-primary italic">Mentor</span></h1>
                            <p className="text-gray-500 font-light leading-relaxed">
                                Bagikan keahlian Anda dan bantu ribuan siswa belajar lebih cepat. Isi form berikut dan tim kami akan meninjau pengajuan Anda.
                            </p>
                        </header>

                        {/* Benefits */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {[
                                { icon: Zap, text: 'Penghasilan Tambahan', color: 'text-yellow-500' },
                                { icon: Star, text: 'Bangun Reputasi', color: 'text-secondary' },
                                { icon: User, text: 'Akses Eksklusif', color: 'text-primary' },
                            ].map((b, i) => (
                                <div key={i} className="glass-card p-5 bg-white/[0.02] border-white/5 flex flex-col items-center text-center gap-3">
                                    <b.icon size={22} className={b.color} />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{b.text}</p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="glass-card p-8 lg:p-10 bg-white/[0.02] border-white/5 space-y-8">
                            {/* Info Otomatis */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black shrink-0">
                                    {auth.pengguna.nama[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{auth.pengguna.nama}</p>
                                    <p className="text-xs text-gray-500">{auth.pengguna.email}</p>
                                </div>
                                <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                    Lvl {auth.pengguna.level || 1}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 flex items-center gap-2">
                                    <FileText size={14} /> Motivasi & Keahlian Anda
                                </label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary outline-none transition-all font-light text-sm min-h-[160px] resize-none"
                                    placeholder="Ceritakan keahlian Anda, pengalaman mengajar, dan mengapa Anda ingin menjadi mentor di Code Genius..."
                                    value={form.motivasi}
                                    onChange={e => setForm({ ...form, motivasi: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 flex items-center gap-2">
                                    <LinkIcon size={14} /> Link Portofolio (GitHub / Website)
                                </label>
                                <input
                                    type="url"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary outline-none transition-all font-light text-sm"
                                    placeholder="https://github.com/username"
                                    value={form.portofolio}
                                    onChange={e => setForm({ ...form, portofolio: e.target.value })}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                            >
                                {loading ? 'Mengirim...' : 'Kirim Pengajuan Mentor'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </UserLayout>
    );
}
