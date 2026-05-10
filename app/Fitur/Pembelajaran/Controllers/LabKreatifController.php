<?php

namespace App\Fitur\Pembelajaran\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class LabKreatifController extends Controller
{
    /**
     * Daftar template proyek yang tersedia di Lab Kreatif.
     */
    private function templates(): array
    {
        return [
            [
                'id'         => 'kalkulator',
                'nama'       => 'Kalkulator Interaktif',
                'bahasa'     => 'HTML/CSS/JavaScript',
                'ikon'       => 'Calculator',
                'deskripsi'  => 'Bangun kalkulator fungsional dengan operasi dasar (+, -, ×, ÷) menggunakan HTML, CSS, dan JavaScript murni.',
                'starter'    => "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* Tulis CSS kalkulator di sini */\n    body { font-family: sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#111; }\n    .calc { background:#1e1e1e; border-radius:16px; padding:24px; width:260px; box-shadow:0 20px 60px rgba(0,0,0,0.5); }\n    .screen { background:#0a0a0a; color:#facc15; font-size:2rem; text-align:right; padding:16px; border-radius:8px; margin-bottom:16px; min-height:64px; word-break:break-all; }\n    .btns { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }\n    button { padding:16px; border:none; border-radius:8px; font-size:1rem; cursor:pointer; background:#2a2a2a; color:#fff; transition:background 0.2s; }\n    button:hover { background:#3a3a3a; }\n    .op { color:#facc15; }\n    .eq { background:#facc15; color:#000; font-weight:bold; }\n    .eq:hover { background:#eab308; }\n  </style>\n</head>\n<body>\n  <div class=\"calc\">\n    <div class=\"screen\" id=\"screen\">0</div>\n    <div class=\"btns\">\n      <!-- Tambahkan tombol-tombol di sini -->\n      <button onclick=\"clearScreen()\">C</button>\n      <button class=\"op\" onclick=\"appendOp('(')\">( )</button>\n      <button class=\"op\" onclick=\"appendOp('%')\">%</button>\n      <button class=\"op\" onclick=\"appendOp('/')\" >÷</button>\n      <!-- Lengkapi tombol angka & operasi lainnya -->\n    </div>\n  </div>\n  <script>\n    let expr = '';\n    function updateScreen(val) { document.getElementById('screen').innerText = val || '0'; }\n    function appendOp(op) { expr += op; updateScreen(expr); }\n    function clearScreen() { expr = ''; updateScreen('0'); }\n    function calculate() {\n      try { expr = String(eval(expr)); updateScreen(expr); }\n      catch { updateScreen('Error'); expr = ''; }\n    }\n    // TODO: Tambahkan fungsi untuk tombol angka\n  </script>\n</body>\n</html>",
                'steps'      => [
                    ['id' => 1, 'judul' => 'Buat struktur HTML', 'deskripsi' => 'Buat layout dasar kalkulator: layar display dan grid tombol menggunakan HTML.'],
                    ['id' => 2, 'judul' => 'Desain tampilan CSS', 'deskripsi' => 'Styling kalkulator agar terlihat modern: warna gelap, tombol bulat, dan layar besar.'],
                    ['id' => 3, 'judul' => 'Fungsi append angka', 'deskripsi' => 'Buat fungsi JavaScript agar setiap tombol angka (0-9) menampilkan angka di layar.'],
                    ['id' => 4, 'judul' => 'Operasi matematika', 'deskripsi' => 'Implementasikan tombol +, -, ×, ÷ agar terekam saat diklik.'],
                    ['id' => 5, 'judul' => 'Tombol Sama Dengan (=)', 'deskripsi' => 'Evaluasi ekspresi matematika yang sudah diinput dan tampilkan hasilnya di layar.'],
                    ['id' => 6, 'judul' => 'Handle error & edge case', 'deskripsi' => 'Tangani pembagian dengan 0, input invalid, dan tombol Clear (C).'],
                ],
            ],
            [
                'id'         => 'todo-list',
                'nama'       => 'To-Do List App',
                'bahasa'     => 'HTML/CSS/JavaScript',
                'ikon'       => 'ListChecks',
                'deskripsi'  => 'Bangun aplikasi manajemen tugas dengan fitur tambah, selesai, dan hapus. Data tersimpan di localStorage.',
                'starter'    => "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family:sans-serif; background:#08090d; color:#fff; display:flex; justify-content:center; padding:40px 16px; }\n    .app { width:100%; max-width:480px; }\n    h1 { font-size:1.8rem; font-weight:900; margin-bottom:24px; color:#facc15; }\n    .input-row { display:flex; gap:8px; margin-bottom:24px; }\n    input { flex:1; padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); background:#1a1a2e; color:#fff; font-size:1rem; outline:none; }\n    button.add-btn { padding:12px 20px; background:#facc15; color:#000; border:none; border-radius:12px; font-weight:900; cursor:pointer; }\n    .task-list { list-style:none; padding:0; display:flex; flex-direction:column; gap:8px; }\n    /* TODO: Lengkapi styling item task */\n  </style>\n</head>\n<body>\n  <div class=\"app\">\n    <h1>✅ My Tasks</h1>\n    <div class=\"input-row\">\n      <input id=\"taskInput\" type=\"text\" placeholder=\"Tambah tugas baru...\" />\n      <button class=\"add-btn\" onclick=\"addTask()\">Tambah</button>\n    </div>\n    <ul class=\"task-list\" id=\"taskList\"></ul>\n  </div>\n  <script>\n    // TODO: Load dari localStorage saat halaman dibuka\n    function addTask() {\n      const input = document.getElementById('taskInput');\n      const text = input.value.trim();\n      if (!text) return;\n      // TODO: Buat elemen li dan tambahkan ke taskList\n      input.value = '';\n    }\n    // TODO: Fungsi toggleDone(id)\n    // TODO: Fungsi deleteTask(id)\n    // TODO: Fungsi saveToLocalStorage()\n    // TODO: Fungsi loadFromLocalStorage()\n  </script>\n</body>\n</html>",
                'steps'      => [
                    ['id' => 1, 'judul' => 'Input & tombol tambah', 'deskripsi' => 'Buat form input teks dan tombol "Tambah" yang bisa menangkap input pengguna.'],
                    ['id' => 2, 'judul' => 'Render item task', 'deskripsi' => 'Buat fungsi addTask() yang menampilkan item baru ke dalam daftar saat tombol ditekan.'],
                    ['id' => 3, 'judul' => 'Fitur centang selesai', 'deskripsi' => 'Tambahkan fungsi toggleDone() yang memberi tanda selesai (strikethrough) pada task yang diklik.'],
                    ['id' => 4, 'judul' => 'Fitur hapus task', 'deskripsi' => 'Buat tombol hapus di setiap item task dengan fungsi deleteTask() yang menghapusnya dari DOM.'],
                    ['id' => 5, 'judul' => 'Simpan ke localStorage', 'deskripsi' => 'Setiap perubahan (tambah/hapus/selesai) harus disimpan ke localStorage agar data tidak hilang saat refresh.'],
                    ['id' => 6, 'judul' => 'Load saat halaman dibuka', 'deskripsi' => 'Buat loadFromLocalStorage() yang dipanggil saat halaman dimuat untuk menampilkan task yang sudah tersimpan.'],
                ],
            ],
            [
                'id'         => 'portfolio',
                'nama'       => 'Landing Page Portfolio',
                'bahasa'     => 'HTML/CSS',
                'ikon'       => 'Globe',
                'deskripsi'  => 'Buat halaman portofolio personal yang menampilkan profilmu, skill, dan proyek-proyekmu secara profesional.',
                'starter'    => "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Portofolio Saya</title>\n  <style>\n    * { margin:0; padding:0; box-sizing:border-box; }\n    body { font-family:'Segoe UI',sans-serif; background:#08090d; color:#fff; line-height:1.6; }\n    /* TODO: Buat styling untuk section hero, about, skills, projects */\n    nav { display:flex; justify-content:space-between; align-items:center; padding:20px 60px; border-bottom:1px solid rgba(255,255,255,0.05); }\n    .logo { font-weight:900; font-size:1.2rem; color:#facc15; }\n    /* TODO: Styling nav links */\n  </style>\n</head>\n<body>\n  <nav>\n    <div class=\"logo\">Dev<span style=\"color:#fff\">Portfolio</span></div>\n    <div><!-- TODO: nav links --></div>\n  </nav>\n\n  <!-- TODO: Section Hero -->\n  <section id=\"hero\">\n    <!-- Nama, tagline, dan tombol CTA -->\n  </section>\n\n  <!-- TODO: Section About -->\n  <section id=\"about\">\n    <!-- Foto profil, deskripsi singkat, dan fakta tentang kamu -->\n  </section>\n\n  <!-- TODO: Section Skills -->\n  <section id=\"skills\">\n    <!-- Grid ikon skill yang kamu kuasai -->\n  </section>\n\n  <!-- TODO: Section Projects -->\n  <section id=\"projects\">\n    <!-- Kartu-kartu proyek dengan nama, deskripsi, dan link -->\n  </section>\n</body>\n</html>",
                'steps'      => [
                    ['id' => 1, 'judul' => 'Navbar & struktur halaman', 'deskripsi' => 'Buat navbar dengan logo dan link navigasi, serta definisikan semua section utama (hero, about, skills, projects).'],
                    ['id' => 2, 'judul' => 'Section Hero', 'deskripsi' => 'Buat section hero yang memperkenalkan namamu, tagline profesi, dan tombol CTA (misalnya "Lihat Proyek").'],
                    ['id' => 3, 'judul' => 'Section About', 'deskripsi' => 'Tampilkan foto profil (atau avatar placeholder), deskripsi singkat, dan beberapa fakta menarik tentang kamu.'],
                    ['id' => 4, 'judul' => 'Section Skills', 'deskripsi' => 'Buat grid yang menampilkan skill/teknologi yang kamu kuasai dengan ikon atau badge.'],
                    ['id' => 5, 'judul' => 'Section Projects', 'deskripsi' => 'Tampilkan minimal 2 proyek dalam bentuk kartu dengan nama, deskripsi singkat, dan tag teknologi.'],
                    ['id' => 6, 'judul' => 'Responsif & Polish', 'deskripsi' => 'Pastikan halaman terlihat bagus di semua ukuran layar. Tambahkan animasi hover dan transisi CSS.'],
                ],
            ],
            [
                'id'         => 'api-fetcher',
                'nama'       => 'API Explorer',
                'bahasa'     => 'HTML/CSS/JavaScript',
                'ikon'       => 'Wifi',
                'deskripsi'  => 'Bangun aplikasi yang mengambil data dari public API (JSONPlaceholder) dan menampilkannya secara interaktif.',
                'starter'    => "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family:sans-serif; background:#08090d; color:#fff; padding:40px 16px; }\n    h1 { color:#facc15; font-size:1.8rem; margin-bottom:8px; }\n    p.sub { color:#6b7280; margin-bottom:24px; font-size:0.9rem; }\n    .controls { display:flex; gap:8px; margin-bottom:24px; flex-wrap:wrap; }\n    button { padding:10px 20px; border-radius:10px; border:none; cursor:pointer; font-weight:700; background:#1f2937; color:#fff; transition:background 0.2s; }\n    button.active, button:hover { background:#facc15; color:#000; }\n    #result { display:grid; gap:12px; }\n    /* TODO: Styling kartu item */\n    .loading { text-align:center; color:#6b7280; padding:40px; }\n  </style>\n</head>\n<body>\n  <h1>🌐 API Explorer</h1>\n  <p class=\"sub\">Ambil data dari JSONPlaceholder API secara real-time</p>\n  <div class=\"controls\">\n    <button onclick=\"fetchData('posts')\" id=\"btn-posts\">Posts</button>\n    <button onclick=\"fetchData('users')\" id=\"btn-users\">Users</button>\n    <button onclick=\"fetchData('todos')\" id=\"btn-todos\">Todos</button>\n  </div>\n  <div id=\"result\"><p class=\"loading\">Klik salah satu tombol untuk memuat data...</p></div>\n  <script>\n    const BASE_URL = 'https://jsonplaceholder.typicode.com';\n    async function fetchData(endpoint) {\n      const result = document.getElementById('result');\n      result.innerHTML = '<p class=\"loading\">Memuat data...</p>';\n      // TODO: Gunakan fetch() untuk ambil data dari BASE_URL + '/' + endpoint\n      // TODO: Parse response sebagai JSON\n      // TODO: Limit tampilkan hanya 10 item pertama\n      // TODO: Render setiap item sebagai kartu HTML\n    }\n    // TODO: Buat fungsi renderCard(item, type) yang menampilkan data berbeda\n    // tergantung tipe endpoint (posts, users, todos)\n  </script>\n</body>\n</html>",
                'steps'      => [
                    ['id' => 1, 'judul' => 'Setup & tombol kontrol', 'deskripsi' => 'Siapkan struktur HTML dengan tombol untuk memilih endpoint API (Posts, Users, Todos).'],
                    ['id' => 2, 'judul' => 'Fungsi fetchData()', 'deskripsi' => 'Implementasikan async fetchData() menggunakan fetch() API untuk mengambil data dari JSONPlaceholder.'],
                    ['id' => 3, 'judul' => 'Parse & limit data', 'deskripsi' => 'Parse response JSON dan batasi tampilan hanya 10 item pertama agar tidak terlalu panjang.'],
                    ['id' => 4, 'judul' => 'Render kartu Posts', 'deskripsi' => 'Tampilkan data Posts dalam kartu yang menampilkan title dan body dari setiap post.'],
                    ['id' => 5, 'judul' => 'Render kartu Users & Todos', 'deskripsi' => 'Tambahkan logic berbeda untuk endpoint Users (nama, email) dan Todos (status selesai/belum).'],
                    ['id' => 6, 'judul' => 'Loading state & error handling', 'deskripsi' => 'Tampilkan indikator loading saat data dimuat dan pesan error jika fetch gagal.'],
                ],
            ],
        ];
    }

