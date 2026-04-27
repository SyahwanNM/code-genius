<?php

namespace App\Fitur\Pembelajaran\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Materi extends Model
{
    protected $table = 'materi';

    protected $fillable = [
        'id_modul',
        'judul',
        'slug',
        'konten',
        'tipe',
        'contoh_kode',
        'jawaban_kode',
        'urutan',
    ];

    public function modul(): BelongsTo
    {
        return $this->belongsTo(Modul::class, 'id_modul');
    }
}
