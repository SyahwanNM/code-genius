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
        $pengguna = auth()->user();
        $kursus = Kursus::where('slug', $slug_kursus)
            ->with(['modul' => function($q) {
                $q->orderBy('urutan')->with(['materi' => function($mq) {
                    $mq->orderBy('urutan');
                }]);
            }])
            ->firstOrFail();

        // Ambil ID materi yang sudah diselesaikan user
        $materiSelesai = \Illuminate\Support\Facades\DB::table('progres_materi')
            ->where('id_pengguna', $pengguna->id)
            ->pluck('id_materi')
            ->toArray();

        // Tentukan status terkunci untuk setiap modul
        $modulSebelumnyaSelesai = true;
        foreach ($kursus->modul as $m) {
            $m->terkunci = !$modulSebelumnyaSelesai;
            
            // Cek apakah modul ini sudah selesai (semua materinya ada di $materiSelesai)
            $totalMateriModul = $m->materi->count();
            $materiModulSelesai = $m->materi->whereIn('id', $materiSelesai)->count();
            $m->selesai = ($totalMateriModul > 0 && $totalMateriModul === $materiModulSelesai);
            
            // Beri status selesai pada tiap materi
            foreach ($m->materi as $mt) {
                $mt->selesai = in_array($mt->id, $materiSelesai);
            }

            // Untuk modul berikutnya, modul ini harus selesai
            $modulSebelumnyaSelesai = $m->selesai;
        }

        return Inertia::render('Pembelajaran/DetailKursus', [
            'kursus' => $kursus,
        ]);
    }

    public function materi($slug_kursus, $slug_materi)
    {
        $pengguna = auth()->user();
        $kursus = Kursus::where('slug', $slug_kursus)->firstOrFail();
        
        $materi = Materi::where('slug', $slug_materi)
            ->with(['modul.kursus'])
            ->firstOrFail();

        // Keamanan: Cek apakah materi ini terkunci
        // (Logika sederhana: jika modulnya bukan modul pertama, cek modul sebelumnya)
        $modulSekarang = $materi->modul;
        $modulSebelumnya = \App\Fitur\Pembelajaran\Models\Modul::where('id_kursus', $kursus->id)
            ->where('urutan', '<', $modulSekarang->urutan)
            ->orderBy('urutan', 'desc')
            ->first();

        if ($modulSebelumnya) {
            $totalMateriSebelum = $modulSebelumnya->materi()->count();
            $selesaiSebelum = \Illuminate\Support\Facades\DB::table('progres_materi')
                ->where('id_pengguna', $pengguna->id)
                ->whereIn('id_materi', $modulSebelumnya->materi()->pluck('id'))
                ->count();

            if ($selesaiSebelum < $totalMateriSebelum) {
                return redirect()->route('kursus.detail', $kursus->slug)
                    ->with('error', 'Selesaikan level sebelumnya terlebih dahulu!');
            }
        }

        // Navigasi Sidebar
        $sidebar = Kursus::where('id', $kursus->id)
            ->with(['modul' => function($q) {
                $q->orderBy('urutan')->with(['materi' => function($mq) {
                    $mq->orderBy('urutan');
                }]);
            }])
            ->first();

        // Ambil data progres untuk sidebar
        $materiSelesai = \Illuminate\Support\Facades\DB::table('progres_materi')
            ->where('id_pengguna', $pengguna->id)
            ->pluck('id_materi')
            ->toArray();

        $modulSebelumnyaSelesai = true;
        foreach ($sidebar->modul as $m) {
            $m->terkunci = !$modulSebelumnyaSelesai;
            foreach ($m->materi as $mt) {
                $mt->selesai = in_array($mt->id, $materiSelesai);
            }
            $totalMateri = $m->materi->count();
            $selesaiCount = $m->materi->whereIn('id', $materiSelesai)->count();
            $modulSebelumnyaSelesai = ($totalMateri > 0 && $totalMateri === $selesaiCount);
        }

        return Inertia::render('Pembelajaran/BacaMateri', [
            'kursus' => $kursus,
            'materi' => $materi,
            'sidebar' => $sidebar->modul,
        ]);
    }
}
