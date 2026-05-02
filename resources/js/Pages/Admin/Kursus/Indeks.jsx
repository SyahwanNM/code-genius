import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash, ChevronRight, Layers, Star, CheckCircle2, XCircle, BarChart, Map } from 'lucide-react';
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
        deskripsi: '',
        ikon: '🚀',
        jalur: 'frontend',
        level_kesulitan: 'beginner'
    });

    const submit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrors({});
        try {
            const res = await axios.post('/admin/api/v1/kursus', data);
            setSemuaKursus(prev => [res.data.data, ...prev]);
            setShowModal(false);
            setData({ nama: '', deskripsi: '', ikon: '🚀', jalur: 'frontend', level_kesulitan: 'beginner' });
        } catch (error) {
            if (error.response?.status === 422) setErrors(error.response.data.errors || {});
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteClick = (id, nama) => {
        setDeleteTarget({ id, nama });
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setIsProcessing(true);
        try {
            await axios.delete(`/admin/api/v1/kursus/${deleteTarget.id}`);
            setSemuaKursus(prev => prev.filter(k => k.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const updateCourse = async (e) => {
        e.preventDefault();
        setIsEditProcessing(true);
        try {
            const res = await axios.put(`/admin/api/v1/kursus/${editTarget.id}`, editTarget);
            setSemuaKursus(prev => prev.map(k => k.id === editTarget.id ? { ...k, ...res.data.data } : k));
            setEditTarget(null);
            showToast('Kursus berhasil diperbarui!');
        } catch (error) {
            if (error.response?.status === 422) setErrors(error.response.data.errors || {});
            else showToast('Gagal memperbarui kursus.', 'error');
        } finally {
            setIsEditProcessing(false);
        }
    };

    const levelBadge = (level) => {
        if (level === 'beginner') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (level === 'intermediate') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Content Management" />

            
            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-10 max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Content <span className="text-amber-500 italic">Vault</span></h1>
                        <p className="text-gray-500 text-sm font-medium">Arsitektur kurikulum dan manajemen jalur pembelajaran Code Genius.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5 shrink-0"
                    >
                        <Plus size={16} /> Create Course
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {semua_kursus.map((k) => (
                        <div key={k.id} className="group bg-[#0D1117] border border-white/5 rounded-[32px] overflow-hidden flex flex-col hover:border-red-500/30 transition-all duration-500">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 rounded-[22px] bg-white/[0.03] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-white/5">
                                        {k.ikon}
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
                                    <h3 className="text-2xl font-black text-white group-hover:text-red-500 transition-colors duration-300">{k.nama}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{k.deskripsi}</p>
                                </div>
                                
                                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Layers size={14} className="text-amber-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{k.modul_count || 0} Modul</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star size={14} className="text-amber-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Premium</span>
                                    </div>
                                </div>
                            </div>
                            
                            <Link href={`/admin/kursus/${k.id}/materi`} className="mt-auto p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[3px] text-gray-500 group-hover:text-black transition-all group-hover:bg-amber-500">
                                <span>Master Curriculum</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Create */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-2xl bg-[#0D1117] border border-white/10 rounded-[40px] p-10 lg:p-12 space-y-10 animate-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white">Create <span className="text-red-500">Course</span></h2>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Definisikan fundamental kurikulum baru</p>
                        </div>

                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Course Identity</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white"
                                    value={data.nama}
                                    onChange={e => setData({...data, nama: e.target.value})}
                                    placeholder="e.g. Advanced React Architecture"
                                />
                                {errors.nama && <p className="text-red-500 text-[10px] font-bold">{errors.nama[0]}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Difficulty Level</label>
                                <select 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white appearance-none"
                                    value={data.level_kesulitan}
                                    onChange={e => setData({...data, level_kesulitan: e.target.value})}
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Learning Path</label>
                                <select 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white appearance-none"
                                    value={data.jalur}
                                    onChange={e => setData({...data, jalur: e.target.value})}
                                >
                                    <option value="frontend">Frontend Development</option>
                                    <option value="backend">Backend Development</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Ikon (Emoji)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all text-white"
                                    value={data.ikon}
                                    onChange={e => setData({...data, ikon: e.target.value})}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Executive Summary</label>
                                <textarea 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all min-h-[120px] resize-none text-white text-sm"
                                    value={data.deskripsi}
                                    onChange={e => setData({...data, deskripsi: e.target.value})}
                                    placeholder="Jelaskan apa yang akan dipelajari siswa..."
                                />
                                {errors.deskripsi && <p className="text-red-500 text-[10px] font-bold">{errors.deskripsi[0]}</p>}
                            </div>

                            <div className="md:col-span-2 flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 rounded-2xl bg-white/5 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-white transition-all">Cancel</button>
                                <button type="submit" disabled={isProcessing} className="flex-[2] py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-2xl">
                                    {isProcessing ? 'Processing...' : 'Deploy Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit */}
            {editTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setEditTarget(null)} />
                    <div className="relative w-full max-w-2xl bg-[#0D1117] border border-white/10 rounded-[40px] p-10 lg:p-12 space-y-10 animate-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white">Refine <span className="text-amber-500">Course</span></h2>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Pembaruan parameter kurikulum aktif</p>
                        </div>

                        <form onSubmit={updateCourse} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Course Identity</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all text-white"
                                    value={editTarget.nama}
                                    onChange={e => setEditTarget({...editTarget, nama: e.target.value})}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Difficulty Level</label>
                                <select 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all text-white appearance-none"
                                    value={editTarget.level_kesulitan}
                                    onChange={e => setEditTarget({...editTarget, level_kesulitan: e.target.value})}
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Learning Path</label>
                                <select 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all text-white appearance-none"
                                    value={editTarget.jalur}
                                    onChange={e => setEditTarget({...editTarget, jalur: e.target.value})}
                                >
                                    <option value="frontend">Frontend Development</option>
                                    <option value="backend">Backend Development</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Ikon (Emoji)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all text-white"
                                    value={editTarget.ikon}
                                    onChange={e => setEditTarget({...editTarget, ikon: e.target.value})}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Executive Summary</label>
                                <textarea 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 focus:border-amber-500 outline-none transition-all min-h-[120px] resize-none text-white text-sm"
                                    value={editTarget.deskripsi}
                                    onChange={e => setEditTarget({...editTarget, deskripsi: e.target.value})}
                                />
                            </div>

                            <div className="md:col-span-2 flex gap-4 pt-4">
                                <button type="button" onClick={() => setEditTarget(null)} className="flex-1 py-5 rounded-2xl bg-white/5 text-gray-400 font-black uppercase tracking-widest text-[10px]">Cancel</button>
                                <button type="submit" disabled={isEditProcessing} className="flex-[2] py-5 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all shadow-2xl">
                                    {isEditProcessing ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
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
