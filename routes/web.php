<?php

use Illuminate\Support\Facades\Route;
use App\Fitur\Beranda\Controllers\BerandaController;
use App\Fitur\Autentikasi\Controllers\AutentikasiController;
use App\Fitur\Pembelajaran\Controllers\KursusController;
use App\Fitur\Pembelajaran\Controllers\AsistenAIController;
use App\Fitur\Pembelajaran\Controllers\ProgresController;
use App\Fitur\Pembelajaran\Controllers\LabKreatifController;
use App\Fitur\Autentikasi\Controllers\ProfilController;
use App\Fitur\Admin\Controllers\AdminBerandaController;
use App\Fitur\Admin\Controllers\AdminUserController;
use App\Fitur\Admin\Controllers\AdminKursusController;
use App\Fitur\Admin\Controllers\AdminSoalController;
use App\Fitur\Admin\Controllers\ApiKursusController;
use App\Fitur\Admin\Controllers\ApiAdminController;
use App\Fitur\Penjajakan\Controllers\PenjajakanController;
use Inertia\Inertia;

// ─────────────────────────────────────────────────────────────────────────────
// RUTE PUBLIK
// ─────────────────────────────────────────────────────────────────────────────
Route::get('/', [BerandaController::class, 'indeks']);
Route::get('/pricing', function () { return Inertia::render('Public/Pricing'); })->name('pricing');
Route::get('/explorasi', [KursusController::class, 'indeks'])->name('explorasi');
Route::get('/tentang-kami', function () { return Inertia::render('Public/TentangKami'); })->name('about');

// ─────────────────────────────────────────────────────────────────────────────
// AUTENTIKASI (Guest Only)
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/daftar', [AutentikasiController::class, 'tampilanDaftar'])->name('daftar');
    Route::post('/daftar', [AutentikasiController::class, 'daftar']);
    Route::get('/masuk', [AutentikasiController::class, 'tampilanMasuk'])->name('login');
    Route::post('/masuk', [AutentikasiController::class, 'masuk']);
});

// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING — Khusus user yang baru daftar / belum selesai onboarding
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/pilih-jalur', [PenjajakanController::class, 'pilihJalur'])->name('pilih.jalur');
    Route::post('/pilih-jalur', [PenjajakanController::class, 'simpanJalur'])->name('pilih.jalur.simpan');
    Route::get('/tes-penjajakan', [PenjajakanController::class, 'tampilTes'])->name('tes.penjajakan');
    Route::post('/tes-penjajakan', [PenjajakanController::class, 'prosesJawaban'])->name('tes.penjajakan.proses');
    Route::get('/hasil-tes', [PenjajakanController::class, 'hasilTes'])->name('hasil.tes');
});

// ─────────────────────────────────────────────────────────────────────────────
// AREA USER (Siswa) — Wajib sudah selesai onboarding
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware(['auth', 'cek.onboarding'])->group(function () {
    Route::post('/keluar', [AutentikasiController::class, 'keluar'])->name('logout');
    Route::get('/dashboard', [BerandaController::class, 'dashboard'])->name('dashboard');

    // Profil & Settings
    Route::get('/profil', [ProfilController::class, 'indeks'])->name('profil');
    Route::get('/profil/edit', [ProfilController::class, 'edit'])->name('profil.edit');
    Route::post('/profil/update', [ProfilController::class, 'update'])->name('profil.update');
    Route::get('/pengaturan', [ProfilController::class, 'pengaturan'])->name('settings');
    Route::post('/pengaturan/password', [ProfilController::class, 'updatePassword'])->name('settings.password');

    // Pembelajaran
    Route::get('/roadmap', [BerandaController::class, 'roadmap'])->name('roadmap');
    Route::get('/kursus', [KursusController::class, 'indeks'])->name('kursus.indeks');
    Route::get('/kursus/{slug_kursus}', [KursusController::class, 'detail'])->name('kursus.detail');
    Route::get('/kursus/{slug_kursus}/{slug_materi}', [KursusController::class, 'materi'])->name('kursus.materi');

    // Lab Kreatif
    Route::get('/lab', [LabKreatifController::class, 'indeks'])->name('lab');
    Route::post('/lab/evaluasi', [LabKreatifController::class, 'evaluasiAI'])->name('lab.evaluasi');

    // API untuk Siswa
    Route::post('/progres/selesai', [ProgresController::class, 'selesai'])->name('progres.selesai');
    Route::post('/asisten-ai/tanya', [AsistenAIController::class, 'tanya'])->name('ai.tanya');
});

