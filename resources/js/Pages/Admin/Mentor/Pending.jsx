import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { UserCheck, UserX, ExternalLink, Mail, Clock, ShieldOff, CheckCircle2, XCircle } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';

export default function Pending({ auth, pengajuan: initialPengajuan }) {
    const [pengajuan, setPengajuan] = useState(initialPengajuan);
    const [processing, setProcessing] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToastMsg({ msg, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    const handleDecision = async (id, action) => {
        setProcessing(id + action);
        try {
            const endpoint = `/admin/api/v1/mentor/${id}/${action}`;
            await axios.post(endpoint);

            // Hapus dari daftar setelah keputusan
            setPengajuan(prev => prev.filter(p => p.id !== id));
            showToast(action === 'approve' ? 'Mentor berhasil disetujui! Akses penuh diberikan.' : 'Pengajuan mentor telah ditolak.');
        } catch (err) {
            showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            setProcessing(null);
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Mentor Applications" />

            {/* Toast Notification */}
            {toastMsg && (
                <div className={`fixed bottom-8 right-8 z-[200] px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 animate-in slide-in-from-bottom-4 ${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-green-600'} text-white`}>
                    {toastMsg.type === 'error' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                    {toastMsg.msg}
                </div>
            )}

            <div className="px-6 lg:px-12 py-12 space-y-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">Mentor <span className="text-red-500 italic">Academy</span></h1>
                        <p className="text-gray-500 font-light">Tinjau dan seleksi calon mentor profesional.</p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                        <Clock size={16} className="text-orange-500" />
                        <span className="text-orange-500 font-black text-sm">{pengajuan.length} Pending</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6">
                    {pengajuan.length > 0 ? pengajuan.map((p) => (
                        <div key={p.id} className="glass-card p-8 lg:p-10 bg-white/[0.02] border-white/5 hover:border-orange-500/20 transition-all duration-300">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">

                                {/* Applicant Info */}
                                <div className="flex items-center gap-6 lg:w-64 shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-black italic shadow-lg shadow-orange-500/20 shrink-0">
                                        {p.nama[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black mb-1">{p.nama}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-2">
                                            <Mail size={12} className="text-red-500" /> {p.email}
                                        </p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-700">
                                            Applied {new Date(p.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                {/* Motivation & Portfolio */}
                                <div className="flex-1 lg:border-l lg:border-white/5 lg:pl-10">
                                    <p className="text-[10px] font-black uppercase tracking-[4px] text-orange-500 mb-4">Motivasi & Portofolio</p>
                                    <blockquote className="text-gray-300 font-light leading-relaxed italic mb-5 text-sm max-w-2xl">
                                        "{p.motivasi || 'Tidak ada motivasi yang dituliskan.'}"
                                    </blockquote>
                                    {p.portofolio && (
                                        <a
                                            href={p.portofolio}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-black text-secondary hover:underline"
                                        >
                                            <ExternalLink size={14} /> Lihat Portofolio
                                        </a>
                                    )}
                                </div>

                                {/* Decision Buttons */}
                                <div className="flex flex-row lg:flex-col gap-3 lg:w-44 shrink-0">
                                    <button
                                        onClick={() => handleDecision(p.id, 'approve')}
                                        disabled={processing === p.id + 'approve'}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-green-500 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <UserCheck size={16} />
                                        {processing === p.id + 'approve' ? 'Processing...' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleDecision(p.id, 'reject')}
                                        disabled={processing === p.id + 'reject'}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <UserX size={16} />
                                        {processing === p.id + 'reject' ? 'Processing...' : 'Reject'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="py-40 flex flex-col items-center justify-center text-center glass-card border-white/5 bg-white/[0.01]">
                            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-gray-700 mb-6">
                                <ShieldOff size={40} />
                            </div>
                            <h2 className="text-xl font-black text-gray-500 mb-2">Semua Sudah Diproses</h2>
                            <p className="text-sm text-gray-700 font-light">Tidak ada pengajuan mentor baru yang menunggu tinjauan.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
