import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash, ChevronRight, Layers, Star, CheckCircle2, XCircle } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';


export default function Indeks({ auth, semua_kursus: initialCourses }) {
    const [semua_kursus, setSemuaKursus] = useState(initialCourses);
    const [toastMsg, setToastMsg] = useState(null);
    const [editTarget, setEditTarget] = useState(null); // { id, nama, deskripsi, ikon }
    const [isEditProcessing, setIsEditProcessing] = useState(false);

    const showToast = (msg, type = 'success') => {
        setToastMsg({ msg, type });
        setTimeout(() => setToastMsg(null), 3000);
    };
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [data, setData] = useState({
        nama: '',
        deskripsi: '',
        ikon: '🚀',
    });

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/admin/api/v1/kursus');
            setSemuaKursus(response.data.data);
        } catch (error) {
            showToast('Gagal memuat data', 'error');
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrors({});
        try {
            const res = await axios.post('/admin/api/v1/kursus', data);
            setSemuaKursus(prev => [...prev, res.data.data]);
            setShowModal(false);
            setData({ nama: '', deskripsi: '', ikon: '🚀' });
            showToast('Kursus baru berhasil ditambahkan!');
        } catch (error) {
            if (error.response?.status === 422) setErrors(error.response.data.errors || {});
        } finally {
            setIsProcessing(false);
        }
    };

    const deleteCourse = async (id, nama) => {
        if (!confirm(`Hapus kursus "${nama}" secara permanen?`)) return;
        try {
            await axios.delete(`/admin/api/v1/kursus/${id}`);
            setSemuaKursus(prev => prev.filter(k => k.id !== id));
            showToast(`Kursus "${nama}" berhasil dihapus!`);
        } catch {
            showToast('Gagal menghapus kursus.', 'error');
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
        } catch {
            showToast('Gagal memperbarui kursus.', 'error');
        } finally {
            setIsEditProcessing(false);
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Content Management" />

            {/* Toast */}
            {toastMsg && (
                <div className={`fixed bottom-8 right-8 z-[200] px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 animate-in slide-in-from-bottom-4 ${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-green-600'} text-white`}>
                    {toastMsg.type === 'error' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                    {toastMsg.msg}
                </div>
            )}
            
            <div className="px-6 lg:px-12 py-12 space-y-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">Content <span className="text-red-500 italic">Vault</span></h1>
                        <p className="text-gray-500 font-light">Kelola kurikulum, materi, dan roadmap pembelajaran.</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-red-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
                    >
                        <Plus size={18} /> Tambah Kursus Baru
                    </button>
                </header>

                {/* Kursus Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {semua_kursus.map((k) => (
                        <div key={k.id} className="group glass-card p-0 overflow-hidden border-white/5 bg-white/[0.02] flex flex-col">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                        {k.ikon}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditTarget({ id: k.id, nama: k.nama, deskripsi: k.deskripsi, ikon: k.ikon })}
                                            className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteCourse(k.id, k.nama)}
                                            className="p-2 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black mb-4 group-hover:text-red-500 transition-colors">{k.nama}</h3>
                                <p className="text-gray-500 text-xs font-light leading-relaxed mb-8 line-clamp-2 italic">{k.deskripsi}</p>
                                
                                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-700">
                                    <span className="flex items-center gap-2"><Layers size={14} className="text-red-500" /> {k.modul_count} Modul</span>
                                    <span className="flex items-center gap-2"><Star size={14} className="text-orange-500" /> 4.9 Rating</span>
                                </div>
                            </div>
                            
                            <Link href={`/admin/kursus/${k.id}/materi`} className="mt-auto p-6 bg-white/[0.03] border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-all">
                                Kelola Kurikulum & Materi <ChevronRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Tambah Kursus */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-xl glass-card p-10 space-y-8 animate-in zoom-in-95">
                        <h2 className="text-2xl font-black">Tambah <span className="text-red-500">Kursus</span></h2>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Nama Kursus</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all"
                                    value={data.nama}
                                    onChange={e => setData({...data, nama: e.target.value})}
                                    placeholder="Contoh: JavaScript Expert"
                                />
                                {errors.nama && <p className="text-red-500 text-xs">{errors.nama[0]}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Ikon (Emoji)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all"
                                    value={data.ikon}
                                    onChange={e => setData({...data, ikon: e.target.value})}
                                />
                                {errors.ikon && <p className="text-red-500 text-xs">{errors.ikon[0]}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Deskripsi Singkat</label>
                                <textarea 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-red-500 outline-none transition-all min-h-[120px] resize-none"
                                    value={data.deskripsi}
                                    onChange={e => setData({...data, deskripsi: e.target.value})}
                                />
                                {errors.deskripsi && <p className="text-red-500 text-xs">{errors.deskripsi[0]}</p>}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl bg-white/5 font-black uppercase tracking-widest text-[10px]">Batal</button>
                                <button type="submit" disabled={isProcessing} className="flex-2 px-12 py-4 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-500/20">
                                    {isProcessing ? 'Menyimpan...' : 'Simpan Kursus'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit Kursus */}
            {editTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditTarget(null)} />
                    <div className="relative w-full max-w-xl glass-card p-10 space-y-8 animate-in zoom-in-95">
                        <h2 className="text-2xl font-black">Edit <span className="text-orange-400">Kursus</span></h2>
                        <form onSubmit={updateCourse} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Nama Kursus</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-400 outline-none transition-all"
                                    value={editTarget.nama}
                                    onChange={e => setEditTarget({...editTarget, nama: e.target.value})}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Ikon (Emoji)</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-400 outline-none transition-all"
                                    value={editTarget.ikon}
                                    onChange={e => setEditTarget({...editTarget, ikon: e.target.value})}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-600">Deskripsi Singkat</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-400 outline-none transition-all min-h-[120px] resize-none"
                                    value={editTarget.deskripsi}
                                    onChange={e => setEditTarget({...editTarget, deskripsi: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setEditTarget(null)} className="flex-1 py-4 rounded-2xl bg-white/5 font-black uppercase tracking-widest text-[10px]">Batal</button>
                                <button type="submit" disabled={isEditProcessing} className="px-12 py-4 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-orange-500/20">
                                    {isEditProcessing ? 'Memperbarui...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
