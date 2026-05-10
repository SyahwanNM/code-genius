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
                                <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest border border-accent/20">Active Course</span>
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
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
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
                                    <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-black text-xs">
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
                                                <Code size={16} className="text-accent" />
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
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModulModal(false)} />
                    <div className="relative w-full max-w-md bg-[#0D1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5">
                            <div>
                                <h2 className="text-lg font-black text-white">{modulData.id ? 'Edit' : 'Tambah'} <span className="text-accent italic">Module</span></h2>
                                <p className="text-gray-600 text-[10px] font-medium mt-0.5">{modulData.id ? 'Perbarui' : 'Buat'} struktur modul kurikulum</p>
                            </div>
                            <button onClick={() => setShowModulModal(false)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                <X size={16} />
                            </button>
                        </div>
                        {/* Body */}
                        <div className="px-7 py-6 space-y-5">
                            <form onSubmit={submitModul} id="form-modul" className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2">Judul Modul</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all text-white text-sm placeholder-gray-700"
                                        value={modulData.judul}
                                        onChange={e => setModulData({...modulData, judul: e.target.value})}
                                        placeholder="e.g. Introduction to Backend Architecture"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2">Urutan</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all text-white text-sm"
                                        value={modulData.urutan}
                                        onChange={e => setModulData({...modulData, urutan: e.target.value})}
                                    />
                                </div>
                            </form>
                        </div>
                        {/* Footer */}
                        <div className="flex gap-3 px-7 py-5 border-t border-white/5">
                            <button type="button" onClick={() => setShowModulModal(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs hover:text-white hover:bg-white/10 transition-all">Batal</button>
                            <button type="submit" form="form-modul" className="flex-[2] py-3 rounded-xl bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                                <Save size={14} /> Simpan Modul
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Materi */}
            {showMateriModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMateriModal(false)} />
                    <div className="relative w-full max-w-3xl bg-[#0D1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                        {/* Header sticky */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 shrink-0">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h2 className="text-lg font-black text-white">{materiData.id ? 'Edit' : 'Tambah'} <span className="text-accent italic">Material</span></h2>
                                    <p className="text-gray-600 text-[10px] font-medium mt-0.5">Konten teori atau tantangan kode</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Tipe toggle */}
                                <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
                                    <button 
                                        onClick={() => setMateriData({...materiData, tipe: 'teks'})}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${materiData.tipe === 'teks' ? 'bg-accent text-black' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        Theory
                                    </button>
                                    <button 
                                        onClick={() => setMateriData({...materiData, tipe: 'latihan'})}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${materiData.tipe === 'latihan' ? 'bg-accent text-black' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        Challenge
                                    </button>
                                </div>
                                <button onClick={() => setShowMateriModal(false)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable body */}
                        <div className="overflow-y-auto flex-1 px-7 py-6">
                            <form onSubmit={submitMateri} id="form-materi" className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2">Judul Materi</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all text-white text-sm placeholder-gray-700"
                                        value={materiData.judul}
                                        onChange={e => setMateriData({...materiData, judul: e.target.value})}
                                        placeholder="Judul materi yang deskriptif..."
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2">Konten (Markdown)</label>
                                    <textarea 
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all min-h-[160px] text-white text-sm leading-relaxed resize-none placeholder-gray-700"
                                        value={materiData.konten}
                                        onChange={e => setMateriData({...materiData, konten: e.target.value})}
                                        placeholder="Tulis konten dengan format Markdown..."
                                    />
                                </div>

                                {materiData.tipe === 'latihan' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-accent/50 mb-2">Starter Code</label>
                                            <textarea 
                                                className="w-full bg-[#05070A] border border-white/5 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all min-h-[130px] text-xs font-mono text-accent/70 resize-none"
                                                value={materiData.contoh_kode}
                                                onChange={e => setMateriData({...materiData, contoh_kode: e.target.value})}
                                                placeholder="// Kode awal untuk siswa..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[3px] text-emerald-500/50 mb-2">Solution / Key Match</label>
                                            <textarea 
                                                className="w-full bg-[#05070A] border border-white/5 rounded-xl py-3 px-4 focus:border-emerald-500 outline-none transition-all min-h-[130px] text-xs font-mono text-emerald-400/70 resize-none"
                                                value={materiData.jawaban_kode}
                                                onChange={e => setMateriData({...materiData, jawaban_kode: e.target.value})}
                                                placeholder="// Jawaban referensi..."
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="w-32">
                                    <label className="block text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2">Urutan</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all text-white text-sm"
                                        value={materiData.urutan}
                                        onChange={e => setMateriData({...materiData, urutan: e.target.value})}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Sticky footer */}
                        <div className="flex gap-3 px-7 py-5 border-t border-white/5 shrink-0">
                            <button type="button" onClick={() => setShowMateriModal(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs hover:text-white hover:bg-white/10 transition-all">Batal</button>
                            <button type="submit" form="form-materi" className="flex-[2] py-3 rounded-xl bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                                <Save size={14} /> Simpan Materi
                            </button>
                        </div>
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