// ─────────────────────────────────────────────────────────────────────────────
// AREA ADMIN (Hanya Role: Admin)
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware(['auth'])->prefix('admin')->group(function () {

    // Halaman Tampilan (Inertia Views)
    Route::get('/overview', [AdminBerandaController::class, 'indeks'])->name('admin.overview');
    Route::get('/users', [AdminUserController::class, 'indeks'])->name('admin.users');
    Route::get('/kursus', [AdminKursusController::class, 'indeks'])->name('admin.kursus');
    Route::get('/kursus/{id}/materi', [AdminKursusController::class, 'materi'])->name('admin.kursus.materi');
    Route::post('/settings/profile', [ProfilController::class, 'updateAdmin'])->name('admin.settings.update');
    Route::post('/settings/system', [ProfilController::class, 'updateSystem'])->name('admin.settings.system');

    // Manajemen Soal Penjajakan
    Route::get('/soal-penjajakan', [AdminSoalController::class, 'indeks'])->name('admin.soal');
    Route::post('/soal-penjajakan', [AdminSoalController::class, 'simpan'])->name('admin.soal.simpan');
    Route::put('/soal-penjajakan/{id}', [AdminSoalController::class, 'update'])->name('admin.soal.update');
    Route::delete('/soal-penjajakan/{id}', [AdminSoalController::class, 'hapus'])->name('admin.soal.hapus');
    Route::patch('/soal-penjajakan/{id}/toggle', [AdminSoalController::class, 'toggleAktif'])->name('admin.soal.toggle');

    // Manajemen Notifikasi
    Route::get('/notifikasi', [\App\Fitur\Admin\Controllers\AdminNotifikasiController::class, 'indeks'])->name('admin.notifikasi');
    Route::post('/notifikasi/kirim', [\App\Fitur\Admin\Controllers\AdminNotifikasiController::class, 'kirim'])->name('admin.notifikasi.kirim');
    Route::delete('/notifikasi/{id}', [\App\Fitur\Admin\Controllers\AdminNotifikasiController::class, 'hapus'])->name('admin.notifikasi.hapus');

    // ─────────────────────────────────────────────────────────────────────────
    // REST API Endpoints v1 (JSON Response) — Base URL: /admin/api/v1/
    // ─────────────────────────────────────────────────────────────────────────
    Route::prefix('api/v1')->group(function () {

        // Manajemen Kursus
        Route::get('/kursus', [ApiKursusController::class, 'indeks']);
        Route::post('/kursus', [ApiKursusController::class, 'simpan']);
        Route::get('/kursus/{id}', [ApiKursusController::class, 'detail']);
        Route::put('/kursus/{id}', [ApiKursusController::class, 'update']);
        Route::delete('/kursus/{id}', [ApiKursusController::class, 'hapus']);

        // Manajemen Modul
        Route::post('/modul', [ApiKursusController::class, 'simpanModul']);
        Route::put('/modul/{id}', [ApiKursusController::class, 'updateModul']);
        Route::delete('/modul/{id}', [ApiKursusController::class, 'hapusModul']);

        // Manajemen Materi
        Route::post('/materi', [ApiKursusController::class, 'simpanMateri']);
        Route::put('/materi/{id}', [ApiKursusController::class, 'updateMateri']);
        Route::delete('/materi/{id}', [ApiKursusController::class, 'hapusMateri']);

        // Manajemen User
        Route::put('/users/{id}/role', [ApiAdminController::class, 'updateRole']);
        Route::delete('/users/{id}', [ApiAdminController::class, 'hapusUser']);
    });
});
