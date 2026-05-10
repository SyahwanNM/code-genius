import React, { useState, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { ChevronRight, ChevronLeft, CheckCircle2, Brain, Code2, Terminal } from 'lucide-react';

const LABEL_JALUR = {
    frontend: 'Frontend Developer',
    backend:  'Backend Developer',
};

const OPSI_LABELS = ['A', 'B', 'C', 'D'];
const OPSI_KEYS   = ['a', 'b', 'c', 'd'];

// ── Komponen tampilan blok kode ──────────────────────────────────────────────
function CodeBlock({ code }) {
    if (!code) return null;
    return (
        <div className="relative mb-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0d14]">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-white/10">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <Terminal size={12} className="text-gray-500 ml-2" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">code</span>
            </div>
            <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-green-300">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default function TesPenjajakan({ soal, jalur }) {
    const [currentIdx, setCurrentIdx]     = useState(0);
    const [jawaban, setJawaban]           = useState({});   // { soal_id: string }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [animating, setAnimating]       = useState(false);
    const [direction, setDirection]       = useState('right');

    const totalSoal    = soal.length;
    const soalSkrg     = soal[currentIdx];
    const jawabanSkrg  = jawaban[soalSkrg?.id] ?? '';
    const terjawab     = Object.values(jawaban).filter(v => v?.toString().trim() !== '').length;
    const isKodeTipe   = soalSkrg?.tipe === 'kode';
    const isLast       = currentIdx === totalSoal - 1;
    const semuaTerjawab = terjawab === totalSoal;

    const pilihJawaban = (val) => {
        if (animating) return;
        setJawaban(prev => ({ ...prev, [soalSkrg.id]: val }));
    };

    const navigate = (delta) => {
        if (animating) return;
        const newIdx = currentIdx + delta;
        if (newIdx < 0 || newIdx >= totalSoal) return;
        setDirection(delta > 0 ? 'right' : 'left');
        setAnimating(true);
        setTimeout(() => {
            setCurrentIdx(newIdx);
            setAnimating(false);
        }, 220);
    };

    const goNext = () => {
        if (!jawabanSkrg?.toString().trim() && !isKodeTipe) return;
        navigate(1);
    };

    const handleSubmit = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        router.post('/tes-penjajakan', { jawaban });
    };

    return (
        <div className="min-h-screen bg-[#080B12] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <Head title="Tes Penjajakan — Code Genius" />

            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[4px] text-gray-400">
                        <Brain size={12} className="text-accent" />
                        Langkah 2 dari 2 — Tes Penjajakan
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black mb-2">
                        Uji{' '}
                        <span className="bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent">
                            Kemampuanmu
                        </span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Jalur: <span className="text-white font-semibold">{LABEL_JALUR[jalur] || jalur}</span>
                        {' · '}
                        {totalSoal} soal
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 px-1">
                        <span>Soal {currentIdx + 1} / {totalSoal}</span>
                        <span>{terjawab} terjawab</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-accent to-accent rounded-full transition-all duration-500"
                            style={{ width: `${((currentIdx + 1) / totalSoal) * 100}%` }} />
                    </div>
                    {/* Dot nav */}
                    <div className="flex gap-1.5 mt-3 justify-center flex-wrap">
                        {soal.map((s, i) => {
                            const ans = jawaban[s.id];
                            const isDone = ans?.toString().trim() !== '' && ans !== undefined;
                            return (
                                <button key={s.id} onClick={() => { setDirection(i > currentIdx ? 'right' : 'left'); setCurrentIdx(i); }}
                                    className={`h-2.5 rounded-full transition-all duration-300
                                        ${i === currentIdx ? 'w-6 bg-accent' : isDone ? 'w-2.5 bg-green-500/70' : 'w-2.5 bg-white/10'}`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Question Card */}
                <div className={`transition-all duration-220 ${animating
                    ? direction === 'right' ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'
                    : 'opacity-100 translate-x-0'}`}
                >
                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 mb-5 shadow-2xl">
                        {/* Soal header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent flex items-center justify-center font-black text-sm text-white shrink-0">
                                {currentIdx + 1}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Pertanyaan</span>
                                {isKodeTipe ? (
                                    <span className="px-2.5 py-1 rounded-lg bg-accent/15 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                        <Code2 size={10} /> Soal Kode
                                    </span>
                                ) : (
                                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                        Pilihan Ganda
                                    </span>
                                )}
                                {jawaban[soalSkrg?.id]?.toString().trim() && (
                                    <CheckCircle2 size={14} className="text-green-400" />
                                )}
                            </div>
                        </div>

                        {/* Pertanyaan */}
                        <p className="text-white text-base font-semibold leading-relaxed mb-5 whitespace-pre-wrap">
                            {soalSkrg?.pertanyaan}
                        </p>

                        {/* Code snippet block (jika ada) */}
                        <CodeBlock code={soalSkrg?.kode_pertanyaan} />

                        {/* ── PILIHAN GANDA ── */}
                        {!isKodeTipe && (
                            <div className="space-y-3">
                                {OPSI_KEYS.map((key, i) => {
                                    const opsiText = soalSkrg?.opsi?.[key];
                                    if (!opsiText) return null;
                                    const isChosen = jawabanSkrg === key;
                                    return (
                                        <button key={key} id={`opsi-${key}`} onClick={() => pilihJawaban(key)}
                                            className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 group
                                                ${isChosen
                                                    ? 'bg-gradient-to-r from-accent/20 to-accent/20 border-accent/60 shadow-lg shadow-accent/20 scale-[1.01]'
                                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                                                }`}>
                                            <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center font-black text-sm transition-all
                                                ${isChosen ? 'bg-gradient-to-br from-accent to-accent text-white' : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                                                {OPSI_LABELS[i]}
                                            </div>
                                            <span className={`text-sm leading-relaxed font-medium mt-0.5 ${isChosen ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {opsiText}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* ── SOAL KODE: TEXT INPUT ── */}
                        {isKodeTipe && (
                            <div className="space-y-3">
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500">
                                    Tulis Jawabanmu
                                </label>
                                <textarea
                                    value={jawabanSkrg}
                                    onChange={e => pilihJawaban(e.target.value)}
                                    rows={4}
                                    placeholder="Ketik jawaban atau kode kamu di sini..."
                                    className="w-full bg-[#0a0d14] border-2 border-white/10 rounded-2xl px-5 py-4 text-sm text-green-300 font-mono leading-relaxed focus:border-accent/60 focus:ring-0 outline-none transition-all resize-none placeholder-gray-700"
                                />
                                <p className="text-[11px] text-gray-600 leading-relaxed">
                                    💡 Tidak perlu menulis kode lengkap. Fokus pada jawaban atau kata kunci yang diminta dalam pertanyaan.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                        <button onClick={() => navigate(-1)} disabled={currentIdx === 0}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                            <ChevronLeft size={18} /> Sebelumnya
                        </button>

                        {isLast ? (
                            <button id="btn-submit-tes" onClick={handleSubmit}
                                disabled={!semuaTerjawab || isSubmitting}
                                className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                                    ${semuaTerjawab
                                        ? 'bg-gradient-to-r from-accent to-accent text-white shadow-xl shadow-accent/30 hover:scale-105'
                                        : 'bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed'
                                    }`}>
                                {isSubmitting
                                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Memproses...</>
                                    : <><CheckCircle2 size={16} /> Selesai & Lihat Hasil</>
                                }
                            </button>
                        ) : (
                            <button id="btn-next-soal" onClick={goNext}
                                disabled={isKodeTipe ? false : !jawabanSkrg}
                                className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                                    ${(isKodeTipe || jawabanSkrg)
                                        ? 'bg-gradient-to-r from-accent to-accent text-white shadow-xl shadow-accent/20 hover:scale-105'
                                        : 'bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed'
                                    }`}>
                                Selanjutnya <ChevronRight size={18} />
                            </button>
                        )}
                    </div>

                    {/* Warning: soal belum semua terjawab */}
                    {isLast && !semuaTerjawab && (
                        <p className="text-center text-yellow-500/80 text-xs mt-4">
                            {totalSoal - terjawab} soal belum dijawab — jawab semua sebelum melihat hasil.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
