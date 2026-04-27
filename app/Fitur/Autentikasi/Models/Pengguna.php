<?php

namespace App\Fitur\Autentikasi\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pengguna extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\PenggunaFactory> */
    use HasFactory, Notifiable;

    protected static function newFactory()
    {
        return \Database\Factories\PenggunaFactory::new();
    }

    protected $table = 'pengguna';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama',
        'email',
        'kata_sandi',
        'bio',
        'peran',
        'xp',
        'level',
        'streak_harian',
        'terakhir_belajar',
        'jalur_belajar',
        'level_pemahaman',
        'tes_selesai',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'kata_sandi',
        'token_ingat',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_diverifikasi_pada' => 'datetime',
            'kata_sandi' => 'hashed',
        ];
    }

    public function getAuthPassword()
    {
        return $this->kata_sandi;
    }

    public function getRememberTokenName()
    {
        return 'token_ingat';
    }
}
