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
        ]);

        $kursus = Kursus::create([
            'nama' => $request->nama,
            'slug' => Str::slug($request->nama),
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon,
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
        ]);

        $kursus = Kursus::findOrFail($id);
        $kursus->update([
            'nama' => $request->nama,
            'slug' => Str::slug($request->nama),
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon,
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
}
