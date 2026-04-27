import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Trash2, Search, ChevronDown } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';

export default function Indeks({ auth, users: initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [toastMsg, setToastMsg] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToastMsg({ msg, type });
        setTimeout(() => setToastMsg(null), 3000);
    };

    const filtered = users.filter(u =>
        u.nama.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const changeRole = async (id, peran) => {
        try {
            await axios.put(`/admin/api/v1/users/${id}/role`, { peran });
            setUsers(prev => prev.map(u => u.id === id ? { ...u, peran } : u));
            showToast(`Peran berhasil diubah menjadi ${peran}`);
        } catch (err) {
            showToast('Gagal mengubah peran', 'error');
        }
    };

    const deleteUser = async (id, nama) => {
        if (!confirm(`Yakin ingin menghapus "${nama}" secara permanen?`)) return;
        try {
            await axios.delete(`/admin/api/v1/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
            showToast(`${nama} berhasil dihapus`);
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menghapus pengguna';
            showToast(msg, 'error');
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Manage Users" />

            {/* Toast Notification */}
            {toastMsg && (
                <div className={`fixed bottom-8 right-8 z-[200] px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 transition-all animate-in slide-in-from-bottom-4 ${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                    {toastMsg.type === 'error' ? '✗' : '✓'} {toastMsg.msg}
                </div>
            )}

            <div className="px-6 lg:px-12 py-12 space-y-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">Active <span className="text-red-500 italic">Learners</span></h1>
                        <p className="text-gray-500 font-light">Kelola seluruh {users.length} pengguna terdaftar di platform.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 w-full md:w-96 focus-within:border-red-500/50 transition-all">
                        <Search size={18} className="text-gray-600 shrink-0" />
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            className="bg-transparent border-none outline-none text-sm w-full font-light"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </header>

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Siswa', count: users.filter(u => u.peran?.toLowerCase() === 'siswa').length, color: 'text-primary' },
                        { label: 'Mentor', count: users.filter(u => u.peran?.toLowerCase() === 'mentor').length, color: 'text-secondary' },
                        { label: 'Admin', count: users.filter(u => u.peran?.toLowerCase() === 'admin').length, color: 'text-red-500' },
                    ].map((s, i) => (
                        <div key={i} className="glass-card py-4 px-6 bg-white/[0.02] border-white/5 flex items-center gap-4">
                            <span className={`text-2xl font-black ${s.color}`}>{s.count}</span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="glass-card overflow-hidden border-white/5 bg-white/[0.02]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[3px] text-gray-500">
                                    <th className="px-8 py-6">User</th>
                                    <th className="px-8 py-6 text-center">Role</th>
                                    <th className="px-8 py-6">Joined</th>
                                    <th className="px-8 py-6 text-right">Stats</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((u) => (
                                    <tr key={u.id} className="group hover:bg-white/[0.03] transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center font-black text-sm text-orange-400">
                                                    {u.nama[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{u.nama}</p>
                                                    <p className="text-[11px] text-gray-600">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                    u.peran?.toLowerCase() === 'admin' ? 'bg-red-500/10 border-red-500 text-red-500' :
                                                    u.peran?.toLowerCase() === 'mentor' ? 'bg-secondary/10 border-secondary text-secondary' :
                                                    'bg-primary/10 border-primary text-primary'
                                                }`}>
                                                    {u.peran}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-gray-500 font-light">
                                            {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <p className="text-sm font-black text-secondary">{u.xp || 0} XP</p>
                                            <p className="text-[10px] text-gray-600 font-bold">Lvl {u.level || 1}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="relative group/select">
                                                    <select
                                                        className="appearance-none bg-[#0B0E14] border border-white/10 rounded-xl py-2 pl-3 pr-8 text-[11px] font-bold text-gray-400 outline-none focus:border-red-500 transition-all cursor-pointer hover:border-white/30"
                                                        value={u.peran}
                                                        onChange={(e) => changeRole(u.id, e.target.value)}
                                                    >
                                                        <option value="Siswa">Siswa</option>
                                                        <option value="Mentor">Mentor</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                                </div>
                                                {auth.pengguna.id !== u.id && (
                                                    <button
                                                        onClick={() => deleteUser(u.id, u.nama)}
                                                        className="p-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20 text-gray-600 font-light">
                                            Tidak ada pengguna yang cocok dengan pencarian "{search}".
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
