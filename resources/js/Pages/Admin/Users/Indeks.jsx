import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
    Trash2, Search, ChevronDown, Users, 
    Shield, User, Award, Filter, 
    MoreHorizontal, Mail, Calendar, 
    Zap
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalKonfirmasi from '@/Components/Admin/ModalKonfirmasi';
import axios from 'axios';

export default function Indeks({ auth, users: initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('Semua');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [processing, setProcessing] = useState(false);

    const roleMap = {
        'admin': 'Admin',
        'pengguna_biasa': 'Siswa',
        'mentor': 'Mentor'
    };

    const inverseRoleMap = {
        'Admin': 'admin',
        'Siswa': 'pengguna_biasa',
        'Mentor': 'mentor'
    };

    const filtered = users.filter(u => {
        const matchesSearch = (u.nama || '').toLowerCase().includes(search.toLowerCase()) ||
                             (u.email || '').toLowerCase().includes(search.toLowerCase());
        const matchesRole = filterRole === 'Semua' || roleMap[u.peran] === filterRole;
        return matchesSearch && matchesRole;
    });

    const changeRole = async (id, friendlyPeran) => {
        const peran = inverseRoleMap[friendlyPeran];
        try {
            await axios.put(`/admin/api/v1/users/${id}/role`, { peran });
            setUsers(prev => prev.map(u => u.id === id ? { ...u, peran } : u));
        } catch (err) {
            console.error("Gagal mengubah peran:", err);
        }
    };

    const handleDeleteClick = (id, nama) => {
        setDeleteTarget({ id, nama });
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setProcessing(true);
        try {
            await axios.delete(`/admin/api/v1/users/${deleteTarget.id}`);
            setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            console.error("Gagal menghapus user:", err);
        } finally {
            setProcessing(false);
        }
    };

    const stats = [
        { label: 'Total Siswa', count: users.filter(u => u.peran === 'pengguna_biasa').length, icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Total Admin', count: users.filter(u => u.peran === 'admin').length, icon: Shield, color: 'text-accent', bg: 'bg-accent/10' },
        { label: 'Total XP', count: users.reduce((acc, u) => acc + (u.xp || 0), 0), icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    const roleBadge = (peran) => {
        const p = peran?.toLowerCase();
        if (p === 'admin')  return 'bg-accent/10 border-accent/20 text-accent shadow-[0_0_15px_rgba(239,68,68,0.1)]';
        if (p === 'mentor') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Manage Users" />

            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                            User <span className="bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent italic">Management</span>
                        </h1>
                        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                            <Users size={14} className="text-accent" />
                            Total {users.length} entitas terdaftar dalam database platform.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search Bar */}
                        <div className="relative group">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent group-hover:scale-110 transition-all" />
                            <input
                                type="text"
                                placeholder="Cari nama atau email..."
                                className="bg-[#0D1117] border border-white/5 rounded-2xl py-2.5 pl-11 pr-6 text-xs w-full sm:w-72 focus:border-accent/50 focus:bg-[#121820] outline-none transition-all text-white placeholder-gray-600 shadow-inner"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <Filter size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <select 
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="appearance-none bg-[#0D1117] border border-white/5 rounded-2xl py-2.5 pl-10 pr-10 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/10 outline-none transition-all cursor-pointer"
                            >
                                <option value="Semua">Semua Peran</option>
                                <option value="Siswa">Siswa</option>
                                <option value="Mentor">Mentor</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-[#0D1117] border border-white/5 rounded-[24px] p-5 flex items-center gap-4 group hover:bg-[#121820] transition-all">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} ${s.color} shrink-0 group-hover:rotate-6 transition-transform`}>
                                <s.icon size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-white">{s.count.toLocaleString()}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mt-0.5">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Table */}
                <div className="bg-[#0D1117] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl shadow-black/50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.01]">
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[2px] text-gray-600">Identity</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[2px] text-gray-600 text-center">Status / Role</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[2px] text-gray-600 text-center">Performance</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[2px] text-gray-600 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((u) => (
                                    <tr key={u.id} className="group hover:bg-white/[0.01] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-black text-sm text-white border border-white/10 group-hover:scale-105 transition-transform shrink-0 shadow-lg">
                                                    {(u.nama || '?')[0]}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-xs text-white group-hover:text-accent transition-colors">{u.nama}</p>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={10} className="text-gray-700" />
                                                        <p className="text-[10px] text-gray-600 truncate">{u.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[1px] border ${roleBadge(u.peran)}`}>
                                                    {roleMap[u.peran] || u.peran}
                                                </span>
                                                <span className="text-[9px] text-gray-600 flex items-center gap-1 font-medium">
                                                    <Calendar size={9} /> {new Date(u.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex flex-col items-center p-2 rounded-xl bg-white/[0.01] border border-white/5 group-hover:border-white/10 transition-colors">
                                                <p className="text-xs font-black text-emerald-500 flex items-center gap-1">
                                                    <Award size={12} /> {u.xp || 0}
                                                </p>
                                                <p className="text-[9px] text-gray-600 font-bold mt-0.5 uppercase tracking-tighter">Lvl {u.level || 1}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="relative group/select">
                                                    <select
                                                        className="appearance-none bg-[#161B22] border border-white/5 rounded-lg py-1.5 pl-3 pr-8 text-[9px] font-black uppercase tracking-widest text-gray-500 outline-none focus:border-accent/50 focus:text-white transition-all cursor-pointer"
                                                        value={roleMap[u.peran] || u.peran}
                                                        onChange={(e) => changeRole(u.id, e.target.value)}
                                                    >
                                                        <option value="Siswa">Siswa</option>
                                                        <option value="Mentor">Mentor</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none group-hover/select:text-white transition-colors" />
                                                </div>
                                                
                                                {auth.pengguna.id !== u.id ? (
                                                    <button
                                                        onClick={() => handleDeleteClick(u.id, u.nama)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/5 text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                                                        title="Hapus pengguna"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                ) : (
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-800 cursor-not-allowed border border-white/5" title="Ini Anda">
                                                        <Shield size={14} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between px-6 py-3 bg-white/[0.01] rounded-2xl border border-white/5">
                    <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                        <Shield size={10} className="text-accent/50" /> System Integrity Verified
                    </p>
                    <div className="flex items-center gap-4 text-[9px] font-bold text-gray-700">
                        <span>Showing {filtered.length} Results</span>
                        <MoreHorizontal size={14} className="text-gray-800" />
                    </div>
                </div>
            </div>

            <ModalKonfirmasi 
                show={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
                processing={processing}
                variant="danger"
                title="Hapus Pengguna?"
                message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.nama}"? Seluruh data progres dan histori belajar pengguna ini akan hilang permanen.`}
                confirmText="Ya, Hapus Permanen"
            />
        </AdminLayout>
    );
}
