import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Bell, Send, Info, AlertTriangle, CheckCircle, 
    History, User, Clock, Link as LinkIcon, Trash2, Users, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalKonfirmasi from '@/Components/Admin/ModalKonfirmasi';

export default function Indeks({ auth, broadcasts }) {
    const [selectedId, setSelectedId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        judul: '',
        pesan: '',
        tipe: 'info',
        tautan: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/notifikasi/kirim', {
            onSuccess: () => reset(),
        });
    };

    const confirmDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        router.delete(`/admin/notifikasi/${selectedId}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedId(null);
            },
        });
    };

    const getTipeStyles = (tipe) => {
        switch (tipe) {
            case 'peringatan': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'sukses': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            default: return 'bg-accent/10 text-accent border-accent/20';
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Manajemen Broadcast - Admin" />
            
            <div className="p-8 space-y-10">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Broadcast <span className="bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent italic">Center</span></h1>
                        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                            <Bell size={14} className="text-accent" />
                            Grup pengumuman massal untuk efisiensi komunikasi.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Blast */}
                    <div className="lg:col-span-1">
                        <form onSubmit={submit} className="glass-card p-8 bg-white/[0.02] border-white/5 space-y-6 sticky top-8">
                            <h2 className="text-sm font-black uppercase tracking-[3px] text-gray-400 flex items-center gap-3">
                                <Send size={16} className="text-accent" /> New Broadcast
                            </h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Judul Pengumuman</label>
                                    <input 
                                        type="text"
                                        placeholder="Contoh: Update Maintenance Sistem"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-accent outline-none transition-all font-medium"
                                        value={data.judul}
                                        onChange={e => setData('judul', e.target.value)}
                                    />
                                    {errors.judul && <p className="text-red-500 text-[10px] italic">{errors.judul}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Isi Pesan</label>
                                    <textarea 
                                        placeholder="Tulis detail pengumuman di sini..."
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-accent outline-none transition-all font-medium min-h-[120px] resize-none"
                                        value={data.pesan}
                                        onChange={e => setData('pesan', e.target.value)}
                                    />
                                    {errors.pesan && <p className="text-red-500 text-[10px] italic">{errors.pesan}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    {['info', 'peringatan', 'sukses'].map((tipe) => (
                                        <button
                                            key={tipe}
                                            type="button"
                                            onClick={() => setData('tipe', tipe)}
                                            className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                                                data.tipe === tipe 
                                                    ? getTipeStyles(tipe)
                                                    : 'bg-white/5 border-white/5 text-gray-600 hover:bg-white/10'
                                            }`}
                                        >
                                            {tipe}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Tautan Tujuan (Opsional)</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                                        <input 
                                            type="text"
                                            placeholder="/dashboard"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-accent outline-none transition-all font-medium"
                                            value={data.tautan}
                                            onChange={e => setData('tautan', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={processing}
                                className="w-full py-4 bg-accent text-black text-[10px] font-black uppercase tracking-[4px] rounded-xl hover:bg-accent-400 transition-all shadow-xl shadow-accent/10 active:scale-95 disabled:opacity-50"
                            >
                                Kirim Broadcast
                            </button>
                        </form>
                    </div>

                    {/* Riwayat Broadcast Terkelompok */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black uppercase tracking-[3px] text-gray-400 flex items-center gap-3">
                                <History size={16} className="text-accent" /> Session History
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {broadcasts.data?.map((b) => (
                                <div key={b.id} className="glass-card bg-white/[0.02] border-white/5 overflow-hidden group">
                                    <div 
                                        className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-all"
                                        onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                                    >
                                        <div className="flex gap-6 items-center">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getTipeStyles(b.tipe)}`}>
                                                {b.tipe === 'info' ? <Info size={18} /> : b.tipe === 'peringatan' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-black uppercase tracking-tight text-white flex items-center gap-2">
                                                    {b.judul}
                                                    {b.tautan && <ExternalLink size={10} className="text-gray-600" />}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-[10px] font-medium text-gray-600 flex items-center gap-1.5">
                                                        <Clock size={10} /> {new Date(b.created_at).toLocaleString()}
                                                    </span>
                                                    <span className="text-[10px] font-black text-accent uppercase flex items-center gap-1.5">
                                                        <Users size={10} /> {b.total_penerima} Penerima
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); confirmDelete(b.id); }}
                                                className="p-2.5 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="text-gray-700">
                                                {expandedId === b.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Detail View */}
                                    {expandedId === b.id && (
                                        <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-black/20 animate-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-4">
                                                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">Message Content</p>
                                                    <p className="text-xs text-gray-400 leading-relaxed font-medium">{b.pesan}</p>
                                                </div>
                                                {b.tautan && (
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-accent/70 italic">
                                                        <LinkIcon size={12} /> Redirect to: {b.tautan}
                                                    </div>
                                                )}
                                                <div className="pt-4 flex items-center justify-between">
                                                    <div className="flex -space-x-2">
                                                        {[...Array(Math.min(5, b.total_penerima))].map((_, i) => (
                                                            <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0B0E14] bg-white/10 flex items-center justify-center text-[8px] font-black text-gray-500">
                                                                S
                                                            </div>
                                                        ))}
                                                        {b.total_penerima > 5 && (
                                                            <div className="w-7 h-7 rounded-full border-2 border-[#0B0E14] bg-accent flex items-center justify-center text-[8px] font-black text-black">
                                                                +{b.total_penerima - 5}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">
                                                        Successfully delivered to all active students
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {broadcasts.data?.length === 0 && (
                                <div className="p-20 border border-dashed border-white/5 rounded-[40px] text-center">
                                    <p className="text-xs text-gray-700 font-medium italic">Belum ada riwayat broadcast sesi yang tercatat.</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Pagination */}
                        <div className="flex justify-center gap-2 pt-6">
                            {broadcasts.links?.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                                        link.active 
                                            ? 'bg-accent text-black' 
                                            : 'bg-white/5 text-gray-500 hover:bg-white/10'
                                    } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ModalKonfirmasi 
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                variant="danger"
                title="Hapus Sesi Broadcast"
                message="Menghapus sesi ini akan menghapus semua notifikasi terkait di sisi siswa. Tindakan ini tidak dapat dibatalkan."
                confirmText="Ya, Hapus Sesi & Notifikasi"
            />
        </AdminLayout>
    );
}
