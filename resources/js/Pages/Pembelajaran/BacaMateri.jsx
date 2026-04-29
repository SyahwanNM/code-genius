import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Play, ChevronLeft, ChevronRight, Code as CodeIcon, FileText,
    CheckCircle2, RotateCcw, Bot, X, ArrowLeft, Maximize2, Menu,
    PanelLeftClose, PanelLeftOpen, BookOpen
} from 'lucide-react';
import axios from 'axios';

export default function BacaMateri({ kursus, materi, sidebar }) {
    const [kode, setKode] = useState(materi.contoh_kode || '');
    const [output, setOutput] = useState('');
    const [latihanSelesai, setLatihanSelesai] = useState(false);

    // Layout state
    const [sidebarOpen, setSidebarOpen] = useState(false);           // Mobile drawer
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapse
    const [editorWidth, setEditorWidth] = useState(50);              // % for desktop resizer
    const [isDragging, setIsDragging] = useState(false);
    const [mobileTab, setMobileTab] = useState('materi');            // 'materi' | 'editor'

    // AI State
    const [aiOpen, setAiOpen] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');

    const isFrontend = kursus.jalur === 'frontend' || kursus.slug.includes('frontend');

    /* ─────────────── helpers ─────────────── */
    const jalankanKode = useCallback(() => {
        if (isFrontend) {
            if (kode.includes('<') && kode.includes('>')) {
                setOutput(kode);
            } else {
                try {
                    let logs = [];
                    const mockConsole = {
                        log: (...a) => logs.push(a.join(' ')),
                        error: (...a) => logs.push('ERROR: ' + a.join(' ')),
                    };
                    new Function('console', kode)(mockConsole);
                    setOutput(logs.join('\n') || '> Kode JS berhasil dijalankan (tanpa output log)');
                } catch (err) {
                    setOutput('JS Error: ' + err.message);
                }
            }
        } else {
            setOutput('// Output simulasi Backend (PHP/SQL)\n// Klik "Evaluasi dengan AI" untuk mengecek jawaban.');
        }
    }, [kode, isFrontend]);

    const resetKode = () => { setKode(materi.contoh_kode); setLatihanSelesai(false); };

    const tandaiSelesai = async () => {
        try {
            const res = await axios.post('/progres/selesai', { id_materi: materi.id });
            alert(res.data.pesan);
        } catch { console.error('Gagal simpan progres'); }
    };

    const cekDenganAI = async () => {
        setAiOpen(true); setAiLoading(true); setAiResponse('');
        try {
            const res = await axios.post('/asisten-ai/tanya', {
                kode_pengguna: kode,
                bahasa: isFrontend ? 'HTML/CSS/JavaScript' : 'PHP/SQL',
                konteks_materi: materi.judul,
            });
            setAiResponse(res.data.jawaban);
            setLatihanSelesai(res.data.status === 'benar');
        } catch (err) {
            setAiResponse('Error: ' + (err.response?.data?.pesan || err.message || 'Gagal menghubungi server AI.'));
        } finally { setAiLoading(false); }
    };

    /* ─────────────── effects ─────────────── */
    useEffect(() => { if (materi.tipe === 'latihan') jalankanKode(); }, [materi.id]);

    useEffect(() => {
        const onMove = (e) => {
            if (!isDragging) return;
            const pct = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
            if (pct >= 28 && pct <= 72) setEditorWidth(pct);
        };
        const onUp = () => setIsDragging(false);
        if (isDragging) {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';
        } else {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
    }, [isDragging]);

    /* ─────────────── computed ─────────────── */
    const isLatihan = materi.tipe === 'latihan';
    const showEditorLabel = editorWidth >= 38; // hide text when editor is narrow

    /* ─────────────── render ─────────────── */
    return (
        <div className="flex flex-col h-screen bg-[#0B0E14] text-white overflow-hidden">
            <Head title={`${materi.judul} - ${kursus.nama}`} />

            {/* ════════════ TOP HEADER ════════════ */}
            <header className="h-[56px] lg:h-[60px] border-b border-white/5 flex items-center gap-2 px-3 lg:px-5 bg-[#0B0E14] shrink-0">

                {/* Back */}
                <Link
                    href={`/kursus/${kursus.slug}`}
                    className="shrink-0 text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                    title="Kembali"
                >
                    <ArrowLeft size={18} />
                </Link>

                {/* Sidebar toggle (mobile) */}
                <button
                    className="lg:hidden shrink-0 text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                    onClick={() => setSidebarOpen(v => !v)}
                    title="Daftar Materi"
                >
                    <Menu size={18} />
                </button>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-[11px] lg:text-sm flex-1 min-w-0">
                    <span className="font-bold text-white truncate shrink-0 max-w-[90px] sm:max-w-[180px] lg:max-w-none">
                        {kursus.nama}
                    </span>
                    <span className="text-gray-600 shrink-0">·</span>
                    <span className="text-gray-400 truncate min-w-0">{materi.judul}</span>
                </div>

                {/* XP Badge */}
                <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00b27b]/10 text-[#00b27b] border border-[#00b27b]/20 text-[10px] lg:text-xs font-bold">
                    <CheckCircle2 size={12} />
                    <span>+200 XP</span>
                </div>

                {/* Mobile tab toggle (only for latihan) */}
                {isLatihan && (
                    <div className="lg:hidden flex shrink-0 items-center bg-white/5 rounded-lg p-0.5 gap-0.5">
                        <button
                            onClick={() => setMobileTab('materi')}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${mobileTab === 'materi' ? 'bg-[#2348b7] text-white' : 'text-gray-400'}`}
                        >
                            <BookOpen size={12} />
                            <span className="hidden xs:inline">Materi</span>
                        </button>
                        <button
                            onClick={() => setMobileTab('editor')}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${mobileTab === 'editor' ? 'bg-[#fbbc05] text-[#111827]' : 'text-gray-400'}`}
                        >
                            <CodeIcon size={12} />
                            <span className="hidden xs:inline">Editor</span>
                        </button>
                    </div>
                )}
            </header>

            {/* ════════════ BODY ════════════ */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* ── Mobile Sidebar Overlay ── */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 z-40 bg-black/60"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* ── SIDEBAR ── */}
                {/* Desktop: static, collapsible via width. Mobile: fixed drawer */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50
                        lg:relative lg:inset-auto lg:z-auto
                        flex flex-col bg-[#0B0E14] shrink-0
                        transition-all duration-300 ease-in-out
                        ${
                            /* mobile: slide in/out */
                            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                        }
                        ${
                            /* desktop: collapse width */
                            sidebarCollapsed ? 'lg:w-0 lg:border-transparent' : 'lg:w-[260px] border-r border-white/5'
                        }
                        w-[260px]
                        overflow-hidden
                    `}
                >
                    {/* inner wrapper keeps content at fixed width so animation is smooth */}
                    <div className="w-[260px] h-full flex flex-col">
                        {/* Sidebar header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Daftar Materi</span>
                            <div className="flex items-center gap-1">
                                {/* Desktop collapse button — inside sidebar for easy reach */}
                                <button
                                    className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                    onClick={() => setSidebarCollapsed(true)}
                                    title="Tutup sidebar"
                                >
                                    <PanelLeftClose size={15} />
                                </button>
                                {/* Mobile close */}
                                <button
                                    className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Sidebar list */}
                        <div className="flex-1 overflow-y-auto py-3">
                            {sidebar.map((modul, i) => (
                                <div key={modul.id} className="mb-5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-5 mb-1">
                                        Level {i + 1}: {modul.judul}
                                    </p>
                                    {modul.materi.map((m) => {
                                        const active = m.id === materi.id;
                                        return (
                                            <Link
                                                key={m.id}
                                                href={`/kursus/${kursus.slug}/${m.slug}`}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`relative flex items-center gap-3 px-5 py-2.5 text-[13px] transition-all ${
                                                    active
                                                        ? 'bg-[#1a2340]/70 text-white font-semibold'
                                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#2348b7]" />}
                                                {m.tipe === 'latihan'
                                                    ? <CodeIcon size={14} className={active ? 'text-yellow-500 shrink-0' : 'text-gray-600 shrink-0'} />
                                                    : <FileText size={14} className="text-gray-600 shrink-0" />}
                                                <span className="truncate">
                                                    {m.tipe === 'latihan' && active ? `Misi: ${m.judul}` : m.judul}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Expand button shown at bottom when collapsed — not needed, handled by header icon */}
                    </div>
                </aside>

                {/* ── Desktop: narrow strip to re-open sidebar when collapsed ── */}
                {sidebarCollapsed && (
                    <div className="hidden lg:flex flex-col items-center border-r border-white/5 bg-[#0B0E14] shrink-0 w-10">
                        <button
                            className="mt-3 flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                            onClick={() => setSidebarCollapsed(false)}
                            title="Buka sidebar"
                        >
                            <PanelLeftOpen size={15} />
                        </button>
                    </div>
                )}

                {/* ── CONTENT AREA (Materi) ── */}
                <div
                    className={`
                        flex-1 overflow-y-auto bg-[#0B0E14]
                        ${isLatihan && mobileTab === 'editor' ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'}
                    `}
                    style={isLatihan ? { width: `calc(100% - ${editorWidth}%)` } : undefined}
                >
                    <div className={`${isLatihan ? 'p-5 md:p-8 xl:p-12' : 'p-5 md:p-10 xl:p-16 max-w-4xl mx-auto w-full'}`}>
                        {isLatihan && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#fbbc05]/10 text-[#fbbc05] text-[11px] font-bold mb-5 border border-[#fbbc05]/20">
                                <Play size={9} fill="currentColor" /> Tantangan Coding
                            </span>
                        )}

                        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mb-5 text-white leading-snug">
                            {materi.judul}
                        </h1>

                        <article
                            className="prose prose-invert prose-sm md:prose-base prose-p:text-gray-400 prose-p:leading-relaxed prose-headings:text-white prose-code:text-blue-400 prose-a:text-blue-500 max-w-none"
                            dangerouslySetInnerHTML={{ __html: materi.konten }}
                        />

                        {/* Navigation buttons */}
                        <div className="mt-12 pt-6 border-t border-white/5 flex items-center gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">
                                <ChevronLeft size={16} className="shrink-0" />
                                <span className="truncate">Sebelumnya</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2348b7] text-white text-sm font-bold hover:bg-[#2348b7]/90 transition-all shadow-[0_4px_14px_0_rgba(35,72,183,0.3)]">
                                <span className="truncate">Berikutnya</span>
                                <ChevronRight size={16} className="shrink-0" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── DESKTOP RESIZER ── */}
                {isLatihan && (
                    <div
                        className="hidden lg:flex w-[5px] shrink-0 cursor-col-resize relative group z-10 bg-[#0B0E14] hover:bg-[#2348b7]/40 transition-colors border-x border-white/5"
                        onMouseDown={() => setIsDragging(true)}
                    >
                        <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
                            <div className="w-0.5 h-8 rounded-full bg-white/15 group-hover:bg-white/60 transition-colors" />
                        </div>
                    </div>
                )}

                {/* ── CODE EDITOR ── */}
                {isLatihan && (
                    <div
                        className={`
                            flex flex-col bg-[#0D1117] shrink-0
                            border-t lg:border-t-0 border-white/5
                            ${mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'}
                        `}
                        style={{
                            width: typeof window !== 'undefined' && window.innerWidth >= 1024
                                ? `${editorWidth}%`
                                : '100%',
                            height: typeof window !== 'undefined' && window.innerWidth < 1024
                                ? 'calc(100vh - 56px)'
                                : 'auto',
                        }}
                    >
                        {/* Mac titlebar */}
                        <div className="h-11 border-b border-white/5 flex items-center px-4 justify-between shrink-0 bg-[#0B0E14]">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <span className="text-xs text-gray-500 font-mono">index.html</span>
                            </div>
                            <button className="text-gray-500 hover:text-white transition-colors">
                                <Maximize2 size={13} />
                            </button>
                        </div>

                        {/* Textarea */}
                        <div className="flex-1 relative">
                            <textarea
                                className="absolute inset-0 w-full h-full bg-transparent p-4 lg:p-5 font-mono text-sm resize-none focus:outline-none text-gray-300 leading-relaxed"
                                value={kode}
                                onChange={(e) => setKode(e.target.value)}
                                spellCheck="false"
                            />
                            {latihanSelesai && (
                                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20 animate-bounce">
                                        <CheckCircle2 size={14} /> Jawaban Benar!
                                    </div>
                                    <button
                                        onClick={tandaiSelesai}
                                        className="px-3 py-1.5 rounded-xl bg-[#2348b7] text-white text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                                    >
                                        Lanjut Level
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Output */}
                        <div className="h-[30%] min-h-[120px] max-h-[240px] border-t border-white/5 flex flex-col shrink-0">
                            <div className="h-9 bg-[#0B0E14] border-b border-white/5 flex items-center px-5 text-[9px] font-black uppercase tracking-widest text-gray-600 shrink-0">
                                OUTPUT
                            </div>
                            <div className="flex-1 bg-[#0B0E14] p-4 overflow-y-auto">
                                {isFrontend && kode.includes('<') && kode.includes('>') ? (
                                    <iframe title="preview" className="w-full h-full bg-white rounded-lg" srcDoc={output} />
                                ) : (
                                    <pre className="font-mono text-xs text-gray-400 whitespace-pre-wrap">
                                        {output || 'Klik "Jalankan" untuk melihat output...'}
                                    </pre>
                                )}
                            </div>
                        </div>

                        {/* Action bar */}
                        <div className="h-14 lg:h-16 border-t border-white/5 bg-[#0B0E14] flex items-center justify-between px-3 lg:px-5 shrink-0 gap-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={jalankanKode}
                                    className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg bg-[#2348b7] text-white text-xs font-bold hover:bg-[#2348b7]/90 transition-all shadow-[0_2px_10px_rgba(35,72,183,0.4)] whitespace-nowrap"
                                >
                                    <Play size={13} fill="currentColor" />
                                    <span>Jalankan</span>
                                </button>
                                <button
                                    onClick={resetKode}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/5 hover:text-white transition-all whitespace-nowrap"
                                >
                                    <RotateCcw size={13} />
                                    <span>Reset</span>
                                </button>
                            </div>
                            <button
                                onClick={cekDenganAI}
                                title="Evaluasi dengan AI"
                                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg bg-[#fbbc05] text-[#111827] text-xs font-bold hover:bg-[#e5ab00] transition-all shadow-[0_0_12px_rgba(251,188,5,0.25)] whitespace-nowrap shrink-0"
                            >
                                <Bot size={13} />
                                {showEditorLabel
                                    ? <span className="hidden sm:inline">Evaluasi dengan AI</span>
                                    : null}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ════════════ AI FLOATING PANEL ════════════ */}
            {aiOpen && (
                <div className="fixed right-3 bottom-3 lg:right-6 lg:bottom-5 w-[calc(100%-1.5rem)] max-w-sm lg:max-w-[380px] max-h-[75vh] flex flex-col bg-[#161B22] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-[200] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0E14]/60 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-[#2348b7] flex items-center justify-center shadow-lg shadow-[#2348b7]/30">
                                <Bot size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-white leading-none">AI Mentor</p>
                                <p className="text-[9px] text-[#2348b7] font-black uppercase tracking-widest mt-0.5">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setAiOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-all">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 min-h-[180px]">
                        {aiLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <div className="w-8 h-8 border-[3px] border-[#2348b7] border-t-transparent rounded-full animate-spin" />
                                <p className="text-xs text-gray-500 font-bold animate-pulse">Menganalisis kode...</p>
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                                {aiResponse || 'Halo! Klik "Evaluasi dengan AI" jika butuh bantuan.'}
                            </p>
                        )}
                    </div>
                    <div className="px-4 py-2 bg-white/5 border-t border-white/5 text-[8px] text-center text-gray-600 font-bold uppercase tracking-[3px] shrink-0">
                        Powered by Google Gemini Pro
                    </div>
                </div>
            )}
        </div>
    );
}
