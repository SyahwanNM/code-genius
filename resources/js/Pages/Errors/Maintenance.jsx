import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Hammer, Clock, ArrowLeft, Mail, Send, Globe } from 'lucide-react';

export default function Maintenance() {
    return (
        <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-6 font-sans">
            <Head title="Maintenance Underway - Code Genius" />

            {/* Decorative Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <img src="/images/logo_darkmode.svg" alt="Code Genius" className="h-12" />
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-[32px] bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-bounce">
                            <Hammer size={40} className="text-red-500" />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Enhancing Your <br />
                            <span className="text-red-500 italic">Experience</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
                            Kami sedang melakukan pemeliharaan sistem untuk memberikan fitur yang lebih hebat. Kami akan segera kembali!
                        </p>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
                    <div className="text-left space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Estimated Uptime</p>
                        <p className="text-2xl font-black text-white flex items-center gap-3">
                            <Clock className="text-red-500" size={24} /> 2-3 Hours
                        </p>
                    </div>
                    <div className="h-px md:h-12 w-full md:w-px bg-white/10" />
                    <div className="flex gap-4">
                        <a href="mailto:support@codegenius.id" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                            <Mail size={20} />
                        </a>
                        <a href="#" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                            <Send size={20} />
                        </a>
                        <a href="#" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                            <Globe size={20} />
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-8">
                    <a 
                        href="/masuk" 
                        className="text-[10px] font-black uppercase tracking-[4px] text-gray-600 hover:text-red-500 transition-all"
                    >
                        Administrator Login
                    </a>
                </div>
            </div>

            <footer className="fixed bottom-8 text-[10px] font-black uppercase tracking-[5px] text-gray-800">
                &copy; 2026 Code Genius Platform
            </footer>
        </div>
    );
}