    /**
     * Tampilkan halaman Lab Kreatif.
     */
    public function indeks()
    {
        return Inertia::render('Pembelajaran/LabKreatif', [
            'templates' => $this->templates(),
        ]);
    }

    /**
     * Evaluasi kode pengguna dengan AI — berikan hint adaptif, bukan jawaban langsung.
     */
    public function evaluasiAI(Request $request)
    {
        $request->validate([
            'kode_pengguna'      => 'required|string|max:20000',
            'bahasa'             => 'required|string',
            'nama_proyek'        => 'required|string',
            'step_aktif'         => 'required|string',
            'deskripsi_step'     => 'required|string',
        ]);

        $apiKey = trim(env('GEMINI_API_KEY'));

        if (!$apiKey) {
            return response()->json([
                'pesan' => 'API Key Gemini belum dikonfigurasi di file .env'
            ], 500);
        }

        $prompt = "Anda adalah mentor coding AI yang ramah di platform 'Code Genius'. Pengguna sedang mengerjakan proyek mandiri.

**Proyek**: {$request->nama_proyek}
**Bahasa**: {$request->bahasa}
**Step yang sedang dikerjakan**: {$request->step_aktif}
**Deskripsi step**: {$request->deskripsi_step}

**Kode pengguna saat ini:**
```
{$request->kode_pengguna}
```

**Instruksi penting untuk Anda:**
- JANGAN berikan kode jawaban lengkap secara langsung
- Berikan maksimal 3 hint bertahap yang memandu pengguna berpikir sendiri
- Gunakan pertanyaan retorik untuk membantu mereka menemukan solusi
- Identifikasi apa yang sudah benar dan puji usaha mereka
- Tunjukkan bagian mana yang perlu diperbaiki tanpa membocorkan solusinya
- Gunakan bahasa Indonesia yang santai dan menyemangati
- Jika kode sudah benar atau hampir benar, beri selamat dan tantang mereka ke langkah berikutnya

Berikan respon HANYA dalam format JSON valid:
{
    \"status\": \"bagus\" | \"hampir\" | \"perlu_perbaikan\",
    \"pujian\": \"apresiasi singkat atas usaha mereka\",
    \"hint_1\": \"hint pertama (paling umum)\",
    \"hint_2\": \"hint kedua (lebih spesifik, opsional - isi string kosong jika tidak perlu)\",
    \"hint_3\": \"hint ketiga (paling spesifik, opsional - isi string kosong jika tidak perlu)\",
    \"pertanyaan_pemandu\": \"satu pertanyaan yang mendorong mereka berpikir\"
}";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
            ]
        ]);

        if ($response->successful()) {
            $hasil  = $response->json();
            $text   = $hasil['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
            $parsed = json_decode($text, true);

            return response()->json([
                'status'              => $parsed['status']              ?? 'perlu_perbaikan',
                'pujian'              => $parsed['pujian']              ?? '',
                'hint_1'              => $parsed['hint_1']              ?? '',
                'hint_2'              => $parsed['hint_2']              ?? '',
                'hint_3'              => $parsed['hint_3']              ?? '',
                'pertanyaan_pemandu'  => $parsed['pertanyaan_pemandu']  ?? '',
            ]);
        }

        $errorDetail = $response->json();
        return response()->json([
            'pesan' => 'Terjadi kesalahan: ' . ($errorDetail['error']['message'] ?? 'Gagal menghubungi layanan AI.')
        ], 500);
    }
}
