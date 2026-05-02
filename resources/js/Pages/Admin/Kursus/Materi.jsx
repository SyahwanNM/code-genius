import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Plus, Edit, Trash, ChevronLeft, 
    Layers, Book, Code, GripVertical,
    CheckCircle2, XCircle, Save, Settings,
    FileText, Zap, MoreVertical
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalKonfirmasi from '@/Components/Admin/ModalKonfirmasi';
import axios from 'axios';

export default function Materi({ auth, kursus }) {
    const [modul, setModul] = useState(kursus.modul || []);
    const [isProcessing, setIsProcessing] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // { type, id, id_modul, judul }
    
    // Modal states
    const [showModulModal, setShowModulModal] = useState(false);
    const [modulData, setModulData] = useState({ id: null, judul: '', urutan: 1 });
    
    const [showMateriModal, setShowMateriModal] = useState(false);
    const [materiData, setMateriData] = useState({ 
        id: null, 
        id_modul: null, 
        judul: '', 
        konten: '', 
        tipe: 'teks', 
        contoh_kode: '', 
        jawaban_kode: '', 
        urutan: 1 
    });

    // --- MODUL ACTIONS ---
    const submitModul = async (e) => {
        e.preventDefault();
        try {
            if (modulData.id) {
                const res = await axios.put(`/admin/api/v1/modul/${modulData.id}`, modulData);
                setModul(prev => prev.map(m => m.id === modulData.id ? { ...m, ...res.data.data } : m));
            } else {
                const res = await axios.post('/admin/api/v1/modul', { ...modulData, id_kursus: kursus.id });
                setModul(prev => [...prev, { ...res.data.data, materi: [] }]);
            }
            setShowModulModal(false);
            setModulData({ id: null, judul: '', urutan: 1 });
        } catch (err) {
            console.error("Modul error:", err);
        }
    };

    const handleDeleteModulClick = (id, judul) => {
        setConfirmAction({ type: 'modul', id, judul });
    };

    const confirmDeleteModul = async () => {
        setIsProcessing(true);
        try {
            await axios.delete(`/admin/api/v1/modul/${confirmAction.id}`);
            setModul(prev => prev.filter(m => m.id !== confirmAction.id));
            setConfirmAction(null);
        } catch (err) {
            console.error("Delete modul error:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- MATERI ACTIONS ---
    const openMateriModal = (id_modul, existingMateri = null) => {
        if (existingMateri) {
            setMateriData({ ...existingMateri });
        } else {
            setMateriData({ 
                id: null, 
                id_modul, 
                judul: '', 
                konten: '', 
                tipe: 'teks', 
                contoh_kode: '', 
                jawaban_kode: '', 
                urutan: (modul.find(m => m.id === id_modul)?.materi?.length || 0) + 1 
            });
        }
        setShowMateriModal(true);
    };

    const submitMateri = async (e) => {
        e.preventDefault();
        try {
            if (materiData.id) {
                const res = await axios.put(`/admin/api/v1/materi/${materiData.id}`, materiData);
                setModul(prev => prev.map(m => {
                    if (m.id === materiData.id_modul) {
                        return { ...m, materi: m.materi.map(mat => mat.id === materiData.id ? res.data.data : mat) };
                    }
                    return m;
                }));
            } else {
                const res = await axios.post('/admin/api/v1/materi', materiData);
                setModul(prev => prev.map(m => {
                    if (m.id === materiData.id_modul) {
                        return { ...m, materi: [...(m.materi || []), res.data.data] };
                    }
                    return m;
                }));
            }
            setShowMateriModal(false);
        } catch (err) {
            console.error("Materi error:", err);
        }
    };

    const handleDeleteMateriClick = (id, id_modul, judul) => {
        setConfirmAction({ type: 'materi', id, id_modul, judul });
    };

    const confirmDeleteMateri = async () => {
        setIsProcessing(true);
        try {
            await axios.delete(`/admin/api/v1/materi/${confirmAction.id}`);
            setModul(prev => prev.map(m => {
                if (m.id === confirmAction.id_modul) {
                    return { ...m, materi: m.materi.filter(mat => mat.id !== confirmAction.id) };
                }
                return m;
            }));
            setConfirmAction(null);
        } catch (err) {
            console.error("Delete materi error:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleGlobalConfirm = () => {
        if (confirmAction?.type === 'modul') confirmDeleteModul();
        else if (confirmAction?.type === 'materi') confirmDeleteMateri();
    };

    return (
        <AdminLayout auth={auth}>
            <Head title={`Master Curriculum: ${kursus.nama}`} />

            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-5">
                        <Link href="/admin/kursus" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest border border-amber-500/20">Active Course</span>
                                <h1 className="text-2xl font-black text-white">{kursus.nama}</h1>
                            </div>
                            <p className="text-gray-500 text-xs font-medium">Pengaturan struktur modul, materi teori, dan tantangan kode.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            setModulData({ id: null, judul: '', urutan: modul.length + 1 });
                            setShowModulModal(true);
                        }}
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-amber-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20"
                    >
                        <Plus size={16} /> Add Module
                    </button>
                </div>

                {/* Modules List */}
                <div className="space-y-6">
                    {modul.length === 0 && (
                        <div className="py-20 text-center space-y-4 bg-white/[0.01] border border-dashed border-white/10 rounded-[32px]">
                            <Layers size={48} className="mx-auto text-gray-800" />
                            <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Belum ada modul dalam kursus ini.</p>
                        </div>
                    )}

                    {modul.sort((a, b) => a.urutan - b.urutan).map((m, idx) => (
                        <div key={m.id} className="bg-[#0D1117] border border-white/5 rounded-[32px] overflow-hidden group">
                            <div className="px-8 py-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-black text-xs">
                                        {idx + 1}
                                    </div>
                                    <h3 className="font-black text-white uppercase tracking-wider text-sm">{m.judul}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => openMateriModal(m.id)}
                                        className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                    >
                                        Add Material
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setModulData({ id: m.id, judul: m.judul, urutan: m.urutan });
                                            setShowModulModal(true);
                                        }}
                                        className="p-2 rounded-lg text-gray-600 hover:text-white transition-all"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteModulClick(m.id, m.judul)}
                                        className="p-2 rounded-lg text-gray-600 hover:text-red-500 transition-all"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 space-y-2">
                                {(m.materi || []).sort((a, b) => a.urutan - b.urutan).map((mat) => (
                                    <div key={mat.id} className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group/item">
                                        <div className="flex items-center gap-4">
                                            {mat.tipe === 'teks' ? (
                                                <FileText size={16} className="text-blue-500" />
                                            ) : (
                                                <Code size={16} className="text-amber-500" />
                                            )}
                                            <div>
                                                <p className="text-sm font-bold text-gray-300 group-hover/item:text-white transition-colors">{mat.judul}</p>
                                                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                    {mat.tipe === 'teks' ? 'Theory / Documentation' : 'Coding Challenge'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openMateriModal(m.id, mat)}
                                                className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteMateriClick(mat.id, m.id, mat.judul)}
                                                className="p-2 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {(m.materi || []).length === 0 && (
                                    <p className="text-center py-6 text-gray-700 text-[10px] font-bold uppercase tracking-[4px]">Empty Module</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Modul */}
            {showModulModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModulModal(false)} />
                    <div className="relative w-full max-w-lg bg-[#0D1117] border border-white/10 rounded-[40px] p-10 space-y-8 animate-in zoom-in-95">
                        <h2 className="text-2xl font-black text-white">{modulData.id ? 'Edit' : 'Add'} <span className="text-red-500">Module</span></h2>
                        <form onSubmit={submitModul} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Module Title</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white"
                                    value={modulData.judul}
                                    onChange={e => setModulData({...modulData, judul: e.target.value})}
                                    placeholder="e.g. Introduction to Backend Architecture"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Sequence Order</label>
                                <input 
                                    type="number" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white"
                                    value={modulData.urutan}
                                    onChange={e => setModulData({...modulData, urutan: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModulModal(false)} className="flex-1 py-4 rounded-2xl bg-white/5 text-gray-500 font-black uppercase tracking-widest text-[10px]">Cancel</button>
                                <button type="submit" className="flex-2 px-10 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px]">Save Module</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Materi */}
            {showMateriModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg" onClick={() => setShowMateriModal(false)} />
                    <div className="relative w-full max-w-4xl bg-[#0D1117] border border-white/10 rounded-[40px] p-8 lg:p-12 space-y-10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-white">{materiData.id ? 'Edit' : 'Add'} <span className="text-red-500">Material</span></h2>
                            <div className="flex bg-white/5 p-1 rounded-xl">
                                <button 
                                    onClick={() => setMateriData({...materiData, tipe: 'teks'})}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${materiData.tipe === 'teks' ? 'bg-red-500 text-white' : 'text-gray-500'}`}
                                >
                                    Theory
                                </button>
                                <button 
                                    onClick={() => setMateriData({...materiData, tipe: 'latihan'})}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${materiData.tipe === 'latihan' ? 'bg-amber-500 text-black' : 'text-gray-500'}`}
                                >
                                    Challenge
                                </button>
                            </div>
                        </div>

                        <form onSubmit={submitMateri} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Material Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white"
                                        value={materiData.judul}
                                        onChange={e => setMateriData({...materiData, judul: e.target.value})}
                                    />
                                </div>
                                
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Core Content (Markdown)</label>
                                    <textarea 
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all min-h-[200px] text-white text-sm leading-relaxed"
                                        value={materiData.konten}
                                        onChange={e => setMateriData({...materiData, konten: e.target.value})}
                                        placeholder="Use markdown for better formatting..."
                                    />
                                </div>

                                {materiData.tipe === 'latihan' && (
                                    <>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-amber-500/60">Starter Code</label>
                                            <textarea 
                                                className="w-full bg-[#05070A] border border-white/5 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all min-h-[150px] text-xs font-mono text-amber-400/80"
                                                value={materiData.contoh_kode}
                                                onChange={e => setMateriData({...materiData, contoh_kode: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[3px] text-emerald-500/60">Solution / Key Match</label>
                                            <textarea 
                                                className="w-full bg-[#05070A] border border-white/5 rounded-2xl py-4 px-6 focus:border-emerald-500 outline-none transition-all min-h-[150px] text-xs font-mono text-emerald-400/80"
                                                value={materiData.jawaban_kode}
                                                onChange={e => setMateriData({...materiData, jawaban_kode: e.target.value})}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Order</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white"
                                        value={materiData.urutan}
                                        onChange={e => setMateriData({...materiData, urutan: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setShowMateriModal(false)} className="flex-1 py-5 rounded-2xl bg-white/5 text-gray-400 font-black uppercase tracking-widest text-[10px]">Cancel</button>
                                <button type="submit" className="flex-[2] py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-2xl shadow-white/5">
                                    <Save size={14} className="inline mr-2" /> Save Material
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ModalKonfirmasi 
                show={!!confirmAction}
                onClose={() => setConfirmAction(null)}
                onConfirm={handleGlobalConfirm}
                processing={isProcessing}
                variant="danger"
                title={confirmAction?.type === 'modul' ? 'Hapus Modul?' : 'Hapus Materi?'}
                message={
                    confirmAction?.type === 'modul' 
                    ? `Apakah Anda yakin ingin menghapus modul "${confirmAction?.judul}"? Seluruh materi di dalamnya akan ikut terhapus.`
                    : `Apakah Anda yakin ingin menghapus materi "${confirmAction?.judul}"?`
                }
                confirmText={confirmAction?.type === 'modul' ? 'Ya, Hapus Modul' : 'Ya, Hapus Materi'}
            />
        </AdminLayout>
    );
}
