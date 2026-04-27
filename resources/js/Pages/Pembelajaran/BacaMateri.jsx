import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Play, ChevronLeft, ChevronRight, Menu, Code as CodeIcon, FileText, CheckCircle2, RotateCcw, Bot, X, Send } from 'lucide-react';
import axios from 'axios';

export default function BacaMateri({ kursus, materi, sidebar }) {
    const [kode, setKode] = useState(materi.contoh_kode || '');
    const [output, setOutput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [latihanSelesai, setLatihanSelesai] = useState(false);
    
    // AI State
    const [aiOpen, setAiOpen] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');

    const isFrontend = kursus.jalur === 'frontend' || kursus.slug.includes('frontend');

    const tandaiSelesai = async () => {
        try {
            const res = await axios.post('/progres/selesai', {
                id_materi: materi.id
            });
            alert(res.data.pesan);
        } catch (err) {
            console.error('Gagal simpan progres');
        }
    };

    useEffect(() => {
        if (materi.tipe === 'latihan') {
            jalankanKode();
        }
    }, [materi]);

    const cekDenganAI = async () => {
        setAiOpen(true);
        setAiLoading(true);
        setAiResponse('');
        
        try {
            const res = await axios.post('/asisten-ai/tanya', {
                kode_pengguna: kode,
                bahasa: isFrontend ? 'HTML/CSS/JavaScript' : 'PHP/SQL',
                konteks_materi: materi.judul
            });
            
            setAiResponse(res.data.jawaban);
            
            // Peran AI sebagai gatekeeper
            if (res.data.status === 'benar') {
                setLatihanSelesai(true);
            } else {
                setLatihanSelesai(false);
            }
        } catch (err) {
            const pesanError = err.response?.data?.pesan || err.message || 'Gagal menghubungi server AI.';
            setAiResponse('Error: ' + pesanError);
        } finally {
            setAiLoading(false);
        }
    };

    const jalankanKode = () => {
        // Preview lokal sederhana (tidak menentukan lulus/gagal)
        if (isFrontend) {
            if (kode.includes('<') && kode.includes('>')) {
                // Render as HTML
                setOutput(kode);
            } else {
                // Try as JS
                try {
                    let logs = [];
                    const mockConsole = {
                        log: (...args) => logs.push(args.join(' ')),
                        error: (...args) => logs.push('ERROR: ' + args.join(' ')),
                    };
                    const runner = new Function('console', kode);
                    runner(mockConsole);
                    setOutput(logs.join('\n') || '> Kode JS berhasil dijalankan (tanpa output log)');
                } catch (err) {
                    setOutput('JS Error: ' + err.message);
                }
            }
        } else {
            setOutput('// Output simulasi Backend (PHP/SQL)\n// Silakan klik "Evaluasi dengan AI" untuk mengecek jawaban.');
        }
    };

    const resetKode = () => {
        setKode(materi.contoh_kode);
        setLatihanSelesai(false);
    };

    return (
        <div className="flex h-screen bg-[#0B0E14] text-white overflow-hidden relative">
            <Head title={`${materi.judul} - ${kursus.nama}`} />

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} border-r border-white/5 bg-[#0D1117] transition-all duration-300 flex flex-col relative`}>
                <div className="p-6 border-b border-white/5 flex items-center justify-between overflow-hidden whitespace-nowrap">
                    <Link href={`/kursus/${kursus.slug}`} className="font-bold flex items-center gap-2 hover:text-secondary transition-colors">
                        <ChevronLeft size={18} /> {kursus.nama}
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-8 overflow-hidden">
                    {sidebar.map((modul) => (
                        <div key={modul.id}>
                            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 mb-4 px-2">{modul.judul}</h4>
                            <div className="space-y-1">
                                {modul.materi.map((m) => (
                                    <Link 
                                        key={m.id}
                                        href={`/kursus/${kursus.slug}/${m.slug}`}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${m.id === materi.id ? 'bg-primary/10 text-secondary border border-primary/20 font-bold' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {m.tipe === 'latihan' ? <CodeIcon size={14} /> : <FileText size={14} />}
                                        <span className="truncate">{m.judul}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Toolbar */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0B0E14]/80 backdrop-blur-xl">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-400">{materi.judul}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {latihanSelesai && (
                            <button 
                                onClick={tandaiSelesai}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 border border-green-500/50 text-sm font-bold hover:bg-green-500/30 transition-all animate-pulse"
                            >
                                <CheckCircle2 size={16} /> Lanjut ke Level Berikutnya
                            </button>
                        )}
                        <Link 
                            href={`/kursus/${kursus.slug}`} 
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-sm font-bold hover:bg-red-500/20 transition-all"
                        >
                            Keluar
                        </Link>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Content Area */}
                    <div className={`${materi.tipe === 'latihan' ? 'w-1/3' : 'w-full max-w-4xl mx-auto'} overflow-y-auto p-12 transition-all`}>
                        <h1 className="text-4xl font-black mb-8">{materi.judul}</h1>
                        <article 
                            className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-code:text-secondary max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: materi.konten }}
                        />
                        
                        {materi.tipe === 'teks' && (
                            <div className="mt-20 pt-8 border-t border-white/5 flex justify-between">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                                    <ChevronLeft size={18} /> Materi Sebelumnya
                                </button>
                                <button className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-bold transition-colors">
                                    Lanjut Materi Berikutnya <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Editor Area (if Exercise) */}
                    {materi.tipe === 'latihan' && (
                        <div className="flex-1 flex flex-col border-l border-white/5 bg-[#0D1117]">
                            {/* Editor Header */}
                            <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#161B22]">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-secondary" /> CODE EDITOR
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={cekDenganAI}
                                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-bold hover:scale-105 shadow-lg shadow-violet-500/20 transition-all"
                                    >
                                        <Bot size={14} /> Evaluasi dengan AI Mentor
                                    </button>
                                    <button 
                                        onClick={resetKode}
                                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                                        title="Reset Kode"
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                    <button 
                                        onClick={jalankanKode}
                                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary text-white text-xs font-bold hover:bg-secondary/80 transition-all"
                                    >
                                        <Play size={10} fill="currentColor" /> Jalankan
                                    </button>
                                </div>
                            </div>
                            
                            {/* Editor */}
                            <div className="flex-1 relative">
                                <textarea 
                                    className="w-full h-full bg-transparent p-6 font-mono text-sm resize-none focus:outline-none text-gray-300"
                                    value={kode}
                                    onChange={(e) => setKode(e.target.value)}
                                    spellCheck="false"
                                />
                                {latihanSelesai && (
                                    <div className="absolute top-6 right-6 flex flex-col items-end gap-3">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/20 animate-bounce">
                                            <CheckCircle2 size={16} /> Jawaban Benar!
                                        </div>
                                        <button 
                                            onClick={() => {
                                                if (confirm('Bagikan hasil coding Anda ke galeri komunitas?')) {
                                                    axios.post('/komunitas/publish', {
                                                        judul: `Karya: ${materi.judul}`,
                                                        deskripsi: `Hasil latihan materi ${materi.judul} di Code Genius.`,
                                                        kode_html: kode,
                                                        bahasa_utama: kursus.slug.includes('html') ? 'html' : 'javascript'
                                                    }).then(() => alert('Berhasil dipublikasikan!'));
                                                }
                                            }}
                                            className="px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                        >
                                            Bagikan ke Komunitas
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Preview/Output */}
                            <div className="h-1/3 border-t border-white/5 flex flex-col">
                                <div className="h-10 bg-[#161B22] border-b border-white/5 flex items-center px-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    HASIL / OUTPUT
                                </div>
                                <div className="flex-1 bg-black p-6">
                                    {isFrontend && (kode.includes('<') && kode.includes('>')) ? (
                                        <iframe 
                                            title="preview"
                                            className="w-full h-full bg-white rounded-lg"
                                            srcDoc={output}
                                        />
                                    ) : (
                                        <div className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                                            {output}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* AI Floating Panel */}
            {aiOpen && (
                <div className="absolute right-8 bottom-8 w-[400px] max-h-[600px] flex flex-col bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] animate-in slide-in-from-bottom-5 overflow-hidden border border-gray-100">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <Bot size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-none mb-1">AI Mentor</h3>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest">Online & Ready</p>
                            </div>
                        </div>
                        <button onClick={() => setAiOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-all">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 space-y-4 min-h-[300px] bg-white">
                        {aiLoading ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-4 text-gray-400">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm font-bold animate-pulse text-gray-500">Menganalisis kodemu...</p>
                            </div>
                        ) : (
                            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap font-medium">
                                {aiResponse || 'Halo! Saya mentor AI-mu. Klik "Tanya AI" di editor jika kamu butuh bantuan memahami materi ini.'}
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-[9px] text-center text-gray-400 font-bold uppercase tracking-[3px]">
                        Powered by Google Gemini Pro
                    </div>
                </div>
            )}
        </div>
    );
}
