import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { 
    Shield, Lock, Bell, Server, 
    Database, Settings, Save, 
    CheckCircle2, AlertTriangle, Key,
    User, Mail, Layout
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Indeks({ auth, konfigurasi }) {
    const [activeTab, setActiveTab] = useState('profile');

    const profileForm = useForm({
        nama: auth.pengguna?.nama || '',
        email: auth.pengguna?.email || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const systemForm = useForm({
        site_name: konfigurasi?.site_name || 'Code Genius',
        maintenance_mode: konfigurasi?.maintenance_mode || false,
        registration_open: konfigurasi?.registration_open || true,
        ai_debug: konfigurasi?.ai_debug || false
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post('/admin/settings/profile');
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post('/pengaturan/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const submitSystem = (e) => {
        e.preventDefault();
        systemForm.post('/admin/settings/system');
    };

    const tabs = [
        { id: 'profile', label: 'Admin Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'system', label: 'Platform Config', icon: Settings },
    ];

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin Settings - Code Genius" />

            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-10 max-w-5xl mx-auto">
                <header>
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        Admin <span className="text-amber-500 underline decoration-amber-500/20">Control Center</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Konfigurasi akun administrator dan parameter platform.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Nav */}
                    <div className="w-full lg:w-64 shrink-0 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20'
                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <form onSubmit={submitProfile} className="bg-[#0D1117] border border-white/5 rounded-3xl p-8 lg:p-10 space-y-8 animate-in fade-in duration-300">
                                <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white">Administrator Identity</h2>
                                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Informasi dasar akun admin Anda</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Full Name</label>
                                        <div className="relative group">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                            <input
                                                type="text"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-amber-500 outline-none transition-all text-sm text-white"
                                                value={profileForm.data.nama}
                                                onChange={e => profileForm.setData('nama', e.target.value)}
                                            />
                                        </div>
                                        {profileForm.errors.nama && <p className="text-red-500 text-[10px] font-bold">{profileForm.errors.nama}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Admin Email</label>
                                        <div className="relative group">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                            <input
                                                type="email"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-red-500 outline-none transition-all text-sm text-white"
                                                value={profileForm.data.email}
                                                onChange={e => profileForm.setData('email', e.target.value)}
                                            />
                                        </div>
                                        {profileForm.errors.email && <p className="text-red-500 text-[10px] font-bold">{profileForm.errors.email}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="flex items-center gap-2 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-200 transition-all shadow-xl disabled:opacity-50"
                                    >
                                        <Save size={14} /> {profileForm.processing ? 'Saving...' : 'Update Identity'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <form onSubmit={submitPassword} className="bg-[#0D1117] border border-white/5 rounded-3xl p-8 lg:p-10 space-y-8 animate-in fade-in duration-300">
                                <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white">Security Protocol</h2>
                                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Manajemen akses dan kredensial</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Current Security Key</label>
                                        <input
                                            type="password"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-sm text-white"
                                            value={passwordForm.data.current_password}
                                            onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        />
                                        {passwordForm.errors.current_password && <p className="text-red-500 text-[10px] font-bold">{passwordForm.errors.current_password}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">New Admin Password</label>
                                            <input
                                                type="password"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-sm text-white"
                                                value={passwordForm.data.password}
                                                onChange={e => passwordForm.setData('password', e.target.value)}
                                            />
                                            {passwordForm.errors.password && <p className="text-red-500 text-[10px] font-bold">{passwordForm.errors.password}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Confirm Admin Password</label>
                                            <input
                                                type="password"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-sm text-white"
                                                value={passwordForm.data.password_confirmation}
                                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="px-8 py-4 bg-amber-600 text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/20 disabled:opacity-50"
                                    >
                                        {passwordForm.processing ? 'Updating...' : 'Renew Credentials'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* System Section */}
                        {activeTab === 'system' && (
                            <form onSubmit={submitSystem} className="space-y-8 animate-in fade-in duration-300">
                                <div className="bg-[#0D1117] border border-white/5 rounded-3xl p-8 lg:p-10 space-y-8">
                                    <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                            <Layout size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-white">Platform Parameters</h2>
                                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Konfigurasi global platform</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Site Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all text-sm text-white"
                                                value={systemForm.data.site_name}
                                                onChange={e => systemForm.setData('site_name', e.target.value)}
                                            />
                                        </div>

                                        {[
                                            { id: 'maintenance_mode', label: 'Maintenance Mode', desc: 'Nonaktifkan akses siswa sementara untuk perbaikan.', icon: Server, color: 'text-amber-500' },
                                            { id: 'registration_open', label: 'Public Registration', desc: 'Izinkan pengguna baru mendaftar secara publik.', icon: User, color: 'text-blue-500' },
                                            { id: 'ai_debug', label: 'AI Debug Mode', desc: 'Aktifkan log detail untuk interaksi asisten AI.', icon: Database, color: 'text-purple-500' },
                                        ].map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 group hover:border-white/10 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 bg-white/5 rounded-xl ${item.color}`}>
                                                        <item.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{item.label}</p>
                                                        <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={() => systemForm.setData(item.id, !systemForm.data[item.id])}
                                                    className={`w-12 h-6 rounded-full transition-all relative ${systemForm.data[item.id] ? 'bg-red-500' : 'bg-white/10'}`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${systemForm.data[item.id] ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex gap-4">
                                        <AlertTriangle size={20} className="text-red-500 shrink-0" />
                                        <p className="text-[11px] text-gray-400 leading-relaxed">
                                            <span className="text-red-500 font-black uppercase">Caution:</span> Perubahan pada parameter ini akan berdampak langsung pada seluruh pengguna aktif platform. Pastikan Anda memahami konsekuensi sebelum melakukan pembaruan.
                                        </p>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={systemForm.processing}
                                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all disabled:opacity-50"
                                        >
                                            {systemForm.processing ? 'Applying...' : 'Apply System Changes'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
