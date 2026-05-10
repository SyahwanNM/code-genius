import React, { useState, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, Bot, Calculator, CheckCircle2, ChevronDown, ChevronRight,
    Code2, Globe, Hammer, ListChecks, Lightbulb, Play, RotateCcw,
    Sparkles, Wifi, X, Zap, AlertCircle, CheckCheck, HelpCircle, Plus, Edit2
} from 'lucide-react';
import axios from 'axios';
import UserLayout from '@/Layouts/UserLayout';

const ICON_MAP = {
    Calculator: <Calculator size={24} />,
    ListChecks: <ListChecks size={24} />,
    Globe: <Globe size={24} />,
    Wifi: <Wifi size={24} />,
    Plus: <Plus size={24} />,
};

/* ── STATUS CONFIG ── */
const STATUS_CFG = {
    bagus: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', Icon: CheckCheck, label: 'Kode Bagus!' },
    hampir: { color: 'text-accent', bg: 'bg-accent/10 border-accent/20', Icon: Zap, label: 'Hampir Benar!' },
    perlu_perbaikan: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', Icon: HelpCircle, label: 'Ada yang Perlu Diperbaiki' },
};

export default function LabKreatif({ auth, templates }) {
    /* ── STATE ── */
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [kode, setKode]                         = useState('');
    const [output, setOutput]                     = useState('');
    const [stepAktif, setStepAktif]               = useState(0);
    const [stepsSelesai, setStepsSelesai]         = useState([]);
    const [stepsOpen, setStepsOpen]               = useState(true);
    const [aiOpen, setAiOpen]                     = useState(false);
    const [aiLoading, setAiLoading]               = useState(false);
    const [aiData, setAiData]                     = useState(null);
    const [mobileTab, setMobileTab]               = useState('editor'); // 'steps' | 'editor'
    const [saveLoading, setSaveLoading]           = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [customProjectName, setCustomProjectName] = useState('');
    const [isEditingName, setIsEditingName]       = useState(false);

    /* ── HELPERS ── */
    const pilihTemplate = (tmpl) => {
        setSelectedTemplate(tmpl);
        setKode(tmpl.starter);
        setOutput('');
        setStepAktif(0);
        setStepsSelesai([]);
        setAiData(null);
        setAiOpen(false);
        setShowSuccessModal(false);
        setCustomProjectName(tmpl.nama);
        setIsEditingName(false);
    };

    const simpanProyek = async () => {
        if (!selectedTemplate) return;
        setSaveLoading(true);
        try {
            await axios.post('/lab/simpan', {
                id_template: selectedTemplate.id,
                nama_proyek: customProjectName || selectedTemplate.nama,
                bahasa: selectedTemplate.bahasa,
                kode: kode,
            });
            setShowSuccessModal(true);
        } catch (err) {
            alert('Gagal menyimpan proyek: ' + (err.response?.data?.pesan || err.message));
        } finally {
            setSaveLoading(false);
        }
    };

    const jalankanKode = useCallback(() => {
        if (!selectedTemplate) return;
        const isFrontend = selectedTemplate.bahasa.includes('HTML');
        if (isFrontend && kode.includes('<') && kode.includes('>')) {
            setOutput(kode);
        } else {
            try {
                let logs = [];
                const mock = { log: (...a) => logs.push(a.join(' ')), error: (...a) => logs.push('ERR: ' + a.join(' ')) };
                new Function('console', kode)(mock);
                setOutput(logs.join('\n') || '> Kode dijalankan (tanpa output)');
            } catch (err) {
                setOutput('Error: ' + err.message);
            }
        }
    }, [kode, selectedTemplate]);

    const resetKode = () => {
        if (!selectedTemplate) return;
        setKode(selectedTemplate.starter);
        setOutput('');
    };

    const toggleStepSelesai = (idx) => {
        setStepsSelesai(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const mintaHintAI = async () => {
        if (!selectedTemplate) return;
        const hasSteps = selectedTemplate.steps.length > 0;
        const step = hasSteps ? selectedTemplate.steps[stepAktif] : null;

        setAiOpen(true);
        setAiLoading(true);
        setAiData(null);
        try {
            const res = await axios.post('/lab/evaluasi', {
                kode_pengguna: kode,
                bahasa: selectedTemplate.bahasa,
                nama_proyek: customProjectName || selectedTemplate.nama,
                step_aktif: step?.judul || null,
                deskripsi_step: step?.deskripsi || null,
            });
            setAiData(res.data);
        } catch (err) {
            setAiData({ status: 'perlu_perbaikan', hint_1: 'Gagal menghubungi AI: ' + (err.response?.data?.pesan || err.message), hint_2: '', hint_3: '', pujian: '', pertanyaan_pemandu: '' });
        } finally {
            setAiLoading(false);
        }
    };

    const isFrontendOutput = selectedTemplate && selectedTemplate.bahasa.includes('HTML') && output.includes('<') && output.includes('>');
    const stepSkrg = selectedTemplate ? selectedTemplate.steps[stepAktif] : null;
    const statusCfg = aiData ? (STATUS_CFG[aiData.status] ?? STATUS_CFG.perlu_perbaikan) : null;

    /* ══════════════════════════════════════════
       TEMPLATE PICKER (belum pilih template)
    ══════════════════════════════════════════ */
    if (!selectedTemplate) {
        return (
            <UserLayout auth={auth}>
                <Head title="Lab Kreatif — Code Genius" />
                <div className="min-h-full bg-[#05070A] px-4 sm:px-6 lg:px-10 py-10">
                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 text-accent mb-4">
                            <div className="p-2 rounded-xl bg-accent/10 border border-accent/20">
                                <Hammer size={16} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[4px]">Creative Lab</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tight mb-4">
                                    Lab <span className="text-accent">Kreatif</span>
                                </h1>
                                <p className="text-gray-500 max-w-2xl font-bold uppercase text-[10px] tracking-[2px] leading-relaxed">
                                    Pilih template proyek, kerjakan step-by-step, dan minta bantuan AI jika menemui kendala — tanpa spoiler jawaban!
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    const freeProj = templates.find(t => t.id === 'proyek-bebas');
                                    if (freeProj) pilihTemplate(freeProj);
                                }}
                                className="group flex items-center gap-4 px-8 py-4 bg-accent text-black rounded-[24px] hover:bg-amber-400 transition-all shadow-2xl shadow-accent/20 active:scale-95"
                            >
                                <div className="w-5 h-5 rounded-xl bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus size={24} />
                                </div>
                                <p className="text-sm font-black uppercase italic tracking-tight">Tambah Proyek Baru</p>
                            </button>
                        </div>
                    </header>

                    {/* Template grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {templates.filter(t => t.id !== 'proyek-bebas').map((tmpl) => (
                            <button
                                key={tmpl.id}
                                onClick={() => pilihTemplate(tmpl)}
                                className="group text-left bg-[#0D1117] border border-white/5 rounded-[28px] overflow-hidden hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 flex flex-col"
                            >
                                {/* Visual top */}
                                <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-white/10 group-hover:text-accent/50 transition-all duration-500 group-hover:scale-110">
                                        {ICON_MAP[tmpl.ikon] ?? <Code2 size={24} />}
                                    </div>
                                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-400">
                                        {tmpl.bahasa}
                                    </span>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors mb-2">
                                        {tmpl.nama}
                                    </h3>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-5 flex-1">
                                        {tmpl.deskripsi}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">
                                            {tmpl.steps.length > 0 ? `${tmpl.steps.length} Step` : 'Tanpa Batas'}
                                        </span>
                                        <span className="text-accent/50 group-hover:text-accent transition-colors">
                                            <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full py-4 bg-white/[0.02] border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[3px] text-gray-500 group-hover:bg-accent group-hover:text-black transition-all">
                                    Mulai Proyek
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </UserLayout>
        );
    }

    /* ══════════════════════════════════════════
       WORKSPACE (sudah pilih template)
    ══════════════════════════════════════════ */
    return (
        <div className="flex flex-col h-screen bg-[#0B0E14] text-white overflow-hidden">
            <Head title={`${selectedTemplate.nama} — Lab Kreatif`} />

            {/* ── HEADER ── */}
            <header className="h-14 border-b border-white/5 flex items-center gap-2 px-3 lg:px-5 bg-[#0B0E14] shrink-0">
                <button
                    onClick={() => setSelectedTemplate(null)}
                    className="shrink-0 text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                    title="Kembali ke pilih template"
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="p-1.5 rounded-lg bg-accent/10 text-accent shrink-0">
                        <Hammer size={14} />
                    </div>
                    <div className="flex items-center gap-1.5 text-sm min-w-0">
                        {isEditingName && selectedTemplate.id === 'proyek-bebas' ? (
                            <input
                                autoFocus
                                className="bg-white/5 border border-accent/30 rounded px-2 py-0.5 text-white text-xs outline-none focus:ring-1 focus:ring-accent w-32 sm:w-48"
                                value={customProjectName}
                                onChange={(e) => setCustomProjectName(e.target.value)}
                                onBlur={() => setIsEditingName(false)}
                                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                            />
                        ) : (
                            <span className="font-bold text-white truncate shrink-0 max-w-[120px] sm:max-w-none flex items-center gap-2">
                                {customProjectName || selectedTemplate.nama}
                                {selectedTemplate.id === 'proyek-bebas' && (
                                    <button onClick={() => setIsEditingName(true)} className="text-gray-600 hover:text-accent transition-colors">
                                        <Edit2 size={12} />
                                    </button>
                                )}
                            </span>
                        )}
                        <span className="text-gray-600 shrink-0">·</span>
                        <span className="text-gray-400 text-xs truncate">
                            {selectedTemplate.steps.length > 0
                                ? `Step ${stepAktif + 1}/${selectedTemplate.steps.length}: ${stepSkrg?.judul}`
                                : 'Mode Proyek Bebas'}
                        </span>
                    </div>
                </div>

                <button
                    onClick={simpanProyek}
                    disabled={saveLoading}
                    className="shrink-0 ml-2 px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                >
                    {saveLoading ? 'Menyimpan...' : 'Selesaikan Proyek'}
                </button>

                {/* Mobile tab toggle */}
                {selectedTemplate.steps.length > 0 && (
                    <div className="shrink-0 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-black uppercase tracking-widest mr-2">
                        <Sparkles size={12} />
                        <span>{stepsSelesai.length}/{selectedTemplate.steps.length} Selesai</span>
                    </div>
                )}

                {/* Mobile tab toggle */}
                <div className="lg:hidden flex shrink-0 items-center bg-white/5 rounded-lg p-0.5 gap-0.5">
                    <button
                        onClick={() => setMobileTab('steps')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${mobileTab === 'steps' ? 'bg-accent text-black' : 'text-gray-500'}`}
                    >
                        <ListChecks size={12} />
                    </button>
                    <button
                        onClick={() => setMobileTab('editor')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${mobileTab === 'editor' ? 'bg-accent text-black' : 'text-gray-500'}`}
                    >
                        <Code2 size={12} />
                    </button>
                </div>
            </header>

            {/* ── BODY ── */}
            <div className="flex-1 flex overflow-hidden">

                {/* ═══ LEFT: GUIDED STEPS ═══ */}
                <aside className={`
                    bg-[#0B0E14] border-r border-white/5 flex flex-col shrink-0
                    ${mobileTab === 'steps' ? 'flex w-full' : 'hidden lg:flex lg:w-[280px]'}
                `}>
                    <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Panduan Langkah</span>
                        <button onClick={() => setStepsOpen(v => !v)} className="text-gray-600 hover:text-white transition-colors lg:hidden">
                            <ChevronDown size={16} className={`transition-transform ${stepsOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
                        {selectedTemplate.steps.length > 0 ? selectedTemplate.steps.map((step, idx) => {
                            const isActive = idx === stepAktif;
                            const isDone = stepsSelesai.includes(idx);
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setStepAktif(idx)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all group/step ${isActive
                                        ? 'border-accent/30 bg-accent/5'
                                        : isDone
                                            ? 'border-emerald-500/20 bg-emerald-500/5'
                                            : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black transition-all ${isDone
                                            ? 'bg-emerald-500 border-emerald-500 text-black'
                                            : isActive
                                                ? 'bg-accent border-accent text-black'
                                                : 'border-white/10 text-gray-600'
                                            }`}>
                                            {isDone ? <CheckCircle2 size={12} /> : idx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[11px] font-black uppercase tracking-widest leading-snug mb-1 ${isActive ? 'text-accent' : isDone ? 'text-emerald-400' : 'text-gray-400'}`}>
                                                {step.judul}
                                            </p>
                                            {isActive && (
                                                <p className="text-[11px] text-gray-500 leading-relaxed mt-2">
                                                    {step.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleStepSelesai(idx); }}
                                            className={`mt-3 w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDone
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20'
                                                }`}
                                        >
                                            {isDone ? '✓ Tandai Belum Selesai' : 'Tandai Selesai'}
                                        </button>
                                    )}
                                </button>
                            );
                        }) : (
                            <div className="p-8 text-center space-y-6">
                                <div className="w-16 h-16 rounded-[24px] bg-accent/5 border border-accent/10 flex items-center justify-center mx-auto text-accent/50">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[3px] text-accent mb-2">Proyek Bebas</p>
                                    <p className="text-[10px] text-gray-600 leading-relaxed font-bold uppercase tracking-widest">
                                        Tidak ada panduan langkah. Silakan berkreasi sepenuhnya!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Next step nav */}
                    {selectedTemplate.steps.length > 0 && (
                        <div className="px-4 py-4 border-t border-white/5 flex gap-2 shrink-0">
                            <button
                                onClick={() => setStepAktif(v => Math.max(0, v - 1))}
                                disabled={stepAktif === 0}
                                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                ← Prev
                            </button>
                            <button
                                onClick={() => setStepAktif(v => Math.min(selectedTemplate.steps.length - 1, v + 1))}
                                disabled={stepAktif === selectedTemplate.steps.length - 1}
                                className="flex-1 py-2.5 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </aside>

                {/* ═══ RIGHT: CODE EDITOR + OUTPUT ═══ */}
                <div className={`flex-1 flex flex-col overflow-hidden ${mobileTab === 'steps' ? 'hidden lg:flex' : 'flex'}`}>

                    {/* Mac titlebar */}
                    <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between shrink-0 bg-[#0D1117]">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">
                                {selectedTemplate.id}.html
                            </span>
                        </div>
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                            {selectedTemplate.bahasa}
                        </span>
                    </div>

                    {/* Textarea */}
                    <div className="flex-1 relative overflow-hidden">
                        <textarea
                            className="absolute inset-0 w-full h-full bg-transparent p-5 font-mono text-sm resize-none focus:outline-none text-gray-300 leading-relaxed"
                            value={kode}
                            onChange={(e) => setKode(e.target.value)}
                            spellCheck="false"
                            placeholder="// Tulis kode kamu di sini..."
                        />
                    </div>

                    {/* Output panel */}
                    <div className="h-[32%] min-h-[120px] border-t border-white/5 flex flex-col shrink-0">
                        <div className="h-9 bg-[#0B0E14] border-b border-white/5 flex items-center px-5 text-[9px] font-black uppercase tracking-widest text-gray-600 shrink-0">
                            OUTPUT PREVIEW
                        </div>
                        <div className="flex-1 bg-[#0B0E14] p-4 overflow-y-auto">
                            {output ? (
                                isFrontendOutput ? (
                                    <iframe
                                        title="preview"
                                        className="w-full h-full bg-white rounded-lg"
                                        srcDoc={output}
                                    />
                                ) : (
                                    <pre className="font-mono text-xs text-gray-400 whitespace-pre-wrap">{output}</pre>
                                )
                            ) : (
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-700">
                                    Klik "Jalankan" untuk melihat output...
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action bar */}
                    <div className="h-14 border-t border-white/5 bg-[#0B0E14] flex items-center justify-between px-4 shrink-0 gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={jalankanKode}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-accent/20 active:scale-95"
                            >
                                <Play size={13} fill="currentColor" />
                                <span>Jalankan</span>
                            </button>
                            <button
                                onClick={resetKode}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                            >
                                <RotateCcw size={13} />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        </div>
                        <button
                            onClick={mintaHintAI}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all shadow-xl shadow-accent/5 group/ai"
                        >
                            <Bot size={14} className="group-hover/ai:animate-bounce" />
                            <span className="hidden sm:inline">Minta Hint AI</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ AI HINT FLOATING PANEL ═══ */}
            {aiOpen && (
                <div className="fixed right-3 bottom-3 lg:right-6 lg:bottom-5 w-[calc(100%-1.5rem)] max-w-sm lg:max-w-[400px] max-h-[80vh] flex flex-col bg-[#161B22] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-[200] border border-white/10 overflow-hidden">
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0E14]/80 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-xl shadow-accent/30">
                                <Bot size={18} className="text-black" />
                            </div>
                            <div>
                                <p className="font-black text-[11px] text-white uppercase tracking-widest leading-none">AI Mentor</p>
                                <p className="text-[9px] text-accent font-black uppercase tracking-widest mt-1">
                                    {aiLoading ? 'Menganalisis...' : 'Hint Adaptif'}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setAiOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-all">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Panel body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[180px]">
                        {aiLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <div className="w-10 h-10 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[3px] animate-pulse">Analysing Code...</p>
                            </div>
                        ) : aiData ? (
                            <>
                                {/* Status badge */}
                                {statusCfg && (
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusCfg.bg} ${statusCfg.color}`}>
                                        <statusCfg.Icon size={13} />
                                        {statusCfg.label}
                                    </div>
                                )}

                                {/* Pujian */}
                                {aiData.pujian && (
                                    <p className="text-sm text-gray-300 leading-relaxed font-medium italic">
                                        "{aiData.pujian}"
                                    </p>
                                )}

                                {/* Hints */}
                                {[aiData.hint_1, aiData.hint_2, aiData.hint_3].filter(Boolean).map((hint, i) => (
                                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed">{hint}</p>
                                    </div>
                                ))}

                                {/* Pertanyaan pemandu */}
                                {aiData.pertanyaan_pemandu && (
                                    <div className="flex gap-3 p-3 rounded-xl bg-accent/5 border border-accent/20">
                                        <Lightbulb size={14} className="text-accent shrink-0 mt-0.5" />
                                        <p className="text-xs text-accent leading-relaxed font-medium">
                                            {aiData.pertanyaan_pemandu}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                                <AlertCircle size={32} className="text-gray-700" />
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Tidak ada data</p>
                            </div>
                        )}
                    </div>

                    <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 text-[8px] text-center text-gray-600 font-bold uppercase tracking-[3px] shrink-0">
                        Powered by Google Gemini · Hint Adaptif, Bukan Jawaban
                    </div>
                </div>
            )}
        </div>
    );
}
