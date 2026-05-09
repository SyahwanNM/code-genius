import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Monitor, Server, ChevronRight, Code2, Globe, Database, Layout, Cpu, Layers } from 'lucide-react';

const paths = [
    {
        id: 'frontend',
        label: 'Frontend Developer',
        tagline: 'Bangun antarmuka yang memukau',
        desc: 'Kuasai seni membangun tampilan web yang indah, responsif, dan interaktif. Dari HTML & CSS hingga React dan animasi canggih.',
        icon: Monitor,
        gradient: 'from-accent via-accent/80 to-accent/60',
        glow: 'shadow-accent/30',
        border: 'border-accent/40',
        ring: 'ring-accent',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind'],
        techIcons: [Globe, Layout, Code2, Layers, Cpu],
        color: 'blue',
    },
    {
        id: 'backend',
        label: 'Backend Developer',
        tagline: 'Bangun sistem yang kuat & skalabel',
        desc: 'Pelajari cara membangun server, API, dan database yang andal. Dari PHP dasar hingga Laravel dan arsitektur microservices.',
        icon: Server,
        gradient: 'from-accent via-accent/80 to-accent/60',
        glow: 'shadow-accent/30',
        border: 'border-accent/40',
        ring: 'ring-accent',
        techStack: ['PHP', 'MySQL', 'Laravel', 'REST API', 'Redis'],
        techIcons: [Code2, Database, Server, Layers, Cpu],
        color: 'violet',
    },
];

export default function PilihJalur({ jalur_saat_ini }) {
    const [selected, setSelected] = useState(jalur_saat_ini || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hovered, setHovered] = useState(null);

    const handleSubmit = () => {
        if (!selected || isSubmitting) return;
        setIsSubmitting(true);
        router.post('/pilih-jalur', { jalur: selected });
    };

    return (
        <div className="min-h-screen bg-[#080B12] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <Head title="Pilih Jalur Belajar — Code Genius" />

            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 w-full max-w-5xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[4px] text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Langkah 1 dari 2
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tight">
                        Pilih Jalur{' '}
                        <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
                            Kariermu
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Ini akan menentukan <span className="text-white font-medium">roadmap belajar</span> dan materi yang paling sesuai untukmu.
                    </p>
                </div>

                {/* Path Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {paths.map((path) => {
                        const isSelected = selected === path.id;
                        const isHovered = hovered === path.id;

                        return (
                            <button
                                key={path.id}
                                id={`btn-jalur-${path.id}`}
                                onClick={() => setSelected(path.id)}
                                onMouseEnter={() => setHovered(path.id)}
                                onMouseLeave={() => setHovered(null)}
                                className={`relative text-left p-8 rounded-3xl border-2 transition-all duration-300 overflow-hidden group cursor-pointer
                                    ${isSelected
                                        ? `bg-gradient-to-br ${path.gradient} bg-opacity-10 ${path.border} shadow-2xl ${path.glow} scale-[1.02]`
                                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:scale-[1.01]'
                                    }`}
                                style={isSelected ? { background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))` } : {}}
                            >
                                {/* Gradient overlay when selected */}
                                {isSelected && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-10 rounded-3xl`} />
                                )}

                                {/* Glow line on top when selected */}
                                {isSelected && (
                                    <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${path.gradient} rounded-full`} />
                                )}

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all
                                        ${isSelected
                                            ? `bg-gradient-to-br ${path.gradient} shadow-lg ${path.glow}`
                                            : 'bg-white/5 group-hover:bg-white/10'
                                        }`}>
                                        <path.icon size={28} className={isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-black mb-1 text-white">{path.label}</h2>
                                    <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${path.gradient} bg-clip-text text-transparent`}>
                                        {path.tagline}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{path.desc}</p>

                                    {/* Tech Stack Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {path.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all
                                                    ${isSelected
                                                        ? 'bg-white/10 border-white/20 text-white'
                                                        : 'bg-white/5 border-white/10 text-gray-400'
                                                    }`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Selection indicator */}
                                <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                    ${isSelected
                                        ? `bg-gradient-to-br ${path.gradient} border-transparent`
                                        : 'border-white/20'
                                    }`}>
                                    {isSelected && (
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button
                        id="btn-lanjutkan-jalur"
                        onClick={handleSubmit}
                        disabled={!selected || isSubmitting}
                        className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300
                            ${selected
                                ? 'bg-gradient-to-r from-accent to-violet-500 text-white shadow-2xl shadow-accent/30 hover:scale-105 hover:shadow-accent/50'
                                : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/10'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                Lanjut ke Tes Penjajakan
                                <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                    {!selected && (
                        <p className="text-gray-600 text-xs mt-3">Pilih salah satu jalur di atas untuk melanjutkan</p>
                    )}
                </div>
            </div>
        </div>
    );
}
