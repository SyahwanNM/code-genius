<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Fitur\Pembelajaran\Models\Kursus;
use App\Fitur\Pembelajaran\Models\Modul;
use App\Fitur\Pembelajaran\Models\Materi;

class PembelajaranSeeder extends Seeder
{
    public function run(): void
    {
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        Materi::truncate();
        Modul::truncate();
        Kursus::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        // ==========================================
        // 1. ROADMAP FRONTEND - BEGINNER
        // ==========================================
        $frontendBeginner = Kursus::create([
            'nama' => 'Roadmap Frontend: Beginner',
            'slug' => 'roadmap-frontend-beginner',
            'deskripsi' => 'Langkah pertama Anda menjadi Frontend Developer. Pelajari dasar-dasar membangun antarmuka web statis.',
            'ikon' => '🖥️',
            'jalur' => 'frontend',
            'level_kesulitan' => 'beginner'
        ]);

        // Level 1: Pengenalan Web
        $fbLvl1 = Modul::create(['id_kursus' => $frontendBeginner->id, 'judul' => 'Level 1: Struktur Web Dasar', 'urutan' => 1]);
        
        Materi::create([
            'id_modul' => $fbLvl1->id,
            'judul' => 'Fondasi HTML',
            'slug' => 'fb-lvl1-materi',
            'konten' => '<h1>Selamat datang di Level 1!</h1><p>Website dibangun di atas fondasi HTML. Setiap elemen mulai dari tombol, gambar, hingga teks semuanya didefinisikan menggunakan HTML (HyperText Markup Language).</p>',
            'tipe' => 'teks',
            'urutan' => 1
        ]);
        
        Materi::create([
            'id_modul' => $fbLvl1->id,
            'judul' => 'Misi: Membuat Heading',
            'slug' => 'fb-lvl1-misi',
            'konten' => '<p><strong>Misi Anda:</strong> Buatlah sebuah heading tingkat 1 (H1) dengan teks persis "Halo Dunia!". AI akan mengecek kode Anda, pastikan tag tidak salah.</p>',
            'tipe' => 'latihan',
            'contoh_kode' => '<!-- Tulis tag HTML di sini -->',
            'jawaban_kode' => '<h1>Halo Dunia!</h1>',
            'urutan' => 2
        ]);

        // Level 2: Interaktivitas Dasar
        $fbLvl2 = Modul::create(['id_kursus' => $frontendBeginner->id, 'judul' => 'Level 2: Logika JavaScript', 'urutan' => 2]);
        
        Materi::create([
            'id_modul' => $fbLvl2->id,
            'judul' => 'Menyapa Pengguna',
            'slug' => 'fb-lvl2-materi',
            'konten' => '<h1>JavaScript Dasar</h1><p>HTML untuk struktur, CSS untuk desain, dan JavaScript untuk interaksi. Fungsi paling dasar adalah menampilkan pesan menggunakan <code>console.log()</code>.</p>',
            'tipe' => 'teks',
            'urutan' => 1
        ]);

        Materi::create([
            'id_modul' => $fbLvl2->id,
            'judul' => 'Misi: Mencetak Teks',
            'slug' => 'fb-lvl2-misi',
            'konten' => '<p><strong>Misi Anda:</strong> Gunakan perintah JavaScript untuk mencetak teks "Saya Frontend Developer" ke dalam console.</p>',
            'tipe' => 'latihan',
            'contoh_kode' => '// Tulis kode JavaScript di sini',
            'jawaban_kode' => 'console.log("Saya Frontend Developer");',
            'urutan' => 2
        ]);


        // ==========================================
        // 2. ROADMAP BACKEND - BEGINNER
        // ==========================================
        $backendBeginner = Kursus::create([
            'nama' => 'Roadmap Backend: Beginner',
            'slug' => 'roadmap-backend-beginner',
            'deskripsi' => 'Langkah awal di balik layar. Pelajari cara kerja server dan logika database dasar.',
            'ikon' => '⚙️',
            'jalur' => 'backend',
            'level_kesulitan' => 'beginner'
        ]);

        // Level 1: Pengenalan PHP
        $bbLvl1 = Modul::create(['id_kursus' => $backendBeginner->id, 'judul' => 'Level 1: Logika Server', 'urutan' => 1]);
        
        Materi::create([
            'id_modul' => $bbLvl1->id,
            'judul' => 'Apa itu PHP?',
            'slug' => 'bb-lvl1-materi',
            'konten' => '<h1>PHP (Hypertext Preprocessor)</h1><p>Bahasa script server-side yang populer. Semua kode PHP dijalankan di server, dan hasilnya dikirimkan ke browser sebagai HTML.</p>',
            'tipe' => 'teks',
            'urutan' => 1
        ]);

        Materi::create([
            'id_modul' => $bbLvl1->id,
            'judul' => 'Misi: Echo Data',
            'slug' => 'bb-lvl1-misi',
            'konten' => '<p><strong>Misi Anda:</strong> Buat script PHP sederhana yang mencetak angka <code>200</code> yang menandakan status HTTP OK.</p>',
            'tipe' => 'latihan',
            'contoh_kode' => '<?php' . "\n" . '// Gunakan echo',
            'jawaban_kode' => 'echo 200;',
            'urutan' => 2
        ]);
        
        // Level 2: Database
        $bbLvl2 = Modul::create(['id_kursus' => $backendBeginner->id, 'judul' => 'Level 2: Relasi Data', 'urutan' => 2]);
        
        Materi::create([
            'id_modul' => $bbLvl2->id,
            'judul' => 'Pengenalan SQL',
            'slug' => 'bb-lvl2-materi',
            'konten' => '<h1>SQL Dasar</h1><p>SQL digunakan untuk berinteraksi dengan database. Perintah paling umum adalah SELECT untuk mengambil data.</p>',
            'tipe' => 'teks',
            'urutan' => 1
        ]);

        Materi::create([
            'id_modul' => $bbLvl2->id,
            'judul' => 'Misi: Mengambil Data',
            'slug' => 'bb-lvl2-misi',
            'konten' => '<p><strong>Misi Anda:</strong> Tulis query SQL untuk mengambil kolom `nama` dari tabel `users`.</p>',
            'tipe' => 'latihan',
            'contoh_kode' => '-- Tulis query SQL di sini',
            'jawaban_kode' => 'SELECT nama FROM users;',
            'urutan' => 2
        ]);
        
        
        // Output info
        $this->command->info('✅ Silabus roadmap pembelajaran berhasil diperbarui berdasarkan level kompetensi (Level 1, Level 2, dst).');
    }
}
