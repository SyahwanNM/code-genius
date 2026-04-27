<?php

namespace App\Fitur\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Fitur\Penjajakan\Models\SoalPenjajakan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSoalController extends Controller
{
    /**
     * Tampilkan daftar soal penjajakan.
     */
    public function indeks(Request $request)
    {
        $jalur = $request->query('jalur', 'semua');

        $query = SoalPenjajakan::orderBy('jalur')->orderBy('urutan');

        if ($jalur !== 'semua') {
            $query->where('jalur', $jalur);
        }

        $soal = $query->get();

        return Inertia::render('Admin/Soal/Indeks', [
            'soal'        => $soal,
            'filter_jalur'=> $jalur,
            'stats'       => [
                'total'    => SoalPenjajakan::count(),
                'frontend' => SoalPenjajakan::where('jalur', 'frontend')->count(),
                'backend'  => SoalPenjajakan::where('jalur', 'backend')->count(),
                'aktif'    => SoalPenjajakan::where('aktif', true)->count(),
            ],
        ]);
    }

    /**
     * Simpan soal baru.
     */
    public function simpan(Request $request)
    {
        $request->validate([
            'jalur'              => 'required|in:frontend,backend',
            'tipe'               => 'required|in:pilihan_ganda,kode',
            'difficulty_level'   => 'required|in:beginner,intermediate,advanced',
            'pertanyaan'         => 'required|string',
            'kode_pertanyaan'    => 'nullable|string',
            'opsi_a'             => 'nullable|string',
            'opsi_b'             => 'nullable|string',
            'opsi_c'             => 'nullable|string',
            'opsi_d'             => 'nullable|string',
            'jawaban_benar'      => 'required|string',
            'kata_kunci_jawaban' => 'nullable|string',
            'penjelasan'         => 'nullable|string',
            'bobot_skor'         => 'required|integer|min:1|max:100',
            'urutan'             => 'required|integer|min:0',
        ]);

        SoalPenjajakan::create($request->only([
            'jalur', 'tipe', 'difficulty_level', 'pertanyaan', 'kode_pertanyaan',
            'opsi_a', 'opsi_b', 'opsi_c', 'opsi_d',
            'jawaban_benar', 'kata_kunci_jawaban', 'penjelasan',
            'bobot_skor', 'urutan',
        ]));

        return back()->with('sukses', 'Soal berhasil ditambahkan.');
    }

    /**
     * Update soal yang ada.
     */
    public function update(Request $request, $id)
    {
        $soal = SoalPenjajakan::findOrFail($id);

        $request->validate([
            'jalur'              => 'required|in:frontend,backend',
            'tipe'               => 'required|in:pilihan_ganda,kode',
            'difficulty_level'   => 'required|in:beginner,intermediate,advanced',
            'pertanyaan'         => 'required|string',
            'kode_pertanyaan'    => 'nullable|string',
            'opsi_a'             => 'nullable|string',
            'opsi_b'             => 'nullable|string',
            'opsi_c'             => 'nullable|string',
            'opsi_d'             => 'nullable|string',
            'jawaban_benar'      => 'required|string',
            'kata_kunci_jawaban' => 'nullable|string',
            'penjelasan'         => 'nullable|string',
            'bobot_skor'         => 'required|integer|min:1|max:100',
            'urutan'             => 'required|integer|min:0',
            'aktif'              => 'boolean',
        ]);

        $soal->update($request->only([
            'jalur', 'tipe', 'difficulty_level', 'pertanyaan', 'kode_pertanyaan',
            'opsi_a', 'opsi_b', 'opsi_c', 'opsi_d',
            'jawaban_benar', 'kata_kunci_jawaban', 'penjelasan',
            'bobot_skor', 'urutan', 'aktif',
        ]));

        return back()->with('sukses', 'Soal berhasil diperbarui.');
    }

    /**
     * Hapus soal.
     */
    public function hapus($id)
    {
        $soal = SoalPenjajakan::findOrFail($id);
        $soal->delete();

        return back()->with('sukses', 'Soal berhasil dihapus.');
    }

    /**
     * Toggle status aktif soal.
     */
    public function toggleAktif($id)
    {
        $soal = SoalPenjajakan::findOrFail($id);
        $soal->update(['aktif' => !$soal->aktif]);

        return back()->with('sukses', 'Status soal diperbarui.');
    }
}
