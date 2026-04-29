import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Trash2, Search, ChevronDown, Users } from 'lucide-react';
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
            showToast(`Peran diubah menjadi ${peran}`);
        } catch {
            showToast('Gagal mengubah peran', 'error');
        }
    };

    const deleteUser = async (id, nama) => {
        if (!confirm(`Hapus "${nama}" secara permanen?`)) return;
        try {
            await axios.delete(`/admin/api/v1/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
            showToast(`${nama} berhasil dihapus`);
        } catch (err) {
            showToast(err.response?.data?.message || 'Gagal menghapus pengguna', 'error');
        }
    };

    const roleCounts = {
        siswa:  users.filter(u => u.peran?.toLowerCase() === 'siswa').length,
        mentor: users.filter(u => u.peran?.toLowerCase() === 'mentor').length,
        admin:  users.filter(u => u.peran?.toLowerCase() === 'admin').length,
    };

    const roleBadge = (peran) => {
        const p = peran?.toLowerCase();
        if (p === 'admin')  return 'bg-red-500/10 border-red-500/30 text-red-400';
        if (p === 'mentor') return 'bg-[#00b27b]/10 border-[#00b27b]/30 text-[#00b27b]';
        return 'bg-[#2348b7]/10 border-[#2348b7]/30 text-[#2348b7]';
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Kelola Pengguna" />

            {/* Toast */}
            {toastMsg && (
                <div className={`fixed bottom-6 right-4 sm:right-6 z-[200] px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-in slide-in-from-bottom-4 ${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-[#00b27b]'} text-white`}>
                    {toastMsg.type === 'error' ? '✗' : '✓'} {toastMsg.msg}
                </div>
            )}

            <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                            Kelola <span className="text-red-500">Pengguna</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">{users.length} pengguna terdaftar di platform.</p>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 bg-[#0D1117] border border-white/8 px-4 py-2.5 rounded-xl w-full sm:w-72 focus-within:border-white/20 transition-all">
                        <Search size={15} className="text-gray-600 shrink-0" />
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-600"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Role summary */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Siswa',  count: roleCounts.siswa,  color: 'text-[#2348b7]' },
                        { label: 'Mentor', count: roleCounts.mentor, color: 'text-[#00b27b]' },
                        { label: 'Admin',  count: roleCounts.admin,  color: 'text-red-400' },
                    ].map((s) => (
                        <div key={s.label} className="bg-[#0D1117] border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
                            <span className={`text-xl lg:text-2xl font-black ${s.color}`}>{s.count}</span>
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-[#0D1117] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-gray-600 text-left">Pengguna</th>
                                    <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-gray-600 text-left">Peran</th>
                                    <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-gray-600 text-left hidden md:table-cell">Bergabung</th>
                                    <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-gray-600 text-left hidden sm:table-cell">XP / Level</th>
                                    <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-gray-600 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                        {/* Pengguna */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center font-black text-sm text-orange-400 shrink-0">
                                                    {u.nama[0]}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm text-white truncate">{u.nama}</p>
                                                    <p className="text-[11px] text-gray-600 truncate">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Peran */}
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border whitespace-nowrap ${roleBadge(u.peran)}`}>
                                                {u.peran}
                                            </span>
                                        </td>
                                        {/* Bergabung */}
                                        <td className="px-5 py-4 text-xs text-gray-500 hidden md:table-cell whitespace-nowrap">
                                            {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        {/* XP / Level */}
                                        <td className="px-5 py-4 hidden sm:table-cell">
                                            <p className="text-sm font-black text-[#00b27b] leading-none">{u.xp || 0} XP</p>
                                            <p className="text-[10px] text-gray-600 font-bold mt-1">Lvl {u.level || 1}</p>
                                        </td>
                                        {/* Aksi */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <select
                                                        className="appearance-none bg-[#161B22] border border-white/8 rounded-lg py-1.5 pl-3 pr-7 text-[11px] font-semibold text-gray-400 outline-none focus:border-white/20 transition-all cursor-pointer"
                                                        value={u.peran}
                                                        onChange={(e) => changeRole(u.id, e.target.value)}
                                                    >
                                                        <option value="Siswa">Siswa</option>
                                                        <option value="Mentor">Mentor</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                    <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                                </div>
                                                {auth.pengguna.id !== u.id && (
                                                    <button
                                                        onClick={() => deleteUser(u.id, u.nama)}
                                                        className="p-1.5 rounded-lg text-gray-700 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                                        title="Hapus pengguna"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-16 text-gray-600 text-sm">
                                            Tidak ada pengguna yang cocok dengan "{search}".
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
