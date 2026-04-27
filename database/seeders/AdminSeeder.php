<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Fitur\Autentikasi\Models\Pengguna;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Pengguna::updateOrCreate(
            ['email' => 'admin@codegenius.com'],
            [
                'nama' => 'Pusat Kontrol Admin',
                'kata_sandi' => Hash::make('admin123'),
                'peran' => 'Admin',
                'xp' => 9999,
                'level' => 99,
            ]
        );
    }
}
