<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    use HasFactory;

    protected $table = 'notifikasi';

    protected $fillable = [
        'id_pengguna',
        'id_broadcast',
        'judul',
        'pesan',
        'tipe',
        'dibaca',
        'url'
    ];

    public function broadcast()
    {
        return $this->belongsTo(Broadcast::class, 'id_broadcast');
    }

    public function pengguna()
    {
        return $this->belongsTo(\App\Fitur\Autentikasi\Models\Pengguna::class, 'id_pengguna');
    }
}
