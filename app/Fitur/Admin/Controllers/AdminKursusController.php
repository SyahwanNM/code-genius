<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Pembelajaran\Models\Kursus;
use App\Fitur\Pembelajaran\Models\Materi;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminKursusController extends Controller
{
    public function indeks()
    {
        $kursus = Kursus::withCount('modul')->get();
        
        return Inertia::render('Admin/Kursus/Indeks', [
            'semua_kursus' => $kursus
        ]);
    }

    public function simpan(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'ikon' => 'required|string',
        ]);

        Kursus::create([
            'nama' => $request->nama,
            'slug' => Str::slug($request->nama),
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon,
        ]);

        return redirect()->back()->with('success', 'Kursus baru berhasil ditambahkan!');
    }

    public function materi($id)
    {
        $kursus = Kursus::with('modul.materi')->findOrFail($id);
        
        return Inertia::render('Admin/Kursus/Materi', [
            'kursus' => $kursus
        ]);
    }
}
