<?php

namespace App\Fitur\Pembelajaran\Controllers;

use App\Fitur\Pembelajaran\Models\Kursus;
use App\Fitur\Pembelajaran\Models\Materi;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class KursusController extends Controller
{
    public function indeks()
    {
        $semua_kursus = Kursus::withCount('modul')->get();
        
        return Inertia::render('Pembelajaran/DaftarKursus', [
            'semua_kursus' => $semua_kursus,
        ]);
    }

    public function detail($slug_kursus)
    {
        $kursus = Kursus::where('slug', $slug_kursus)
            ->with(['modul' => function($q) {
                $q->orderBy('urutan')->with(['materi' => function($mq) {
                    $mq->orderBy('urutan');
                }]);
            }])
            ->firstOrFail();

        return Inertia::render('Pembelajaran/DetailKursus', [
            'kursus' => $kursus,
        ]);
    }

    public function materi($slug_kursus, $slug_materi)
    {
        $kursus = Kursus::where('slug', $slug_kursus)->firstOrFail();
        
        $materi = Materi::where('slug', $slug_materi)
            ->with(['modul.kursus'])
            ->firstOrFail();

        // Navigasi Sidebar
        $sidebar = Kursus::where('id', $kursus->id)
            ->with(['modul' => function($q) {
                $q->orderBy('urutan')->with(['materi' => function($mq) {
                    $mq->orderBy('urutan');
                }]);
            }])
            ->first();

        return Inertia::render('Pembelajaran/BacaMateri', [
            'kursus' => $kursus,
            'materi' => $materi,
            'sidebar' => $sidebar->modul,
        ]);
    }
}
