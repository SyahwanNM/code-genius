import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Shield, Key, Bell, Lock, CheckCircle2, Trash2, Smartphone, ShieldCheck } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Indeks({ auth }) {
    const [activeTab, setActiveTab] = useState('security');

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post('/pengaturan/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const tabs = [
        { id: 'security', label: 'Keamanan Akun', icon: Shield },
        { id: 'notifications', label: 'Notifikasi', icon: Bell },
    ];

    return (
        <UserLayout auth={auth}>
            <Head title="Pengaturan - Code Genius" />

            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-10">
                <header>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4">
                        <ShieldCheck size={11} /> Account Preference
                    </div>
                    <h1 className="text-4xl font-black mb-2 text-white italic uppercase tracking-tight">System <span className="text-amber-500">Settings</span></h1>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Konfigurasi keamanan dan preferensi personal platform.</p>
                </header>

                {/* Tabs */}
                <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl w-fit border border-white/5">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === tab.id
                                    ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <tab.icon size={14} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Success Message */}
                        {passwordForm.recentlySuccessful && (
                            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                                <CheckCircle2 size={16} /> Password berhasil diperbarui secara aman!
                            </div>
                        )}

                        <form onSubmit={submitPassword} className="rounded-3xl border border-white/5 bg-[#0D1117] p-8 lg:p-10 space-y-10">
                            <div>
                                <h2 className="text-xl font-black flex items-center gap-3 text-white italic uppercase">
                                    <Lock className="text-amber-500" size={22} /> Perbarui Password
                                </h2>
                                <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Pastikan gunakan password yang kuat dan unik.</p>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Password Saat Ini</label>
                                    <div className="relative group">
                                        <Key size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-amber-500 transition-colors" />
                                        <input
                                            type="password"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:border-amber-500 outline-none transition-all text-sm text-white placeholder-gray-800"
                                            placeholder="Masukkan password lama"
                                            value={passwordForm.data.current_password}
                                            onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        />
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Password Baru</label>
                                        <div className="relative group">
                                            <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-amber-500 transition-colors" />
                                            <input
                                                type="password"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:border-amber-500 outline-none transition-all text-sm text-white placeholder-gray-800"
                                                placeholder="Minimal 8 karakter"
                                                value={passwordForm.data.password}
                                                onChange={e => passwordForm.setData('password', e.target.value)}
                                            />
                                        </div>
                                        {passwordForm.errors.password && (
                                            <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{passwordForm.errors.password}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Konfirmasi Password</label>
                                        <div className="relative group">
                                            <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-amber-500 transition-colors" />
                                            <input
                                                type="password"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:border-amber-500 outline-none transition-all text-sm text-white placeholder-gray-800"
                                                placeholder="Ulangi password baru"
                                                value={passwordForm.data.password_confirmation}
                                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-amber-500 transition-all shadow-2xl shadow-amber-500/10 active:scale-95 disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Syncing...' : 'Terapkan Perubahan'}
                                </button>
                            </div>
                        </form>

                        {/* Danger Zone */}
                        <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.02] p-8 space-y-6">
                            <h2 className="text-lg font-black flex items-center gap-3 text-red-500 italic uppercase">
                                <Trash2 size={20} /> Danger Zone
                            </h2>
                            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Tindakan ini bersifat permanen dan seluruh data progres belajar Anda akan dihapus selamanya.</p>
                            <button className="px-8 py-4 rounded-xl border border-red-500/30 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5">
                                Deaktivasi Akun Permanen
                            </button>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="rounded-3xl border border-white/5 bg-[#0D1117] p-8 lg:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-xl font-black flex items-center gap-3 text-white italic uppercase">
                                <Bell className="text-amber-500" size={22} /> Push Notifications
                            </h2>
                            <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Atur bagaimana platform berkomunikasi dengan Anda.</p>
                        </div>

                        <div className="space-y-2 divide-y divide-white/5">
                            {[
                                { label: 'New Course Available', desc: 'Dapatkan notif ketika kursus baru dirilis sesuai minat Anda.', enabled: true },
                                { label: 'XP Milestones', desc: 'Notif ketika Anda naik level atau mencapai pencapaian baru.', enabled: true },
                                { label: 'Weekly Progress Report', desc: 'Laporan mingguan statistik belajar dan momentum Anda.', enabled: true },
                                { label: 'System Updates', desc: 'Pemberitahuan pemeliharaan sistem dan fitur baru.', enabled: false },
                            ].map((notif, i) => (
                                <div key={i} className="flex items-center justify-between py-6 first:pt-0">
                                    <div className="max-w-[80%]">
                                        <p className="font-black text-sm text-white tracking-tight uppercase">{notif.label}</p>
                                        <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-widest leading-relaxed">{notif.desc}</p>
                                    </div>
                                    <button className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${notif.enabled ? 'bg-amber-500' : 'bg-white/10'}`}>
                                        <div className={`w-3 h-3 rounded-full bg-white absolute top-1.5 transition-all ${notif.enabled ? 'left-7' : 'left-2'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
