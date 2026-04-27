import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { User, Mail, Camera, Save, ArrowLeft, Lock, Shield, Key, Edit3 } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Edit({ auth }) {
    const profileForm = useForm({
        nama: auth.pengguna.nama,
        email: auth.pengguna.email,
        bio: auth.pengguna.bio || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post('/profil/update');
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post('/pengaturan/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <UserLayout auth={auth}>
            <Head title="Edit Profil - Code Genius" />
            
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 lg:py-12 pb-40">
                <div className="mb-12">
                    <h1 className="text-4xl font-black mb-4">Account <span className="text-primary italic">Settings</span></h1>
                    <p className="text-gray-500 font-light italic">Personalisasi identitas dan amankan akun Anda di sini.</p>
                </div>

                <div className="space-y-12 lg:space-y-16">
                    {/* Bagian 1: Identitas */}
                    <form onSubmit={submitProfile} className="space-y-8">
                        <div className="glass-card p-6 lg:p-10 space-y-8 bg-white/[0.02] border-white/5 shadow-2xl shadow-black/20">
                            <h2 className="text-xl font-black flex items-center gap-3">
                                <User className="text-primary" size={24} /> General Information
                            </h2>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-white/5">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-black shadow-2xl relative group cursor-pointer">
                                    {auth.pengguna.nama[0]}
                                    <div className="absolute inset-0 bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera size={24} />
                                    </div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="font-bold mb-2">Profile Picture</h4>
                                    <p className="text-xs text-gray-600 mb-4 font-light leading-relaxed">Mendukung format PNG/JPG dengan ukuran maksimal 2MB.</p>
                                    <button type="button" className="text-[10px] font-black text-secondary uppercase tracking-[2px] transition-all hover:tracking-[3px]">Upload New Photo</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input 
                                            type="text" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all font-light"
                                            value={profileForm.data.nama}
                                            onChange={e => profileForm.setData('nama', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 px-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input 
                                            type="email" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all font-light"
                                            value={profileForm.data.email}
                                            onChange={e => profileForm.setData('email', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 px-1">Short Bio</label>
                                <div className="relative">
                                    <Edit3 className="absolute left-4 top-6 text-gray-600" size={18} />
                                    <textarea 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all font-light min-h-[120px] resize-none"
                                        placeholder="Tell the community about yourself..."
                                        value={profileForm.data.bio}
                                        onChange={e => profileForm.setData('bio', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    disabled={profileForm.processing}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                                >
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Bagian 2: Keamanan */}
                    <form onSubmit={submitPassword} className="space-y-8">
                        <div className="glass-card p-6 lg:p-10 space-y-8 bg-white/[0.02] border-white/5 shadow-2xl shadow-black/20 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Shield size={150} />
                            </div>
                            <h2 className="text-xl font-black flex items-center gap-3">
                                <Shield className="text-secondary" size={24} /> Security & Key
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 px-1">Current Password</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input 
                                            type="password" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
                                            value={passwordForm.data.current_password}
                                            onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 px-1">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input 
                                            type="password" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
                                            value={passwordForm.data.password}
                                            onChange={e => passwordForm.setData('password', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 px-1">Confirm New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input 
                                            type="password" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
                                            value={passwordForm.data.password_confirmation}
                                            onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    disabled={passwordForm.processing}
                                    className="w-full sm:w-auto px-12 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all"
                                >
                                    Update Security Key
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
}
