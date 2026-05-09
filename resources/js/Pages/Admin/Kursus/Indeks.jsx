import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash, ChevronRight, Layers, Star, CheckCircle2, XCircle, BarChart, Map, BookOpen, X, Save, ChevronDown } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalKonfirmasi from '@/Components/Admin/ModalKonfirmasi';
import axios from 'axios';

export default function Indeks({ auth, semua_kursus: initialCourses }) {
    const [semua_kursus, setSemuaKursus] = useState(initialCourses);
    const [editTarget, setEditTarget] = useState(null);
    const [isEditProcessing, setIsEditProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        nama: '',
        level_kesulitan: 'beginner',
        jalur: 'frontend',
        ikon: '📘',
        deskripsi: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const res = await axios.post('/admin/kursus', data);
            setSemuaKursus(prev => [...prev, res.data]);
            setShowModal(false);
            setData({ nama: '', level_kesulitan: 'beginner', jalur: 'frontend', ikon: '📘', deskripsi: '' });
        } catch (err) {
            if (err.response?.data?.errors) setErrors(err.response.data.errors);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteClick = (id, nama) => setDeleteTarget({ id, nama });

    const confirmDelete = async () => {
        setIsProcessing(true);
        try {
            await axios.delete(`/admin/kursus/${deleteTarget.id}`);
            setSemuaKursus(prev => prev.filter(k => k.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            console.error("Gagal menghapus kursus:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    const updateCourse = async (e) => {
        e.preventDefault();
        setIsEditProcessing(true);
        try {
            const res = await axios.put(`/admin/kursus/${editTarget.id}`, editTarget);
            setSemuaKursus(prev => prev.map(k => k.id === editTarget.id ? res.data : k));
            setEditTarget(null);
        } catch (err) {
            console.error("Gagal update kursus:", err);
        } finally {
            setIsEditProcessing(false);
        }
    };

    const levelBadge = (level) => {
        if (level === 'beginner') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (level === 'intermediate') return 'bg-accent/10 text-accent border-accent/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    // Shared modal shell classes
    const modalShell = "relative w-full bg-[#0D1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300";
    const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all text-white text-sm placeholder-gray-700";
    const selectClass = "w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition-all text-white text-sm appearance-none";
    const labelClass = "block text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-2";

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Content Management" />

            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-10 max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Content <span className="bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent italic">Vault</span></h1>
                        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                            <BookOpen size={14} className="text-accent" />
                            Arsitektur kurikulum dan manajemen jalur pembelajaran Code Genius.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 shrink-0"
                    >
                        <Plus size={16} /> Create Course
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {semua_kursus.map((k) => (
                        <div key={k.id} className="group bg-[#0D1117] border border-white/5 rounded-[32px] overflow-hidden flex flex-col hover:border-accent/30 transition-all duration-500">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 rounded-[22px] bg-white/[0.03] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-white/5 text-accent">
                                        <BookOpen size={28} />
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setEditTarget(k)}
                                            className="p-2.5 rounded-xl text-gray-600 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(k.id, k.nama)}
                                            className="p-2.5 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[2px] border ${levelBadge(k.level_kesulitan)}`}>
                                            {k.level_kesulitan}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-white/5 text-gray-500 text-[8px] font-black uppercase tracking-[2px] border border-white/5">
                                            {k.jalur}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors duration-300">{k.nama}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{k.deskripsi}</p>
                                </div>
                                
                                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Layers size={14} className="text-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{k.modul_count || 0} Modul</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star size={14} className="text-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Premium</span>
                                    </div>
                                </div>
                            </div>
                            
                            <Link href={`/admin/kursus/${k.id}/materi`} className="mt-auto p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[3px] text-gray-500 group-hover:text-black transition-all group-hover:bg-accent">
                                <span>Master Curriculum</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Modal Create Course ── */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className={`${modalShell} max-w-xl w-full max-h-[90vh] flex flex-col`}>
                        {/* Sticky header */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 shrink-0">
                            <div>
                                <h2 className="text-lg font-black text-white">Create <span className="text-accent italic">Course</span></h2>
                                <p className="text-gray-600 text-[10px] font-medium mt-0.5">Definisikan kurikulum baru untuk platform</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="overflow-y-auto flex-1 px-7 py-6">
                            <form onSubmit={submit} id="form-create-course" className="space-y-5">
                                <div>
                                    <label className={labelClass}>Nama Kursus</label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={data.nama}
                                        onChange={e => setData({...data, nama: e.target.value})}
                                        placeholder="e.g. Advanced React Architecture"
                                    />
                                    {errors.nama && <p className="text-red-500 text-[10px] mt-1">{errors.nama[0]}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Difficulty Level</label>
                                        <div className="relative">
                                            <select className={selectClass} value={data.level_kesulitan} onChange={e => setData({...data, level_kesulitan: e.target.value})}>
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advanced">Advanced</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Learning Path</label>
                                        <div className="relative">
                                            <select className={selectClass} value={data.jalur} onChange={e => setData({...data, jalur: e.target.value})}>
                                                <option value="frontend">Frontend</option>
                                                <option value="backend">Backend</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Deskripsi Kursus</label>
                                    <textarea
                                        className={`${inputClass} min-h-[100px] resize-none`}
                                        value={data.deskripsi}
                                        onChange={e => setData({...data, deskripsi: e.target.value})}
                                        placeholder="Jelaskan apa yang akan dipelajari siswa..."
                                    />
                                    {errors.deskripsi && <p className="text-red-500 text-[10px] mt-1">{errors.deskripsi[0]}</p>}
                                </div>
                            </form>
                        </div>

                        {/* Sticky footer */}
                        <div className="flex gap-3 px-7 py-5 border-t border-white/5 shrink-0">
                            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs hover:text-white hover:bg-white/10 transition-all">
                                Batal
                            </button>
                            <button type="submit" form="form-create-course" disabled={isProcessing} className="flex-[2] py-3 rounded-xl bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50">
                                {isProcessing ? <><div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Menyimpan...</> : <><Save size={14} /> Deploy Course</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal Edit Course ── */}
            {editTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditTarget(null)} />
                    <div className={`${modalShell} max-w-xl w-full max-h-[90vh] flex flex-col`}>
                        {/* Sticky header */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 shrink-0">
                            <div>
                                <h2 className="text-lg font-black text-white">Edit <span className="text-accent italic">Course</span></h2>
                                <p className="text-gray-600 text-[10px] font-medium mt-0.5">Perbarui parameter kurikulum aktif</p>
                            </div>
                            <button onClick={() => setEditTarget(null)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="overflow-y-auto flex-1 px-7 py-6">
                            <form onSubmit={updateCourse} id="form-edit-course" className="space-y-5">
                                <div>
                                    <label className={labelClass}>Nama Kursus</label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editTarget.nama}
                                        onChange={e => setEditTarget({...editTarget, nama: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Difficulty Level</label>
                                        <div className="relative">
                                            <select className={selectClass} value={editTarget.level_kesulitan} onChange={e => setEditTarget({...editTarget, level_kesulitan: e.target.value})}>
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advanced">Advanced</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Learning Path</label>
                                        <div className="relative">
                                            <select className={selectClass} value={editTarget.jalur} onChange={e => setEditTarget({...editTarget, jalur: e.target.value})}>
                                                <option value="frontend">Frontend</option>
                                                <option value="backend">Backend</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Deskripsi Kursus</label>
                                    <textarea
                                        className={`${inputClass} min-h-[100px] resize-none`}
                                        value={editTarget.deskripsi}
                                        onChange={e => setEditTarget({...editTarget, deskripsi: e.target.value})}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Sticky footer */}
                        <div className="flex gap-3 px-7 py-5 border-t border-white/5 shrink-0">
                            <button type="button" onClick={() => setEditTarget(null)} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs hover:text-white hover:bg-white/10 transition-all">
                                Batal
                            </button>
                            <button type="submit" form="form-edit-course" disabled={isEditProcessing} className="flex-[2] py-3 rounded-xl bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50">
                                {isEditProcessing ? <><div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Menyimpan...</> : <><Save size={14} /> Simpan Perubahan</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ModalKonfirmasi 
                show={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
                processing={isProcessing}
                variant="danger"
                title="Hapus Kursus?"
                message={`Apakah Anda yakin ingin menghapus kursus "${deleteTarget?.nama}"? Seluruh modul dan materi di dalamnya akan terhapus permanen.`}
                confirmText="Ya, Hapus Kursus"
            />
        </AdminLayout>
    );
}
