<?php

namespace App\Fitur\Pembelajaran\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kursus extends Model
{
    protected $table = 'kursus';

    protected $fillable = [
        'nama',
        'slug',
        'deskripsi',
        'ikon',
    ];

    public function modul(): HasMany
    {
        return $this->hasMany(Modul::class, 'id_kursus');
    }
}
