<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Broadcast extends Model
{
    protected $fillable = [
        'judul',
        'pesan',
        'tipe',
        'tautan',
        'total_penerima',
    ];

    public function notifikasis()
    {
        return $this->hasMany(Notifikasi::class, 'id_broadcast');
    }
}
