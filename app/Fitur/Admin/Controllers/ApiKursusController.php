<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Pembelajaran\Models\Kursus;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiKursusController extends Controller
{
    public function indeks()
    {
        $kursus = Kursus::withCount('modul')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $kursus
        ]);
    }

    public function simpan(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'ikon' => 'required|string',
            'jalur' => 'required|in:frontend,backend',
            'level_kesulitan' => 'required|in:beginner,intermediate,advanced',
        ]);

        $kursus = Kursus::create([
            'nama' => $request->nama,
            'slug' => Str::slug($request->nama),
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon,
            'jalur' => $request->jalur,
            'level_kesulitan' => $request->level_kesulitan,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Kursus berhasil ditambahkan',
            'data' => $kursus
        ], 201);
    }

    public function detail($id)
    {
        $kursus = Kursus::findOrFail($id);
        return response()->json([
            'status' => 'success',
            'data' => $kursus
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'ikon' => 'required|string',
            'jalur' => 'required|in:frontend,backend',
            'level_kesulitan' => 'required|in:beginner,intermediate,advanced',
        ]);

        $kursus = Kursus::findOrFail($id);
        $kursus->update([
            'nama' => $request->nama,
            'slug' => Str::slug($request->nama),
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon,
            'jalur' => $request->jalur,
            'level_kesulitan' => $request->level_kesulitan,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Kursus berhasil diperbarui',
            'data' => $kursus
        ]);
    }

    public function hapus($id)
    {
        $kursus = Kursus::findOrFail($id);
        $kursus->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Kursus berhasil dihapus'
        ]);
    }

    // --- MANAJEMEN MODUL ---

    public function simpanModul(Request $request)
    {
        $request->validate([
            'id_kursus' => 'required|exists:kursus,id',
            'judul' => 'required|string|max:255',
            'urutan' => 'required|integer',
        ]);

        $modul = \App\Fitur\Pembelajaran\Models\Modul::create($request->all());

        return response()->json(['status' => 'success', 'data' => $modul]);
    }

    public function updateModul(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'urutan' => 'required|integer',
        ]);

        $modul = \App\Fitur\Pembelajaran\Models\Modul::findOrFail($id);
        $modul->update($request->all());

        return response()->json(['status' => 'success', 'data' => $modul]);
    }

    public function hapusModul($id)
    {
        $modul = \App\Fitur\Pembelajaran\Models\Modul::findOrFail($id);
        $modul->delete();

        return response()->json(['status' => 'success', 'message' => 'Modul berhasil dihapus']);
    }

    // --- MANAJEMEN MATERI ---

    public function simpanMateri(Request $request)
    {
        $request->validate([
            'id_modul' => 'required|exists:modul,id',
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'tipe' => 'required|in:teks,latihan',
            'urutan' => 'required|integer',
        ]);

        $materi = \App\Fitur\Pembelajaran\Models\Materi::create([
            'id_modul' => $request->id_modul,
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . rand(100, 999),
            'konten' => $request->konten,
            'tipe' => $request->tipe,
            'contoh_kode' => $request->contoh_kode,
            'jawaban_kode' => $request->jawaban_kode,
            'urutan' => $request->urutan,
        ]);

        return response()->json(['status' => 'success', 'data' => $materi]);
    }

    public function updateMateri(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'tipe' => 'required|in:teks,latihan',
            'urutan' => 'required|integer',
        ]);

        $materi = \App\Fitur\Pembelajaran\Models\Materi::findOrFail($id);
        $materi->update([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . rand(100, 999),
            'konten' => $request->konten,
            'tipe' => $request->tipe,
            'contoh_kode' => $request->contoh_kode,
            'jawaban_kode' => $request->jawaban_kode,
            'urutan' => $request->urutan,
        ]);

        return response()->json(['status' => 'success', 'data' => $materi]);
    }

    public function hapusMateri($id)
    {
        $materi = \App\Fitur\Pembelajaran\Models\Materi::findOrFail($id);
        $materi->delete();

        return response()->json(['status' => 'success', 'message' => 'Materi berhasil dihapus']);
    }
}
