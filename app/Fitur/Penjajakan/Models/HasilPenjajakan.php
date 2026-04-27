<?php

namespace App\Fitur\Penjajakan\Models;

use Illuminate\Database\Eloquent\Model;
use App\Fitur\Autentikasi\Models\Pengguna;

class HasilPenjajakan extends Model
{
    protected $table = 'hasil_penjajakan';

    protected $fillable = [
        'id_pengguna',
        'jalur',
        'skor_total',
        'skor_maksimal',
        'persentase',
        'level_didapat',
        'detail_jawaban',
        'selesai_pada',
    ];

    protected $casts = [
        'detail_jawaban' => 'array',
        'selesai_pada' => 'datetime',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }
}
