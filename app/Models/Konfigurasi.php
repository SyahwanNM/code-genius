<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Konfigurasi extends Model
{
    protected $table = 'konfigurasi';
    
    protected $fillable = [
        'site_name',
        'maintenance_mode',
        'registration_open',
        'ai_debug',
    ];

    protected $casts = [
        'maintenance_mode' => 'boolean',
        'registration_open' => 'boolean',
        'ai_debug' => 'boolean',
    ];
}
