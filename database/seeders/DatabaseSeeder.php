<?php

namespace Database\Seeders;

use App\Fitur\Autentikasi\Models\Pengguna;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Pengguna::factory()->create([
            'nama' => 'Test User',
            'email' => 'test@example.com',
            'kata_sandi' => 'password',
        ]);

        $this->call([
            PembelajaranSeeder::class,
        ]);
    }
}
