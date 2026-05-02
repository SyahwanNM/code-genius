import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, X, Save, Brain, Monitor, Server, Code2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalKonfirmasi from '@/Components/Admin/ModalKonfirmasi';

const JALUR_OPTIONS = [
    { value: 'frontend', label: 'Frontend', icon: Monitor, color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
    { value: 'backend',  label: 'Backend',  icon: Server,  color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
];

const TIPE_OPTIONS = [
    { value: 'pilihan_ganda', label: 'Pilihan Ganda', desc: 'User memilih A/B/C/D' },
    { value: 'kode',          label: 'Soal Kode',      desc: 'User mengetik jawaban' },
];

const DIFFICULTY_OPTIONS = [
    { value: 'beginner', label: 'Beginner', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    { value: 'advanced', label: 'Advanced', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
];

const EMPTY_FORM = {
    jalur: 'frontend',
    tipe: 'pilihan_ganda',
    difficulty_level: 'beginner',
    pertanyaan: '',
    kode_pertanyaan: '',
    opsi_a: '',
    opsi_b: '',
    opsi_c: '',
    opsi_d: '',
    jawaban_benar: 'a',
    kata_kunci_jawaban: '',
    penjelasan: '',
    bobot_skor: 10,
    urutan: 0,
};

export default function SoalIndeks({ auth, soal, filter_jalur, stats }) {
    const [showModal, setShowModal]     = useState(false);
    const [editTarget, setEditTarget]   = useState(null);
    const [filterActive, setFilterActive] = useState(filter_jalur || 'semua');
    const [form, setForm]               = useState(EMPTY_FORM);
    const [processing, setProcessing]   = useState(false);
    const [deleteId, setDeleteId]       = useState(null);

    const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const openCreate = () => {
        setForm(EMPTY_FORM);
        setEditTarget(null);
        setShowModal(true);
    };

    const openEdit = (s) => {
        setForm({
            jalur: s.jalur,
            tipe: s.tipe || 'pilihan_ganda',
            difficulty_level: s.difficulty_level || 'beginner',
            pertanyaan: s.pertanyaan,
            kode_pertanyaan: s.kode_pertanyaan || '',
            opsi_a: s.opsi_a || '',
            opsi_b: s.opsi_b || '',
            opsi_c: s.opsi_c || '',
            opsi_d: s.opsi_d || '',
            jawaban_benar: s.jawaban_benar,
            kata_kunci_jawaban: s.kata_kunci_jawaban || '',
            penjelasan: s.penjelasan || '',
            bobot_skor: s.bobot_skor,
            urutan: s.urutan,
        });
        setEditTarget(s);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = { ...form };

        // Kosongkan opsi jika tipe kode
        if (form.tipe === 'kode') {
            payload.opsi_a = '';
            payload.opsi_b = '';
            payload.opsi_c = '';
            payload.opsi_d = '';
            payload.jawaban_benar = form.jawaban_benar;
        }

        if (editTarget) {
            router.put(`/admin/soal-penjajakan/${editTarget.id}`, payload, {
                onSuccess: () => { setShowModal(false); setProcessing(false); },
                onError:   () => setProcessing(false),
            });
        } else {
            router.post('/admin/soal-penjajakan', payload, {
                onSuccess: () => { setShowModal(false); setProcessing(false); },
                onError:   () => setProcessing(false),
            });
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        setProcessing(true);
        router.delete(`/admin/soal-penjajakan/${deleteId}`, {
            onSuccess: () => {
                setDeleteId(null);
                setProcessing(false);
            },
            onFinish: () => setProcessing(false)
        });
    };

    const handleToggle = (id) => router.patch(`/admin/soal-penjajakan/${id}/toggle`);

    const handleFilter = (f) => {
        setFilterActive(f);
        router.get('/admin/soal-penjajakan', { jalur: f }, { preserveState: true });
    };

    const isKode = form.tipe === 'kode';

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin: Soal Penjajakan" />

            <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-2">
                            <Brain className="text-amber-400" size={24} />
                            Soal <span className="text-amber-400">Penjajakan</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Kelola soal tes penjajakan — <span className="text-white font-semibold">pilihan ganda</span> dan <span className="text-blue-400 font-semibold">soal kode</span>.
                        </p>
                    </div>
                    <button
                        id="btn-tambah-soal"
                        onClick={openCreate}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 shrink-0"
                    >
                        <Plus size={16} /> Tambah Soal
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Total Soal', val: stats.total,    color: 'text-white',      bg: 'bg-white/5' },
                        { label: 'Frontend',   val: stats.frontend, color: 'text-blue-400',   bg: 'bg-blue-500/10' },
                        { label: 'Backend',    val: stats.backend,  color: 'text-amber-400', bg: 'bg-amber-500/10' },
                        { label: 'Aktif',      val: stats.aktif,    color: 'text-green-400',  bg: 'bg-green-500/10' },
                    ].map((s, i) => (
                        <div key={i} className={`p-4 lg:p-5 rounded-xl border border-white/5 ${s.bg}`}>
                            <p className="text-xl lg:text-2xl font-black text-white">{s.val}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${s.color}`}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filter */}
                <div className="flex gap-3 flex-wrap">
                    {[{ value: 'semua', label: 'Semua' }, ...JALUR_OPTIONS.map(j => ({ value: j.value, label: j.label }))].map(f => (
                        <button key={f.value} onClick={() => handleFilter(f.value)}
                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border
                                ${filterActive === f.value ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-[#0D1117] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm" style={{ minWidth: '640px' }}>
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600">#</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600">Pertanyaan</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600">Jalur</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600">Tipe</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600 hidden md:table-cell">Level</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600 hidden lg:table-cell">Jawaban</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600 hidden sm:table-cell">Skor</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600">Status</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {soal.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center py-16 text-gray-600 text-sm">
                                            Belum ada soal. Klik <span className="text-violet-400 font-bold">Tambah Soal</span> untuk mulai.
                                        </td>
                                    </tr>
                                ) : soal.map((s, i) => {
                                    const jalurCfg = JALUR_OPTIONS.find(j => j.value === s.jalur);
                                    const isKodeTipe = s.tipe === 'kode';
                                    const diffCfg = DIFFICULTY_OPTIONS.find(d => d.value === (s.difficulty_level || 'beginner'));
                                    return (
                                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-4 py-3 text-gray-600 font-bold text-xs">{s.urutan || i + 1}</td>
                                            <td className="px-4 py-3 max-w-[200px] lg:max-w-xs">
                                                <p className="line-clamp-2 leading-snug text-sm text-gray-300">{s.pertanyaan}</p>
                                                {s.kode_pertanyaan && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 mt-1 font-mono">
                                                        <Code2 size={10} /> kode
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap ${jalurCfg?.bg} ${jalurCfg?.color} border ${jalurCfg?.border}`}>
                                                    {jalurCfg?.label || s.jalur}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap ${
                                                    isKodeTipe ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-gray-400 border border-white/10'
                                                }`}>
                                                    {isKodeTipe ? 'Kode' : 'PG'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap border ${diffCfg?.bg} ${diffCfg?.color} ${diffCfg?.border}`}>
                                                    {diffCfg?.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 hidden lg:table-cell">
                                                {isKodeTipe ? (
                                                    <span className="text-xs text-gray-500 font-mono max-w-[100px] truncate block">{s.kata_kunci_jawaban || s.jawaban_benar}</span>
                                                ) : (
                                                    <span className="w-6 h-6 rounded-md bg-green-500/20 text-green-400 font-black text-xs flex items-center justify-center uppercase">
                                                        {s.jawaban_benar}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell">
                                                <span className="text-yellow-400 font-bold text-sm">+{s.bobot_skor}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleToggle(s.id)}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                                                        s.aktif
                                                            ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20'
                                                            : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {s.aktif
                                                        ? <><ToggleRight size={14} /> Aktif</>
                                                        : <><ToggleLeft size={14} /> Nonaktif</>
                                                    }
                                                </button>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => openEdit(s)}
                                                        className="p-1.5 rounded-lg text-gray-600 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                                        title="Edit soal"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(s.id)}
                                                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                                        title="Hapus soal"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Modal Konfirmasi Hapus */}
            <ModalKonfirmasi 
                show={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
                processing={processing}
                variant="danger"
                title="Hapus Soal?"
                message="Tindakan ini tidak dapat dibatalkan. Soal yang dihapus akan hilang dari bank soal dan tes penjajakan siswa."
                confirmText="Ya, Hapus Soal"
            />

            {/* ── MODAL ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-2xl bg-[#0f1219] border border-white/10 rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto">
                        
                        {/* Modal Header */}
                        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-[#0f1219] z-10">
                            <h2 className="text-xl font-black">{editTarget ? 'Edit Soal' : 'Tambah Soal Baru'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/10 text-gray-400"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Jalur */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-3">Jalur</label>
                                <div className="flex gap-3">
                                    {JALUR_OPTIONS.map(j => (
                                        <button key={j.value} type="button" onClick={() => setField('jalur', j.value)}
                                            className={`flex-1 flex items-center gap-2 p-3 rounded-2xl border-2 font-bold text-sm transition-all
                                                ${form.jalur === j.value ? `${j.bg} ${j.border} ${j.color}` : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                            <j.icon size={18} /> {j.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tipe Soal */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-3">Tipe Soal</label>
                                <div className="flex gap-3">
                                    {TIPE_OPTIONS.map(t => (
                                        <button key={t.value} type="button" onClick={() => setField('tipe', t.value)}
                                            className={`flex-1 text-left p-4 rounded-2xl border-2 transition-all
                                                ${form.tipe === t.value ? 'bg-violet-500/15 border-violet-500/50 text-violet-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}>
                                            <div className="text-lg mb-1">{t.icon}</div>
                                            <div className="font-black text-sm">{t.label}</div>
                                            <div className="text-[11px] opacity-60 mt-0.5">{t.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty Level */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-3">Tingkat Kesulitan</label>
                                <div className="flex gap-3">
                                    {DIFFICULTY_OPTIONS.map(d => (
                                        <button key={d.value} type="button" onClick={() => setField('difficulty_level', d.value)}
                                            className={`flex-1 p-3 rounded-2xl border-2 font-bold text-sm transition-all
                                                ${form.difficulty_level === d.value ? `${d.bg} ${d.border} ${d.color}` : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pertanyaan */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-2">Pertanyaan / Instruksi</label>
                                <textarea value={form.pertanyaan} onChange={e => setField('pertanyaan', e.target.value)} rows={3}
                                    placeholder="Tulis pertanyaan atau instruksi soal..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-violet-500 outline-none transition-all resize-none" />
                            </div>

                            {/* Kode Pertanyaan (untuk semua tipe, opsional) */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-2">
                                    Code Snippet <span className="text-gray-600 normal-case font-normal">(opsional — ditampilkan sebagai blok kode)</span>
                                </label>
                                <textarea value={form.kode_pertanyaan} onChange={e => setField('kode_pertanyaan', e.target.value)} rows={4}
                                    placeholder="// Tulis kode yang akan ditampilkan sebagai konteks soal..."
                                    className="w-full bg-[#0a0d14] border border-white/10 rounded-2xl px-4 py-3 text-sm text-green-300 font-mono focus:border-violet-500 outline-none transition-all resize-none" />
                            </div>

                            {/* Opsi A-D (hanya untuk pilihan ganda) */}
                            {!isKode && (
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-3">Pilihan Jawaban</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {['a', 'b', 'c', 'd'].map((k, i) => (
                                            <div key={k} className="flex items-center gap-3">
                                                <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center font-black text-sm
                                                    ${form.jawaban_benar === k ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-white/5 text-gray-500'}`}>
                                                    {k.toUpperCase()}
                                                </div>
                                                <input type="text" value={form[`opsi_${k}`]} onChange={e => setField(`opsi_${k}`, e.target.value)}
                                                    placeholder={`Opsi ${k.toUpperCase()}...`}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm focus:border-violet-500 outline-none transition-all" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Jawaban Benar */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-3">
                                    {isKode ? 'Jawaban Benar / Contoh Jawaban' : 'Jawaban Benar'}
                                </label>
                                {!isKode ? (
                                    <div className="flex gap-3">
                                        {['a', 'b', 'c', 'd'].map(k => (
                                            <button key={k} type="button" onClick={() => setField('jawaban_benar', k)}
                                                className={`w-12 h-12 rounded-2xl font-black uppercase transition-all
                                                    ${form.jawaban_benar === k ? 'bg-green-500/20 border-2 border-green-500 text-green-400' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-white'}`}>
                                                {k}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <input type="text" value={form.jawaban_benar} onChange={e => setField('jawaban_benar', e.target.value)}
                                        placeholder="Contoh: 35, atau: SELECT COUNT(*) FROM pengguna"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-mono focus:border-green-500 outline-none transition-all" />
                                )}
                            </div>

                            {/* Kata Kunci Jawaban (khusus tipe kode) */}
                            {isKode && (
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-2">
                                        Kata Kunci Penilaian <span className="text-gray-600 normal-case font-normal">(pisahkan dengan koma)</span>
                                    </label>
                                    <input type="text" value={form.kata_kunci_jawaban} onChange={e => setField('kata_kunci_jawaban', e.target.value)}
                                        placeholder="Contoh: count, select  —  SEMUA kata kunci harus ada di jawaban user"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-mono focus:border-violet-500 outline-none transition-all" />
                                    <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                                        ⚡ Sistem akan cek apakah semua kata kunci ini ada di jawaban user (case-insensitive).
                                        Jika kosong, akan dilakukan exact match dengan "Jawaban Benar".
                                    </p>
                                </div>
                            )}

                            {/* Penjelasan & Bobot */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-2">Penjelasan (opsional)</label>
                                    <input type="text" value={form.penjelasan} onChange={e => setField('penjelasan', e.target.value)}
                                        placeholder="Jelaskan kenapa jawaban ini benar..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-violet-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-[3px] text-gray-500 mb-2">Bobot Skor</label>
                                    <input type="number" min={1} max={100} value={form.bobot_skor} onChange={e => setField('bobot_skor', parseInt(e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-violet-500 outline-none transition-all" />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-2xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-all">
                                    Batal
                                </button>
                                <button type="submit" disabled={processing}
                                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                    <Save size={16} />
                                    {processing ? 'Menyimpan...' : editTarget ? 'Simpan Perubahan' : 'Tambah Soal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
