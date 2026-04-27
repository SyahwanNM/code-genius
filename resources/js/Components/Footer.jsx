import React from 'react';
import { Link } from '@inertiajs/react';
import { Code, Send, Globe, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0B0E14] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center text-xs font-bold">CG</div>
                            <span className="text-xl font-bold">Code Genius</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Platform pembelajaran pemrograman mandiri terbaik di Indonesia. Kami membantu Anda menguasai teknologi masa depan dengan cara yang menyenangkan.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Code size={18} /></a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Send size={18} /></a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Globe size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Belajar</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/kursus/html-dasar" className="hover:text-secondary transition-colors">HTML Dasar</Link></li>
                            <li><Link href="/kursus/javascript-modern" className="hover:text-secondary transition-colors">JavaScript Modern</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">CSS Grid & Flexbox</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">React Framework</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Komunitas</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-secondary transition-colors">Forum Diskusi</Link></li>
                            <li><Link href="/mentor" className="hover:text-secondary transition-colors">1-on-1 Debugging</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">Showcase Proyek</Link></li>
                            <li><Link href="#" className="hover:text-secondary transition-colors">Grup Telegram</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-center gap-3"><Mail size={16} /> halo@codegenius.id</li>
                            <li className="flex items-start gap-3">
                                <span>📍</span>
                                <div>
                                    Jakarta Selatan, Indonesia<br />
                                    Gedung Inovasi Digital Lt. 4
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-gray-600 italic">
                        &copy; 2026 Code Genius. Dibuat dengan ❤️ untuk developer Indonesia.
                    </p>
                    <div className="flex items-center gap-8 text-sm text-gray-600">
                        <Link href="#" className="hover:text-white">Syarat & Ketentuan</Link>
                        <Link href="#" className="hover:text-white">Kebijakan Privasi</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
