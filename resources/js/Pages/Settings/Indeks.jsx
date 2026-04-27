import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Shield, Key, Bell, Lock, CheckCircle2, Smartphone, Globe, Trash2 } from 'lucide-react';
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
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Globe },
    ];

    return (
        <UserLayout auth={auth}>
            <Head title="Settings - Code Genius" />

            <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 space-y-10">
                <header>
                    <h1 className="text-4xl font-black mb-2">Account <span className="text-primary italic">Settings</span></h1>
                    <p className="text-gray-500 font-light">Kelola preferensi keamanan dan privasi akun Anda.</p>
                </header>

                {/* Tabs */}
                <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            <tab.icon size={14} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-8">
                        {/* Flash berhasil */}
                        {passwordForm.recentlySuccessful && (
                            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-sm">
                                <CheckCircle2 size={18} /> Password berhasil diperbarui!
                            </div>
                        )}

                        <form onSubmit={submitPassword} className="glass-card p-8 lg:p-10 bg-white/[0.02] border-white/5 space-y-8">
                            <h2 className="text-xl font-black flex items-center gap-3">
                                <Lock className="text-secondary" size={22} /> Change Password
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Current Password</label>
                                    <div className="relative">
                                        <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                        <input
                                            type="password"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all text-sm"
                                            value={passwordForm.data.current_password}
                                            onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        />
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="text-red-500 text-xs font-bold">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">New Password</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                            <input
                                                type="password"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all text-sm"
                                                value={passwordForm.data.password}
                                                onChange={e => passwordForm.setData('password', e.target.value)}
                                            />
                                        </div>
                                        {passwordForm.errors.password && (
                                            <p className="text-red-500 text-xs font-bold">{passwordForm.errors.password}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Confirm Password</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                            <input
                                                type="password"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all text-sm"
                                                value={passwordForm.data.password_confirmation}
                                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Memperbarui...' : 'Update Password'}
                                </button>
                            </div>
                        </form>

                        {/* Danger Zone */}
                        <div className="glass-card p-8 bg-red-500/[0.03] border-red-500/20 space-y-6">
                            <h2 className="text-xl font-black flex items-center gap-3 text-red-500">
                                <Trash2 size={22} /> Danger Zone
                            </h2>
                            <p className="text-sm text-gray-500 font-light">Tindakan ini bersifat permanen dan tidak bisa dibatalkan.</p>
                            <button className="px-8 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all">
                                Hapus Akun Saya
                            </button>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="glass-card p-8 lg:p-10 bg-white/[0.02] border-white/5 space-y-8">
                        <h2 className="text-xl font-black flex items-center gap-3">
                            <Bell className="text-yellow-500" size={22} /> Notification Preferences
                        </h2>
                        <div className="space-y-6 divide-y divide-white/5">
                            {[
                                { label: 'New Course Available', desc: 'Dapatkan notif ketika kursus baru dirilis', enabled: true },
                                { label: 'XP Milestones', desc: 'Notif ketika Anda naik level atau mencapai pencapaian', enabled: true },
                                { label: 'Community Mentions', desc: 'Ketika seseorang menyebut karya Anda', enabled: false },
                                { label: 'Weekly Progress Report', desc: 'Laporan mingguan statistik belajar Anda', enabled: true },
                            ].map((notif, i) => (
                                <div key={i} className="flex items-center justify-between py-5 first:pt-0">
                                    <div>
                                        <p className="font-bold text-sm">{notif.label}</p>
                                        <p className="text-xs text-gray-500 mt-1 font-light">{notif.desc}</p>
                                    </div>
                                    <button className={`w-12 h-6 rounded-full transition-all relative ${notif.enabled ? 'bg-primary' : 'bg-white/10'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notif.enabled ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                    <div className="glass-card p-8 lg:p-10 bg-white/[0.02] border-white/5 space-y-8">
                        <h2 className="text-xl font-black flex items-center gap-3">
                            <Globe className="text-green-500" size={22} /> Privacy Settings
                        </h2>
                        <div className="space-y-6 divide-y divide-white/5">
                            {[
                                { label: 'Public Profile', desc: 'Tampilkan profil Anda di halaman komunitas publik', enabled: true },
                                { label: 'Show Progress', desc: 'Izinkan member lain melihat level dan XP Anda', enabled: false },
                                { label: 'Portfolio Visibility', desc: 'Tampilkan karya Anda di Community Showcase', enabled: true },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-5 first:pt-0">
                                    <div>
                                        <p className="font-bold text-sm">{item.label}</p>
                                        <p className="text-xs text-gray-500 mt-1 font-light">{item.desc}</p>
                                    </div>
                                    <button className={`w-12 h-6 rounded-full transition-all relative ${item.enabled ? 'bg-primary' : 'bg-white/10'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${item.enabled ? 'left-7' : 'left-1'}`} />
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
