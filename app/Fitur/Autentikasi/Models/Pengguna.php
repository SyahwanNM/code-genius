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
        'tautan_sosial',
        'keahlian_utama',
        'avatar_style',
        'foto_profil',
    ];

    protected $hidden = [
        'kata_sandi',
        'token_ingat',
    ];

    protected function casts(): array
    {
        return [
            'email_diverifikasi_pada' => 'datetime',
            'kata_sandi' => 'hashed',
            'tautan_sosial' => 'array',
            'keahlian_utama' => 'array',
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

    public function notifikasis()
    {
        return $this->hasMany(\App\Models\Notifikasi::class, 'id_pengguna')->orderBy('created_at', 'desc');
    }

    /**
     * Kirim notifikasi atur ulang kata sandi kustom (Antrean/Queue).
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new \App\Fitur\Autentikasi\Notifications\AturUlangKataSandiNotification($token, $this->email));
    }
}
