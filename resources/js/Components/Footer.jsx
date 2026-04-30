import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Code, Send, Globe, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setEmail('');
    };
    return (
        <footer className="bg-[#0B0E14] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        {/* Logo */}
                        <Link href="/" className="flex items-start gap-3 group flex-shrink-0">
                            <img
                                src="/images/logo_darkmode.svg"
                                alt="Logo"
                                className="h-8 sm:h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
                            />
                        </Link>
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
                        <h4 className="font-bold mb-5">Kontak</h4>
                        <ul className="space-y-3.5 text-sm text-gray-500 mb-7">
                            <li className="flex items-center gap-2.5">
                                <Mail size={14} className="text-yellow-400 flex-shrink-0" />
                                idspora.contact@gmail.com
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    Kabupaten Bandung, Jawa Barat 40257, Indonesia.
                                </div>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <p className="text-white font-bold text-sm mb-3">Newsletter</p>
                        <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="kamu@email.com"
                                required
                                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/40 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 rounded-lg bg-yellow-400 text-black text-sm font-black hover:bg-yellow-300 transition-all flex-shrink-0"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </footer>
    );
}
