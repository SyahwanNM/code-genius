<?php

namespace App\Fitur\Penjajakan\Controllers;

use App\Http\Controllers\Controller;
use App\Fitur\Penjajakan\Models\SoalPenjajakan;
use App\Fitur\Penjajakan\Models\HasilPenjajakan;
use App\Fitur\Autentikasi\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PenjajakanController extends Controller
{
    /**
     * Tampilkan halaman pilih jalur belajar (Frontend / Backend).
     */
    public function pilihJalur()
    {
        $user = Auth::user();

        // Jika sudah selesai tes, redirect ke dashboard
        if ($user->tes_selesai) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Onboarding/PilihJalur', [
            'jalur_saat_ini' => $user->jalur_belajar,
        ]);
    }

    /**
     * Simpan pilihan jalur belajar dan redirect ke tes penjajakan.
     */
    public function simpanJalur(Request $request)
    {
        $request->validate([
            'jalur' => 'required|in:frontend,backend',
        ]);

        $user = Auth::user();
        $user->update(['jalur_belajar' => $request->jalur]);

        return redirect()->route('tes.penjajakan');
    }

    /**
     * Tampilkan halaman tes penjajakan.
     */
    public function tampilTes()
    {
        $user = Auth::user();

        if (!$user->jalur_belajar) {
            return redirect()->route('pilih.jalur');
        }

        if ($user->tes_selesai) {
            return redirect()->route('dashboard');
        }

        // Ambil soal aktif untuk jalur yang dipilih (max 10 soal, acak)
        $soal = SoalPenjajakan::aktif()
            ->jalur($user->jalur_belajar)
            ->orderBy('urutan')
            ->get()
            ->shuffle()
            ->take(10)
            ->values()
            ->map(function ($s) {
                return [
                    'id'               => $s->id,
                    'pertanyaan'       => $s->pertanyaan,
                    'kode_pertanyaan'  => $s->kode_pertanyaan,
                    'tipe'             => $s->tipe,
                    'difficulty_level' => $s->difficulty_level,
                    'opsi'             => [
                        'a' => $s->opsi_a,
                        'b' => $s->opsi_b,
                        'c' => $s->opsi_c,
                        'd' => $s->opsi_d,
                    ],
                    'bobot_skor'       => $s->bobot_skor,
                ];
            });

        // Jika belum ada soal, langsung tentukan level beginner
        if ($soal->isEmpty()) {
            $this->simpanHasil($user, $user->jalur_belajar, 0, 0, 0, 'beginner', []);
            return redirect()->route('hasil.tes');
        }

        return Inertia::render('Onboarding/TesPenjajakan', [
            'soal'  => $soal,
            'jalur' => $user->jalur_belajar,
        ]);
    }

    /**
     * Proses jawaban tes penjajakan, hitung skor, simpan hasil.
     */
    public function prosesJawaban(Request $request)
    {
        $user = Auth::user();

        if ($user->tes_selesai) {
            return redirect()->route('dashboard');
        }

        $request->validate([
            'jawaban' => 'required|array',
        ]);

        $jawaban = $request->jawaban; // ['soal_id' => 'a'/'b'/'c'/'d']
        $soalIds = array_keys($jawaban);

        $soalList = SoalPenjajakan::whereIn('id', $soalIds)->get()->keyBy('id');

        $skorTotal    = 0;
        $skorMaksimal = 0;
        $detailJawaban = [];
        
        $analisis = [
            'beginner'     => ['benar' => 0, 'total' => 0],
            'intermediate' => ['benar' => 0, 'total' => 0],
            'advanced'     => ['benar' => 0, 'total' => 0],
        ];

        foreach ($soalList as $soal) {
            $skorMaksimal += $soal->bobot_skor;
            $jawabanUser  = $jawaban[$soal->id] ?? null;
            $diff         = $soal->difficulty_level ?? 'beginner';
            
            $analisis[$diff]['total']++;

            // Logika pengecekan berdasarkan tipe soal
            if ($soal->tipe === 'kode') {
                // Untuk soal kode: cek apakah kata kunci ada di jawaban user
                $benar = $this->cekJawabanKode(
                    $jawabanUser ?? '',
                    $soal->jawaban_benar,
                    $soal->kata_kunci_jawaban
                );
            } else {
                // Pilihan ganda: exact match
                $benar = strtolower(trim($jawabanUser ?? '')) === strtolower(trim($soal->jawaban_benar));
            }

            if ($benar) {
                $skorTotal += $soal->bobot_skor;
                $analisis[$diff]['benar']++;
            }

            $detailJawaban[] = [
                'soal_id'       => $soal->id,
                'pertanyaan'    => $soal->pertanyaan,
                'tipe'          => $soal->tipe,
                'jawaban_user'  => $jawabanUser,
                'jawaban_benar' => $soal->jawaban_benar,
                'benar'         => $benar,
                'penjelasan'    => $soal->penjelasan,
            ];
        }

        $persentase = $skorMaksimal > 0 ? round(($skorTotal / $skorMaksimal) * 100) : 0;
        $level      = $this->tentukanLevelBerbasisAnalisis($analisis, $persentase);

        $this->simpanHasil($user, $user->jalur_belajar, $skorTotal, $skorMaksimal, $persentase, $level, $detailJawaban);

        return redirect()->route('hasil.tes');
    }

    /**
     * Tampilkan halaman hasil tes penjajakan.
     */
    public function hasilTes()
    {
        $user = Auth::user();

        $hasil = HasilPenjajakan::where('id_pengguna', $user->id)
            ->latest()
            ->first();

        if (!$hasil) {
            return redirect()->route('pilih.jalur');
        }

        return Inertia::render('Onboarding/HasilTes', [
            'hasil' => [
                'jalur'         => $hasil->jalur,
                'skor_total'    => $hasil->skor_total,
                'skor_maksimal' => $hasil->skor_maksimal,
                'persentase'    => $hasil->persentase,
                'level_didapat' => $hasil->level_didapat,
                'detail'        => $hasil->detail_jawaban,
            ],
            'pengguna' => [
                'nama'  => $user->nama,
                'level' => $user->level_pemahaman,
                'jalur' => $user->jalur_belajar,
            ],
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    private function tentukanLevelBerbasisAnalisis(array $analisis, int $persentase): string
    {
        $advTotal = $analisis['advanced']['total'];
        $advBenar = $analisis['advanced']['benar'];
        $intTotal = $analisis['intermediate']['total'];
        $intBenar = $analisis['intermediate']['benar'];

        $advP = $advTotal > 0 ? ($advBenar / $advTotal) * 100 : 0;
        $intP = $intTotal > 0 ? ($intBenar / $intTotal) * 100 : 0;

        // Jika berhasil menjawab >= 60% soal advanced dengan benar, dia advanced
        if ($advP >= 60) {
            return 'advanced';
        }

        // Jika berhasil menjawab >= 60% soal intermediate, dia intermediate
        if ($intP >= 60) {
            return 'intermediate';
        }

        // Jika data analisis kurang (misal tidak ada soal int/adv), gunakan fallback skor total
        if ($persentase >= 71) return 'advanced';
        if ($persentase >= 41) return 'intermediate';

        return 'beginner';
    }

    /**
     * Cek jawaban soal kode.
     * Cocokkan jawaban user dengan kata kunci (case-insensitive, trimmed).
     * Jika kata_kunci_jawaban null, gunakan jawaban_benar sebagai exact match.
     */
    private function cekJawabanKode(string $jawabanUser, string $jawabanBenar, ?string $kataKunci): bool
    {
        $userLower = strtolower(trim($jawabanUser));

        // Jika ada daftar kata kunci (dipisah koma), SEMUA harus ada di jawaban user
        if ($kataKunci) {
            $keywords = array_map('trim', explode(',', strtolower($kataKunci)));
            foreach ($keywords as $kw) {
                if ($kw && !str_contains($userLower, $kw)) {
                    return false;
                }
            }
            return true;
        }

        // Jika tidak ada kata kunci, exact match dengan jawaban_benar
        return $userLower === strtolower(trim($jawabanBenar));
    }

    private function simpanHasil(
        Pengguna $user,
        string $jalur,
        int $skorTotal,
        int $skorMaksimal,
        int $persentase,
        string $level,
        array $detail
    ): void {
        HasilPenjajakan::create([
            'id_pengguna'   => $user->id,
            'jalur'         => $jalur,
            'skor_total'    => $skorTotal,
            'skor_maksimal' => $skorMaksimal,
            'persentase'    => $persentase,
            'level_didapat' => $level,
            'detail_jawaban'=> $detail,
            'selesai_pada'  => now(),
        ]);

        $user->update([
            'level_pemahaman' => $level,
            'tes_selesai'     => true,
        ]);
    }
}
