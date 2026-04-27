<?php

namespace App\Fitur\Pembelajaran\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProgresController extends Controller
{
    public function selesai(Request $request)
    {
        $request->validate([
            'id_materi' => 'required|exists:materi,id'
        ]);

        $pengguna = auth()->user();
        $idMateri = $request->id_materi;

        // Cek apakah sudah pernah diselesaikan
        $sudahSelesai = DB::table('progres_materi')
            ->where('id_pengguna', $pengguna->id)
            ->where('id_materi', $idMateri)
            ->exists();

        if ($sudahSelesai) {
            return response()->json(['pesan' => 'Materi sudah diselesaikan sebelumnya.'], 200);
        }

        DB::beginTransaction();
        try {
            // Simpan progress
            DB::table('progres_materi')->insert([
                'id_pengguna' => $pengguna->id,
                'id_materi' => $idMateri,
                'selesai_pada' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Hadiah XP
            $totalXpBaru = $pengguna->xp + 50;
            $levelBaru = floor($totalXpBaru / 100) + 1;

            // Hitung Streak
            $streakHarian = $pengguna->streak_harian;
            $terakhirBelajar = $pengguna->terakhir_belajar ? Carbon::parse($pengguna->terakhir_belajar) : null;
            $hariIni = Carbon::today();

            if (!$terakhirBelajar) {
                $streakHarian = 1;
            } elseif ($terakhirBelajar->isYesterday()) {
                $streakHarian += 1;
            } elseif (!$terakhirBelajar->isToday()) {
                $streakHarian = 1;
            }

            // Update Pengguna
            DB::table('pengguna')->where('id', $pengguna->id)->update([
                'xp' => $totalXpBaru,
                'level' => $levelBaru,
                'streak_harian' => $streakHarian,
                'terakhir_belajar' => now(),
            ]);

            DB::commit();

            return response()->json([
                'pesan' => 'Selamat! Anda mendapatkan +50 XP',
                'xp_didapat' => 50,
                'level_baru' => $levelBaru,
                'streak_baru' => $streakHarian
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['pesan' => 'Gagal menyimpan progres.'], 500);
        }
    }
}
