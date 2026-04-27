<?php

namespace App\Fitur\Beranda\Controllers;

use App\Http\Controllers\Controller;
use App\Fitur\Pembelajaran\Models\Kursus;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BerandaController extends Controller
{
    public function indeks()
    {
        return Inertia::render('Public/Beranda');
    }

    public function dashboard()
    {
        $user = Auth::user();

        // Jika Admin, lempar ke Dashboard Admin
        if (strtolower($user->peran) === 'admin') {
            return redirect()->route('admin.overview');
        }

        // Ambil kursus sesuai jalur & level user
        $query = Kursus::query();

        if ($user->jalur_belajar && $user->jalur_belajar !== 'umum') {
            $query->where(function ($q) use ($user) {
                $q->where('jalur', $user->jalur_belajar)
                  ->orWhere('jalur', 'umum');
            });
        }

        if ($user->level_pemahaman) {
            $query->where('level_kesulitan', $user->level_pemahaman);
        }

        $kursus_rekomendasi = $query->take(6)->get();
        $semua_kursus       = Kursus::all();

        return Inertia::render('Dashboard/Indeks', [
            'semua_kursus'       => $semua_kursus,
            'kursus_rekomendasi' => $kursus_rekomendasi,
        ]);
    }

    public function roadmap()
    {
        $user = Auth::user();

        // Ambil kursus yang sesuai jalur dan urutkan per level
        $kursus = Kursus::where(function ($q) use ($user) {
                $q->where('jalur', $user->jalur_belajar ?? 'frontend')
                  ->orWhere('jalur', 'umum');
            })
            ->orderByRaw("FIELD(level_kesulitan, 'beginner', 'intermediate', 'advanced')")
            ->get()
            ->groupBy('level_kesulitan');

        return Inertia::render('Pembelajaran/Roadmap', [
            'kursus_per_level' => $kursus,
        ]);
    }
}
