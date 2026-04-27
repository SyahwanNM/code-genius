<?php

namespace App\Fitur\Penjajakan\Models;

use Illuminate\Database\Eloquent\Model;

class SoalPenjajakan extends Model
{
    protected $table = 'soal_penjajakan';

    protected $fillable = [
        'jalur',
        'pertanyaan',
        'kode_pertanyaan',
        'tipe',
        'difficulty_level',
        'opsi_a',
        'opsi_b',
        'opsi_c',
        'opsi_d',
        'jawaban_benar',
        'kata_kunci_jawaban',
        'penjelasan',
        'bobot_skor',
        'urutan',
        'aktif',
    ];

    protected $casts = [
        'aktif' => 'boolean',
    ];

    public function scopeAktif($query)
    {
        return $query->where('aktif', true);
    }

    public function scopeJalur($query, $jalur)
    {
        return $query->where('jalur', $jalur);
    }
}
