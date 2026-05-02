import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    User, Mail, Camera, Save, ArrowLeft, Lock, Shield, Key, Edit3, 
    Globe, Sparkles, Check, Plus, X, GitBranch, Link as LinkIcon 
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Edit({ auth }) {
    const [skillInput, setSkillInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    const commonSkills = [
        'React.js', 'Laravel', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Node.js', 
        'Python', 'JavaScript', 'TypeScript', 'PostgreSQL', 'MySQL', 'MongoDB',
        'UI Design', 'Figma', 'Docker', 'AWS', 'PHP', 'Flutter', 'Go', 'Ruby on Rails',
        'Bootstrap', 'SASS', 'Express.js', 'Java', 'Spring Boot', 'C++', 'Swift'
    ];
    
    const { data, setData, post, processing, errors } = useForm({
        nama: auth.pengguna.nama,
        email: auth.pengguna.email,
        bio: auth.pengguna.bio || '',
        avatar_style: auth.pengguna.avatar_style || 'avataaars',
        tautan_sosial: auth.pengguna.tautan_sosial || { github: '', linkedin: '', website: '' },
        keahlian_utama: auth.pengguna.keahlian_utama || [],
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const avatarStyles = [
        { id: 'avataaars', name: 'Human' },
        { id: 'bottts', name: 'Robot' },
        { id: 'pixel-art', name: 'Retro' },
        { id: 'identicon', name: 'Abstract' },
        { id: 'micah', name: 'Minimalist' },
    ];

    const handleSkillInputChange = (e) => {
        const val = e.target.value;
        setSkillInput(val);
        
        if (val.trim()) {
            const filtered = commonSkills.filter(s => 
                s.toLowerCase().includes(val.toLowerCase()) && 
                !data.keahlian_utama.includes(s)
            ).slice(0, 5); // Ambil 5 saran teratas
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const addSkill = (skillName) => {
        const finalSkill = typeof skillName === 'string' ? skillName : skillInput;
        if (finalSkill.trim() && !data.keahlian_utama.includes(finalSkill.trim())) {
            setData('keahlian_utama', [...data.keahlian_utama, finalSkill.trim()]);
            setSkillInput('');
            setSuggestions([]);
        }
    };

    const removeSkill = (skillToRemove) => {
        setData('keahlian_utama', data.keahlian_utama.filter(s => s !== skillToRemove));
    };

    const submitProfile = (e) => {
        e.preventDefault();
        post('/profil/update');
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post('/pengaturan/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <UserLayout auth={auth}>
            <Head title="Personalize Profile - Code Genius" />
            
            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12 pb-40">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black mb-4">Personalize <span className="text-amber-500 italic">Identity</span></h1>
                        <p className="text-gray-500 font-medium text-sm italic">Bangun personal branding Anda di ekosistem Code Genius.</p>
                    </div>
                    <Link href="/profil" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                        <ArrowLeft size={14} /> Kembali
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar: Avatar Customizer */}
                    <div className="space-y-8">
                        <div className="glass-card p-8 bg-white/[0.02] border-white/5 shadow-2xl space-y-8">
                            <h2 className="text-sm font-black uppercase tracking-[3px] text-gray-500 flex items-center gap-2">
                                <Sparkles size={16} className="text-amber-500" /> Avatar Style
                            </h2>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-[32px] bg-amber-500 p-1 shadow-2xl shadow-amber-500/20 mb-8 overflow-hidden">
                                    <img 
                                        src={`https://api.dicebear.com/7.x/${data.avatar_style}/svg?seed=${data.nama}`} 
                                        alt="Avatar Preview" 
                                        className="w-full h-full rounded-[30px] bg-[#05070A] object-cover"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 w-full">
                                    {avatarStyles.map((style) => (
                                        <button
                                            key={style.id}
                                            type="button"
                                            onClick={() => setData('avatar_style', style.id)}
                                            className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                data.avatar_style === style.id 
                                                    ? 'bg-amber-500 border-amber-500 text-black' 
                                                    : 'bg-white/5 border-white/10 text-gray-500 hover:border-amber-500/30'
                                            }`}
                                        >
                                            {style.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 bg-amber-500/5 border-amber-500/20">
                            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Shield size={12} /> Privacy Tip
                            </p>
                            <p className="text-xs text-amber-500/70 leading-relaxed font-medium">
                                Gunakan nama asli agar sertifikat yang Anda dapatkan nantinya valid dan diakui secara profesional.
                            </p>
                        </div>
                    </div>

                    {/* Main Content: Info & Links */}
                    <div className="lg:col-span-2 space-y-8">
                        <form onSubmit={submitProfile} className="space-y-8">
                            <div className="glass-card p-10 space-y-10 bg-white/[0.02] border-white/5 shadow-2xl shadow-black/20">
                                <div className="space-y-8">
                                    <h2 className="text-xl font-black flex items-center gap-3">
                                        <User className="text-amber-500" size={24} /> Basic Information
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Full Name</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all font-medium text-sm"
                                                value={data.nama}
                                                onChange={e => setData('nama', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Email</label>
                                            <input 
                                                type="email" 
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all font-medium text-sm"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Biodata Singkat</label>
                                        <textarea 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all font-medium text-sm min-h-[120px] resize-none"
                                            placeholder="Gambarkan diri Anda sebagai developer..."
                                            value={data.bio}
                                            onChange={e => setData('bio', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8 pt-8 border-t border-white/5">
                                    <h2 className="text-xl font-black flex items-center gap-3">
                                        <Globe className="text-amber-500" size={24} /> Social Connections
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 flex items-center gap-2">
                                                <GitBranch size={12} /> GitHub
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="username"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 focus:border-amber-500 outline-none transition-all text-xs font-medium"
                                                value={data.tautan_sosial.github}
                                                onChange={e => setData('tautan_sosial', { ...data.tautan_sosial, github: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 flex items-center gap-2">
                                                <LinkIcon size={12} /> LinkedIn
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="profile-url"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 focus:border-amber-500 outline-none transition-all text-xs font-medium"
                                                value={data.tautan_sosial.linkedin}
                                                onChange={e => setData('tautan_sosial', { ...data.tautan_sosial, linkedin: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 flex items-center gap-2">
                                                <Globe size={12} /> Website
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="https://..."
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 focus:border-amber-500 outline-none transition-all text-xs font-medium"
                                                value={data.tautan_sosial.website}
                                                onChange={e => setData('tautan_sosial', { ...data.tautan_sosial, website: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 pt-8 border-t border-white/5">
                                    <h2 className="text-xl font-black flex items-center gap-3">
                                        <CodeIcon className="text-amber-500" size={24} /> Top Expertise
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="Tambah keahlian (contoh: Laravel, React, UI/UX)"
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3 px-5 focus:border-amber-500 outline-none transition-all text-xs font-medium"
                                                    value={skillInput}
                                                    onChange={handleSkillInputChange}
                                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => addSkill()}
                                                    className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-amber-500/20"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>

                                            {/* Suggestions Dropdown */}
                                            {suggestions.length > 0 && (
                                                <div className="absolute left-0 right-14 top-full mt-2 bg-[#161B22] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[50]">
                                                    {suggestions.map((s, i) => (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() => addSkill(s)}
                                                            className="w-full px-5 py-3 text-left text-xs font-bold text-gray-400 hover:bg-amber-500 hover:text-black transition-all flex items-center justify-between group"
                                                        >
                                                            {s}
                                                            <Plus size={14} className="opacity-0 group-hover:opacity-100" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {data.keahlian_utama.map((skill, i) => (
                                                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2 group">
                                                    {skill}
                                                    <X size={12} className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" onClick={() => removeSkill(skill)} />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8 border-t border-white/5">
                                    <button 
                                        disabled={processing}
                                        className="w-full flex items-center justify-center gap-3 px-12 py-5 bg-amber-500 text-black font-black uppercase tracking-[4px] text-[10px] rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50"
                                    >
                                        <Save size={18} /> Update Digital Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

function CodeIcon({ className, size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
}
