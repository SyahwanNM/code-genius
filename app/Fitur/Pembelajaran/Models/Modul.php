<?php

namespace App\Fitur\Pembelajaran\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Modul extends Model
{
    protected $table = 'modul';

    protected $fillable = [
        'id_kursus',
        'judul',
        'urutan',
    ];

    public function kursus(): BelongsTo
    {
        return $this->belongsTo(Kursus::class, 'id_kursus');
    }

    public function materi(): HasMany
    {
        return $this->hasMany(Materi::class, 'id_modul');
    }
}
