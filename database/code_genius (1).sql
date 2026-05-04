-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Bulan Mei 2026 pada 09.34
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `code_genius`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `batch_pekerjaan`
--

CREATE TABLE `batch_pekerjaan` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `broadcasts`
--

CREATE TABLE `broadcasts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `pesan` text NOT NULL,
  `tipe` varchar(255) NOT NULL DEFAULT 'info',
  `tautan` varchar(255) DEFAULT NULL,
  `total_penerima` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `broadcasts`
--

INSERT INTO `broadcasts` (`id`, `judul`, `pesan`, `tipe`, `tautan`, `total_penerima`, `created_at`, `updated_at`) VALUES
(1, 'Halo bray', 'anjay mabar', 'info', NULL, 3, '2026-05-02 00:30:28', '2026-05-02 00:30:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `hasil_penjajakan`
--

CREATE TABLE `hasil_penjajakan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pengguna` bigint(20) UNSIGNED NOT NULL,
  `jalur` varchar(255) NOT NULL,
  `skor_total` int(11) NOT NULL DEFAULT 0,
  `skor_maksimal` int(11) NOT NULL DEFAULT 0,
  `persentase` int(11) NOT NULL DEFAULT 0,
  `level_didapat` varchar(255) NOT NULL,
  `detail_jawaban` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`detail_jawaban`)),
  `selesai_pada` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `hasil_penjajakan`
--

INSERT INTO `hasil_penjajakan` (`id`, `id_pengguna`, `jalur`, `skor_total`, `skor_maksimal`, `persentase`, `level_didapat`, `detail_jawaban`, `selesai_pada`, `created_at`, `updated_at`) VALUES
(1, 3, 'frontend', 0, 0, 0, 'beginner', '[]', '2026-04-26 20:57:33', '2026-04-26 20:57:33', '2026-04-26 20:57:33'),
(2, 1, 'frontend', 20, 115, 17, 'beginner', '[{\"soal_id\":1,\"pertanyaan\":\"Manakah elemen HTML yang benar untuk menyisipkan baris baru (line break)?\",\"tipe\":\"pilihan_ganda\",\"jawaban_user\":\"b\",\"jawaban_benar\":\"c\",\"benar\":false,\"penjelasan\":\"Tag <br> digunakan untuk membuat baris baru tanpa memulai paragraf baru.\"},{\"soal_id\":2,\"pertanyaan\":\"Apa output dari: console.log(1 + \\\"1\\\" - 1)?\",\"tipe\":\"pilihan_ganda\",\"jawaban_user\":\"d\",\"jawaban_benar\":\"b\",\"benar\":false,\"penjelasan\":\"1 + \\\"1\\\" menjadi string \\\"11\\\", lalu \\\"11\\\" - 1 melakukan konversi numerik menjadi 10.\"},{\"soal_id\":3,\"pertanyaan\":\"Property CSS mana yang digunakan untuk mengontrol spasi antar huruf (character spacing)?\",\"tipe\":\"pilihan_ganda\",\"jawaban_user\":\"c\",\"jawaban_benar\":\"b\",\"benar\":false,\"penjelasan\":\"letter-spacing mengatur jarak antar karakter, sedangkan word-spacing mengatur jarak antar kata.\"},{\"soal_id\":4,\"pertanyaan\":\"Dalam JavaScript, apa fungsi dari `Object.freeze()`?\",\"tipe\":\"pilihan_ganda\",\"jawaban_user\":\"b\",\"jawaban_benar\":\"b\",\"benar\":true,\"penjelasan\":\"Object.freeze() mencegah perubahan apapun pada objek yang sudah ada.\"},{\"soal_id\":5,\"pertanyaan\":\"Perhatikan kode JavaScript berikut (Closure). Apa output yang dihasilkan?\",\"tipe\":\"kode\",\"jawaban_user\":\"skja\",\"jawaban_benar\":\"2\",\"benar\":false,\"penjelasan\":\"Panggilan pertama c() mengubah count jadi 1, panggilan kedua mengubahnya jadi 2 dan mengembalikannya.\"},{\"soal_id\":6,\"pertanyaan\":\"Manakah unit CSS yang nilainya relatif terhadap ukuran font dari elemen root (<html>)?\",\"tipe\":\"pilihan_ganda\",\"jawaban_user\":\"b\",\"jawaban_benar\":\"b\",\"benar\":true,\"penjelasan\":\"rem (Root EM) relatif terhadap font-size elemen root. em relatif terhadap font-size elemen induknya.\"},{\"soal_id\":7,\"pertanyaan\":\"Gunakan Fetch API untuk mengambil data dari URL \\\"https:\\/\\/api.example.com\\/data\\\". Tuliskan baris kode untuk mengubah response menjadi format JSON.\",\"tipe\":\"kode\",\"jawaban_user\":\"apalah\",\"jawaban_benar\":\"json\",\"benar\":false,\"penjelasan\":\"Method response.json() digunakan untuk mengekstrak body JSON dari object response Fetch.\"},{\"soal_id\":8,\"pertanyaan\":\"Implementasikan fungsi sederhana `kuadrat` menggunakan arrow function dalam satu baris yang menerima parameter `n` dan mengembalikan nilai kuadratnya.\",\"tipe\":\"kode\",\"jawaban_user\":\"tak tau\",\"jawaban_benar\":\"n => n * n\",\"benar\":false,\"penjelasan\":\"Arrow function satu baris memiliki implicit return.\"},{\"soal_id\":9,\"pertanyaan\":\"Apa yang terjadi jika kita mencoba mengakses properti di `null` atau `undefined` tanpa optional chaining di JS modern?\",\"tipe\":\"pilihan_ganda\",\"jawaban_user\":\"b\",\"jawaban_benar\":\"c\",\"benar\":false,\"penjelasan\":\"Mengakses properti dari non-object (null\\/undefined) akan menyebabkan error fatal TypeError.\"},{\"soal_id\":10,\"pertanyaan\":\"Perhatikan array berikut: `const data = [{x:1}, {x:5}, {x:10}]`. Gunakan `reduce` untuk menjumlahkan semua nilai `x`. Tuliskan isi dari fungsi reduce-nya.\",\"tipe\":\"kode\",\"jawaban_user\":\"apalah\",\"jawaban_benar\":\"acc + curr.x\",\"benar\":false,\"penjelasan\":\"Fungsi reduce mengakumulasi nilai acc dengan nilai curr.x di setiap iterasi.\"}]', '2026-04-26 21:51:00', '2026-04-26 21:51:00', '2026-04-26 21:51:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `karya_komunitas`
--

CREATE TABLE `karya_komunitas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pengguna` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `kode_html` text NOT NULL,
  `kode_css` text DEFAULT NULL,
  `kode_js` text DEFAULT NULL,
  `bahasa_utama` varchar(255) NOT NULL,
  `jumlah_like` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `karya_komunitas`
--

INSERT INTO `karya_komunitas` (`id`, `id_pengguna`, `judul`, `deskripsi`, `kode_html`, `kode_css`, `kode_js`, `bahasa_utama`, `jumlah_like`, `created_at`, `updated_at`) VALUES
(1, 1, 'Karya: Latihan: Membuat Paragraf', 'Hasil latihan materi Latihan: Membuat Paragraf di Code Genius.', '<p>Saya sedang belajar di Code Genius</p>', NULL, NULL, 'html', 0, '2026-04-21 20:12:32', '2026-04-21 20:12:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `konfigurasi`
--

CREATE TABLE `konfigurasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `site_name` varchar(255) NOT NULL DEFAULT 'Code Genius',
  `maintenance_mode` tinyint(1) NOT NULL DEFAULT 0,
  `registration_open` tinyint(1) NOT NULL DEFAULT 1,
  `ai_debug` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `konfigurasi`
--

INSERT INTO `konfigurasi` (`id`, `site_name`, `maintenance_mode`, `registration_open`, `ai_debug`, `created_at`, `updated_at`) VALUES
(1, 'Code Genius', 0, 1, 0, '2026-05-01 23:04:33', '2026-05-01 23:11:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kunci_tembolok`
--

CREATE TABLE `kunci_tembolok` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kursus`
--

CREATE TABLE `kursus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `ikon` varchar(255) DEFAULT NULL,
  `jalur` varchar(255) NOT NULL DEFAULT 'umum',
  `level_kesulitan` varchar(255) NOT NULL DEFAULT 'beginner',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kursus`
--

INSERT INTO `kursus` (`id`, `nama`, `slug`, `deskripsi`, `ikon`, `jalur`, `level_kesulitan`, `created_at`, `updated_at`) VALUES
(1, 'Roadmap Frontend: Beginner', 'roadmap-frontend-beginner', 'Langkah pertama Anda menjadi Frontend Developer. Pelajari dasar-dasar membangun antarmuka web statis.', '🖥️', 'frontend', 'beginner', '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(2, 'Roadmap Backend: Beginner', 'roadmap-backend-beginner', 'Langkah awal di balik layar. Pelajari cara kerja server dan logika database dasar.', '⚙️', 'backend', 'beginner', '2026-04-26 21:41:06', '2026-04-26 21:41:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `materi`
--

CREATE TABLE `materi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_modul` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `konten` longtext DEFAULT NULL,
  `tipe` varchar(255) NOT NULL DEFAULT 'teks',
  `contoh_kode` text DEFAULT NULL,
  `jawaban_kode` text DEFAULT NULL,
  `urutan` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `materi`
--

INSERT INTO `materi` (`id`, `id_modul`, `judul`, `slug`, `konten`, `tipe`, `contoh_kode`, `jawaban_kode`, `urutan`, `created_at`, `updated_at`) VALUES
(1, 1, 'Fondasi HTML', 'fb-lvl1-materi', '<h1>Selamat datang di Level 1!</h1><p>Website dibangun di atas fondasi HTML. Setiap elemen mulai dari tombol, gambar, hingga teks semuanya didefinisikan menggunakan HTML (HyperText Markup Language).</p>', 'teks', NULL, NULL, 1, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(2, 1, 'Misi: Membuat Heading', 'fb-lvl1-misi', '<p><strong>Misi Anda:</strong> Buatlah sebuah heading tingkat 1 (H1) dengan teks persis \"Halo Dunia!\". AI akan mengecek kode Anda, pastikan tag tidak salah.</p>', 'latihan', '<!-- Tulis tag HTML di sini -->', '<h1>Halo Dunia!</h1>', 2, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(3, 2, 'Menyapa Pengguna', 'fb-lvl2-materi', '<h1>JavaScript Dasar</h1><p>HTML untuk struktur, CSS untuk desain, dan JavaScript untuk interaksi. Fungsi paling dasar adalah menampilkan pesan menggunakan <code>console.log()</code>.</p>', 'teks', NULL, NULL, 1, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(4, 2, 'Misi: Mencetak Teks', 'fb-lvl2-misi', '<p><strong>Misi Anda:</strong> Gunakan perintah JavaScript untuk mencetak teks \"Saya Frontend Developer\" ke dalam console.</p>', 'latihan', '// Tulis kode JavaScript di sini', 'console.log(\"Saya Frontend Developer\");', 2, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(5, 3, 'Apa itu PHP?', 'bb-lvl1-materi', '<h1>PHP (Hypertext Preprocessor)</h1><p>Bahasa script server-side yang populer. Semua kode PHP dijalankan di server, dan hasilnya dikirimkan ke browser sebagai HTML.</p>', 'teks', NULL, NULL, 1, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(6, 3, 'Misi: Echo Data', 'bb-lvl1-misi', '<p><strong>Misi Anda:</strong> Buat script PHP sederhana yang mencetak angka <code>200</code> yang menandakan status HTTP OK.</p>', 'latihan', '<?php\n// Gunakan echo', 'echo 200;', 2, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(7, 4, 'Pengenalan SQL', 'bb-lvl2-materi', '<h1>SQL Dasar</h1><p>SQL digunakan untuk berinteraksi dengan database. Perintah paling umum adalah SELECT untuk mengambil data.</p>', 'teks', NULL, NULL, 1, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(8, 4, 'Misi: Mengambil Data', 'bb-lvl2-misi', '<p><strong>Misi Anda:</strong> Tulis query SQL untuk mengambil kolom `nama` dari tabel `users`.</p>', 'latihan', '-- Tulis query SQL di sini', 'SELECT nama FROM users;', 2, '2026-04-26 21:41:06', '2026-04-26 21:41:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_22_021318_create_pembelajaran_tables', 1),
(5, '2026_04_22_030412_create_karya_komunitas_table', 2),
(6, '2026_04_22_032652_add_gamification_to_pengguna_table', 3),
(7, '2026_04_22_032730_create_progres_materi_table', 4),
(8, '2026_04_22_043100_add_bio_to_pengguna_table', 5),
(9, '2026_04_22_044823_create_pengajuan_mentor_table', 6),
(10, '2026_04_22_045504_create_transaksi_table', 7),
(11, '2026_04_27_000001_add_onboarding_to_pengguna_table', 8),
(12, '2026_04_27_000002_add_jalur_level_to_kursus_table', 8),
(13, '2026_04_27_000003_create_soal_penjajakan_table', 8),
(14, '2026_04_27_000004_create_hasil_penjajakan_table', 8),
(15, '2026_04_27_000005_add_kode_to_soal_penjajakan_table', 9),
(16, '2026_04_27_000006_change_jawaban_benar_in_soal_penjajakan', 10),
(17, '2026_04_27_000007_add_difficulty_level_to_soal_penjajakan', 11),
(18, '2026_05_02_060417_create_konfigurasi_table', 12),
(19, '2026_05_02_061856_update_peran_enum_in_pengguna_table', 13),
(20, '2026_05_02_063915_create_notifikasi_table', 14),
(21, '2026_05_02_070801_add_extra_profile_fields_to_pengguna_table', 15),
(22, '2026_05_02_072758_create_broadcasts_table', 16);

-- --------------------------------------------------------

--
-- Struktur dari tabel `modul`
--

CREATE TABLE `modul` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_kursus` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `urutan` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `modul`
--

INSERT INTO `modul` (`id`, `id_kursus`, `judul`, `urutan`, `created_at`, `updated_at`) VALUES
(1, 1, 'Level 1: Struktur Web Dasar', 1, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(2, 1, 'Level 2: Logika JavaScript', 2, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(3, 2, 'Level 1: Logika Server', 1, '2026-04-26 21:41:06', '2026-04-26 21:41:06'),
(4, 2, 'Level 2: Relasi Data', 2, '2026-04-26 21:41:06', '2026-04-26 21:41:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notifikasi`
--

CREATE TABLE `notifikasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pengguna` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `pesan` text NOT NULL,
  `tipe` varchar(255) NOT NULL DEFAULT 'info',
  `dibaca` tinyint(1) NOT NULL DEFAULT 0,
  `url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_broadcast` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `notifikasi`
--

INSERT INTO `notifikasi` (`id`, `id_pengguna`, `judul`, `pesan`, `tipe`, `dibaca`, `url`, `created_at`, `updated_at`, `id_broadcast`) VALUES
(1, 1, 'Halo semua', 'Saya admin', 'info', 0, NULL, '2026-05-02 00:24:19', '2026-05-02 00:24:19', NULL),
(2, 3, 'Halo semua', 'Saya admin', 'info', 0, NULL, '2026-05-02 00:24:19', '2026-05-02 00:24:19', NULL),
(3, 4, 'Halo semua', 'Saya admin', 'info', 0, NULL, '2026-05-02 00:24:19', '2026-05-02 00:24:19', NULL),
(4, 1, 'Halo semua', 'Saya admin', 'info', 0, NULL, '2026-05-02 00:25:29', '2026-05-02 00:25:29', NULL),
(5, 3, 'Halo semua', 'Saya admin', 'info', 0, NULL, '2026-05-02 00:25:29', '2026-05-02 00:25:29', NULL),
(6, 4, 'Halo semua', 'Saya admin', 'info', 0, NULL, '2026-05-02 00:25:29', '2026-05-02 00:25:29', NULL),
(7, 1, 'Halo bray', 'anjay mabar', 'info', 0, NULL, '2026-05-02 00:30:28', '2026-05-02 00:30:28', 1),
(8, 3, 'Halo bray', 'anjay mabar', 'info', 0, NULL, '2026-05-02 00:30:28', '2026-05-02 00:30:28', 1),
(9, 4, 'Halo bray', 'anjay mabar', 'info', 0, NULL, '2026-05-02 00:30:28', '2026-05-02 00:30:28', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pekerjaan`
--

CREATE TABLE `pekerjaan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pekerjaan_gagal`
--

CREATE TABLE `pekerjaan_gagal` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengajuan_mentor`
--

CREATE TABLE `pengajuan_mentor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pengguna` bigint(20) UNSIGNED NOT NULL,
  `motivasi` text NOT NULL,
  `portofolio` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Diterima','Ditolak') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `email_diverifikasi_pada` timestamp NULL DEFAULT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `peran` enum('admin','pengguna_biasa','mentor') NOT NULL DEFAULT 'pengguna_biasa',
  `token_ingat` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `xp` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `jalur_belajar` varchar(255) DEFAULT NULL,
  `level_pemahaman` varchar(255) DEFAULT NULL,
  `tes_selesai` tinyint(1) NOT NULL DEFAULT 0,
  `streak_harian` int(11) NOT NULL DEFAULT 0,
  `terakhir_belajar` timestamp NULL DEFAULT NULL,
  `tautan_sosial` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tautan_sosial`)),
  `keahlian_utama` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`keahlian_utama`)),
  `avatar_style` varchar(255) NOT NULL DEFAULT 'avataaars',
  `foto_profil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id`, `nama`, `email`, `bio`, `email_diverifikasi_pada`, `kata_sandi`, `peran`, `token_ingat`, `created_at`, `updated_at`, `xp`, `level`, `jalur_belajar`, `level_pemahaman`, `tes_selesai`, `streak_harian`, `terakhir_belajar`, `tautan_sosial`, `keahlian_utama`, `avatar_style`, `foto_profil`) VALUES
(1, 'Test User', 'test@example.com', NULL, '2026-04-21 19:38:55', '$2y$12$rLg0vBwbMeSIy5NS63bif.nqtth4cMqbmsp1DKccWsFC2l3ui1wUK', 'pengguna_biasa', 'A6CweHTYYN8qMvr2M8UfZI3nYkAZ6PNOv0vWjkLGH7jfrgZGgtlsvhjNAtAq', '2026-04-21 19:38:56', '2026-05-02 00:15:25', 150, 2, 'frontend', 'beginner', 1, 2, '2026-05-02 00:05:22', '{\"github\":null,\"linkedin\":null,\"website\":null}', '[]', 'bottts', NULL),
(2, 'Pusat Kontrol Admin', 'admin@codegenius.com', NULL, NULL, '$2y$12$dqLvW.VMAdAjPyQgsJEzSOtRH5YhbQP1EDTmaGGtwE6ke2rJLxBre', 'admin', NULL, '2026-04-21 21:50:35', '2026-05-01 23:21:41', 9999, 99, NULL, NULL, 0, 0, NULL, NULL, NULL, 'avataaars', NULL),
(3, 'Test User', 'testuser1@example.com', NULL, NULL, '$2y$12$xTvmqRWVJsLeBTgqH1prTOXqFZzVArCJXJxoqzERO/M6JynYmERiO', 'pengguna_biasa', NULL, '2026-04-26 20:57:02', '2026-04-26 20:57:33', 0, 1, 'frontend', 'beginner', 1, 0, NULL, NULL, NULL, 'avataaars', NULL),
(4, 'Browser Tester', 'browser.tester@example.com', NULL, NULL, '$2y$12$v7sCYAtPkmR3TMvTo6FpRe9x4LJxYu2qnu7DzaYwKlBGYJ5Mz6NWW', 'pengguna_biasa', NULL, '2026-04-26 21:16:20', '2026-04-26 21:16:34', 0, 1, 'frontend', NULL, 0, 0, NULL, NULL, NULL, 'avataaars', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `progres_materi`
--

CREATE TABLE `progres_materi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pengguna` bigint(20) UNSIGNED NOT NULL,
  `id_materi` bigint(20) UNSIGNED NOT NULL,
  `selesai_pada` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `progres_materi`
--

INSERT INTO `progres_materi` (`id`, `id_pengguna`, `id_materi`, `selesai_pada`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2026-05-01 15:07:19', '2026-05-01 15:07:19', '2026-05-01 15:07:19'),
(2, 1, 1, '2026-05-02 00:05:18', '2026-05-02 00:05:18', '2026-05-02 00:05:18'),
(3, 1, 3, '2026-05-02 00:05:22', '2026-05-02 00:05:22', '2026-05-02 00:05:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sesi`
--

CREATE TABLE `sesi` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sesi`
--

INSERT INTO `sesi` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6UOnwkM6OIlJN3J4rp2zw8GWRTzloPVvC77si4nU', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibU9JazMxYmRkZk5XUVg0UWJEQndaN3h3cER2QTNidG1aUFRjUXA5YSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMxOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvZGFzaGJvYXJkIjtzOjU6InJvdXRlIjtzOjk6ImRhc2hib2FyZCI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1777707178),
('iIqhOP5If6D6raI5vefIPTrr9MdM4FeXohyvl5b4', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUlByNm9NVTdxQ0ZaOXV5eFdZNHBIdG9nOG83MDlqbFRKQndSRnBpWSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9vdmVydmlldyI7czo1OiJyb3V0ZSI7czoxNDoiYWRtaW4ub3ZlcnZpZXciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=', 1777707187);

-- --------------------------------------------------------

--
-- Struktur dari tabel `soal_penjajakan`
--

CREATE TABLE `soal_penjajakan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jalur` varchar(255) NOT NULL,
  `pertanyaan` text NOT NULL,
  `kode_pertanyaan` text DEFAULT NULL,
  `tipe` varchar(255) NOT NULL DEFAULT 'pilihan_ganda',
  `difficulty_level` varchar(255) NOT NULL DEFAULT 'beginner',
  `opsi_a` text NOT NULL,
  `opsi_b` text NOT NULL,
  `opsi_c` text NOT NULL,
  `opsi_d` text NOT NULL,
  `jawaban_benar` text NOT NULL,
  `kata_kunci_jawaban` text DEFAULT NULL,
  `penjelasan` text DEFAULT NULL,
  `bobot_skor` int(11) NOT NULL DEFAULT 10,
  `urutan` int(11) NOT NULL DEFAULT 0,
  `aktif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `soal_penjajakan`
--

INSERT INTO `soal_penjajakan` (`id`, `jalur`, `pertanyaan`, `kode_pertanyaan`, `tipe`, `difficulty_level`, `opsi_a`, `opsi_b`, `opsi_c`, `opsi_d`, `jawaban_benar`, `kata_kunci_jawaban`, `penjelasan`, `bobot_skor`, `urutan`, `aktif`, `created_at`, `updated_at`) VALUES
(1, 'frontend', 'Manakah elemen HTML yang benar untuk menyisipkan baris baru (line break)?', NULL, 'pilihan_ganda', 'beginner', '<lb>', '<break>', '<br>', '<new>', 'c', NULL, 'Tag <br> digunakan untuk membuat baris baru tanpa memulai paragraf baru.', 5, 1, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(2, 'frontend', 'Apa output dari: console.log(1 + \"1\" - 1)?', 'console.log(1 + \"1\" - 1);', 'pilihan_ganda', 'beginner', '11', '10', '1', 'NaN', 'b', NULL, '1 + \"1\" menjadi string \"11\", lalu \"11\" - 1 melakukan konversi numerik menjadi 10.', 10, 2, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(3, 'frontend', 'Property CSS mana yang digunakan untuk mengontrol spasi antar huruf (character spacing)?', NULL, 'pilihan_ganda', 'beginner', 'word-spacing', 'letter-spacing', 'text-spacing', 'font-spacing', 'b', NULL, 'letter-spacing mengatur jarak antar karakter, sedangkan word-spacing mengatur jarak antar kata.', 5, 3, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(4, 'frontend', 'Dalam JavaScript, apa fungsi dari `Object.freeze()`?', NULL, 'pilihan_ganda', 'intermediate', 'Menghapus semua properti dari objek', 'Membuat objek tidak dapat diubah (immutable), tidak bisa tambah/hapus/ubah properti', 'Menyembunyikan objek dari debugger', 'Mengompresi objek untuk menghemat memori', 'b', NULL, 'Object.freeze() mencegah perubahan apapun pada objek yang sudah ada.', 10, 4, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(5, 'frontend', 'Perhatikan kode JavaScript berikut (Closure). Apa output yang dihasilkan?', 'function buatCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\nconst c = buatCounter();\nc();\nconsole.log(c());', 'kode', 'intermediate', '', '', '', '', '2', '2', 'Panggilan pertama c() mengubah count jadi 1, panggilan kedua mengubahnya jadi 2 dan mengembalikannya.', 15, 5, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(6, 'frontend', 'Manakah unit CSS yang nilainya relatif terhadap ukuran font dari elemen root (<html>)?', NULL, 'pilihan_ganda', 'intermediate', 'em', 'rem', 'vh', 'px', 'b', NULL, 'rem (Root EM) relatif terhadap font-size elemen root. em relatif terhadap font-size elemen induknya.', 10, 6, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(7, 'frontend', 'Gunakan Fetch API untuk mengambil data dari URL \"https://api.example.com/data\". Tuliskan baris kode untuk mengubah response menjadi format JSON.', 'fetch(\'https://api.example.com/data\')\n  .then(response => response._______());', 'kode', 'intermediate', '', '', '', '', 'json', 'json', 'Method response.json() digunakan untuk mengekstrak body JSON dari object response Fetch.', 15, 7, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(8, 'frontend', 'Implementasikan fungsi sederhana `kuadrat` menggunakan arrow function dalam satu baris yang menerima parameter `n` dan mengembalikan nilai kuadratnya.', '// Contoh: kuadrat(4) => 16\nconst kuadrat = _______ => _______;', 'kode', 'advanced', '', '', '', '', 'n => n * n', 'n * n', 'Arrow function satu baris memiliki implicit return.', 15, 8, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(9, 'frontend', 'Apa yang terjadi jika kita mencoba mengakses properti di `null` atau `undefined` tanpa optional chaining di JS modern?', NULL, 'pilihan_ganda', 'advanced', 'Mengembalikan undefined', 'Mengembalikan null', 'Melempar TypeError (Uncaught TypeError)', 'Program berhenti diam-diam tanpa error', 'c', NULL, 'Mengakses properti dari non-object (null/undefined) akan menyebabkan error fatal TypeError.', 15, 9, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(10, 'frontend', 'Perhatikan array berikut: `const data = [{x:1}, {x:5}, {x:10}]`. Gunakan `reduce` untuk menjumlahkan semua nilai `x`. Tuliskan isi dari fungsi reduce-nya.', 'const total = data.reduce((acc, curr) => _______, 0);', 'kode', 'advanced', '', '', '', '', 'acc + curr.x', 'acc + curr.x', 'Fungsi reduce mengakumulasi nilai acc dengan nilai curr.x di setiap iterasi.', 15, 10, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(11, 'backend', 'HTTP status code manakah yang berarti \"Not Found\"?1', NULL, 'pilihan_ganda', 'beginner', '200', '403', '404', '500', 'c', NULL, '404 Not Found adalah kode standar jika resource yang diminta tidak ditemukan di server.', 5, 1, 1, '2026-04-26 21:27:56', '2026-05-01 23:20:24'),
(12, 'backend', 'Fungsi PHP manakah yang digunakan untuk mencetak teks ke browser?', NULL, 'pilihan_ganda', 'beginner', 'print()', 'echo', 'write()', 'A dan B benar', 'd', NULL, 'Baik echo maupun print() dapat digunakan untuk output string di PHP.', 5, 2, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(13, 'backend', 'Apa simbol yang digunakan untuk memulai variabel di PHP?', NULL, 'pilihan_ganda', 'beginner', '&', '#', '$', '@', 'c', NULL, 'Semua variabel di PHP harus diawali dengan tanda dollar ($).', 5, 3, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(14, 'backend', 'Manakah tipe JOIN SQL yang hanya mengembalikan baris yang memiliki kecocokan di kedua tabel?', NULL, 'pilihan_ganda', 'intermediate', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'c', NULL, 'INNER JOIN mencari irisan (intersection) data yang ada di kedua tabel.', 10, 4, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(15, 'backend', 'Apa tujuan dari menggunakan Middleware di Laravel?', NULL, 'pilihan_ganda', 'intermediate', 'Mengatur layout tampilan (Blade)', 'Menyaring (filter) HTTP request yang masuk ke aplikasi', 'Menyimpan data ke database', 'Mempercepat query database', 'b', NULL, 'Middleware bertindak sebagai mekanisme penyaring (misal: cek login) sebelum request sampai ke controller.', 10, 5, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(16, 'backend', 'Lengkapi query SQL untuk mengambil 5 user terbaru berdasarkan tanggal dibuat.', 'SELECT * FROM users\n_______ BY created_at _______\nLIMIT 5;', 'kode', 'intermediate', '', '', '', '', 'ORDER BY created_at DESC', 'order, desc', 'ORDER BY ... DESC digunakan untuk mengurutkan dari yang terbaru/terbesar.', 15, 6, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(17, 'backend', 'Dalam arsitektur MVC, \"Controller\" bertanggung jawab untuk apa?', NULL, 'pilihan_ganda', 'intermediate', 'Mendefinisikan skema database', 'Menangani logika bisnis dan interaksi antara Model dan View', 'Menampilkan data ke user (UI)', 'Menyimpan konfigurasi server', 'b', NULL, 'Controller adalah jembatan yang memproses input user, memanggil model, dan mengirim data ke view.', 10, 7, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(18, 'backend', 'Tuliskan method Eloquent Laravel untuk mengambil data User yang memiliki id = 1, namun lemparkan error 404 otomatis jika tidak ditemukan.', 'User::_______(1);', 'kode', 'advanced', '', '', '', '', 'findOrFail', 'findorfail', 'findOrFail() adalah shortcut praktis di Laravel untuk mencari id atau auto-abort 404.', 15, 8, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(19, 'backend', 'Apa itu \"SQL Injection\" dan bagaimana cara terbaik mencegahnya di Laravel?', NULL, 'pilihan_ganda', 'advanced', 'Teknik mencuri password, dicegah dengan hash md5', 'Manipulasi query database melalui input user, dicegah dengan Eloquent atau Query Builder (Parameterized Queries)', 'Cara mempercepat query, dicegah dengan cache', 'Error saat database penuh, dicegah dengan upgrade RAM', 'b', NULL, 'Eloquent menggunakan PDO parameter binding yang secara otomatis membersihkan input dari karakter berbahaya.', 15, 9, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56'),
(20, 'backend', 'Perhatikan kode PHP berikut (Dependency Injection). Apa nama konsep ketika class menerima object lain melalui constructor?', 'class UserRepo {\n  public function __construct(Database $db) {\n    $this->db = $db;\n  }\n}', 'kode', 'advanced', '', '', '', '', 'Dependency Injection', 'dependency injection', 'DI adalah pola desain di mana sebuah objek menerima objek lain yang dibutuhkannya (dependensinya).', 20, 10, 1, '2026-04-26 21:27:56', '2026-04-26 21:27:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tembolok`
--

CREATE TABLE `tembolok` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `token_atur_ulang_kata_sandi`
--

CREATE TABLE `token_atur_ulang_kata_sandi` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `dibuat_pada` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pengguna` bigint(20) UNSIGNED NOT NULL,
  `jenis_paket` varchar(255) NOT NULL,
  `jumlah_bayar` int(11) NOT NULL,
  `metode_pembayaran` varchar(255) NOT NULL DEFAULT 'Midtrans',
  `status` enum('Pending','Berhasil','Gagal') NOT NULL DEFAULT 'Berhasil',
  `tgl_bayar` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `id_pengguna`, `jenis_paket`, `jumlah_bayar`, `metode_pembayaran`, `status`, `tgl_bayar`, `created_at`, `updated_at`) VALUES
(1, 1, 'Pro Monthly', 150000, 'Midtrans', 'Berhasil', '2026-04-22 04:59:32', '2026-04-21 21:59:32', NULL),
(2, 1, 'Pro Yearly', 1200000, 'Midtrans', 'Berhasil', '2026-04-22 04:59:32', '2026-04-21 21:59:32', NULL),
(3, 2, 'Lifetime', 3500000, 'Midtrans', 'Pending', '2026-04-22 04:59:32', '2026-04-21 21:59:32', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `batch_pekerjaan`
--
ALTER TABLE `batch_pekerjaan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `broadcasts`
--
ALTER TABLE `broadcasts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `hasil_penjajakan`
--
ALTER TABLE `hasil_penjajakan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hasil_penjajakan_id_pengguna_foreign` (`id_pengguna`);

--
-- Indeks untuk tabel `karya_komunitas`
--
ALTER TABLE `karya_komunitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `karya_komunitas_id_pengguna_foreign` (`id_pengguna`);

--
-- Indeks untuk tabel `konfigurasi`
--
ALTER TABLE `konfigurasi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kunci_tembolok`
--
ALTER TABLE `kunci_tembolok`
  ADD PRIMARY KEY (`key`),
  ADD KEY `kunci_tembolok_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `kursus`
--
ALTER TABLE `kursus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kursus_slug_unique` (`slug`);

--
-- Indeks untuk tabel `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `materi_slug_unique` (`slug`),
  ADD KEY `materi_id_modul_foreign` (`id_modul`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `modul`
--
ALTER TABLE `modul`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modul_id_kursus_foreign` (`id_kursus`);

--
-- Indeks untuk tabel `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifikasi_id_pengguna_foreign` (`id_pengguna`),
  ADD KEY `notifikasi_id_broadcast_foreign` (`id_broadcast`);

--
-- Indeks untuk tabel `pekerjaan`
--
ALTER TABLE `pekerjaan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pekerjaan_queue_index` (`queue`);

--
-- Indeks untuk tabel `pekerjaan_gagal`
--
ALTER TABLE `pekerjaan_gagal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pekerjaan_gagal_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `pengajuan_mentor`
--
ALTER TABLE `pengajuan_mentor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengajuan_mentor_id_pengguna_foreign` (`id_pengguna`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pengguna_email_unique` (`email`);

--
-- Indeks untuk tabel `progres_materi`
--
ALTER TABLE `progres_materi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `progres_materi_id_pengguna_id_materi_unique` (`id_pengguna`,`id_materi`),
  ADD KEY `progres_materi_id_materi_foreign` (`id_materi`);

--
-- Indeks untuk tabel `sesi`
--
ALTER TABLE `sesi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sesi_user_id_index` (`user_id`),
  ADD KEY `sesi_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `soal_penjajakan`
--
ALTER TABLE `soal_penjajakan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tembolok`
--
ALTER TABLE `tembolok`
  ADD PRIMARY KEY (`key`),
  ADD KEY `tembolok_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `token_atur_ulang_kata_sandi`
--
ALTER TABLE `token_atur_ulang_kata_sandi`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaksi_id_pengguna_foreign` (`id_pengguna`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `broadcasts`
--
ALTER TABLE `broadcasts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `hasil_penjajakan`
--
ALTER TABLE `hasil_penjajakan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `karya_komunitas`
--
ALTER TABLE `karya_komunitas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `konfigurasi`
--
ALTER TABLE `konfigurasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `kursus`
--
ALTER TABLE `kursus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `materi`
--
ALTER TABLE `materi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `modul`
--
ALTER TABLE `modul`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `notifikasi`
--
ALTER TABLE `notifikasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pekerjaan`
--
ALTER TABLE `pekerjaan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pekerjaan_gagal`
--
ALTER TABLE `pekerjaan_gagal`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengajuan_mentor`
--
ALTER TABLE `pengajuan_mentor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `progres_materi`
--
ALTER TABLE `progres_materi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `soal_penjajakan`
--
ALTER TABLE `soal_penjajakan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `hasil_penjajakan`
--
ALTER TABLE `hasil_penjajakan`
  ADD CONSTRAINT `hasil_penjajakan_id_pengguna_foreign` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `karya_komunitas`
--
ALTER TABLE `karya_komunitas`
  ADD CONSTRAINT `karya_komunitas_id_pengguna_foreign` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `materi`
--
ALTER TABLE `materi`
  ADD CONSTRAINT `materi_id_modul_foreign` FOREIGN KEY (`id_modul`) REFERENCES `modul` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `modul`
--
ALTER TABLE `modul`
  ADD CONSTRAINT `modul_id_kursus_foreign` FOREIGN KEY (`id_kursus`) REFERENCES `kursus` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD CONSTRAINT `notifikasi_id_broadcast_foreign` FOREIGN KEY (`id_broadcast`) REFERENCES `broadcasts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifikasi_id_pengguna_foreign` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengajuan_mentor`
--
ALTER TABLE `pengajuan_mentor`
  ADD CONSTRAINT `pengajuan_mentor_id_pengguna_foreign` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `progres_materi`
--
ALTER TABLE `progres_materi`
  ADD CONSTRAINT `progres_materi_id_materi_foreign` FOREIGN KEY (`id_materi`) REFERENCES `materi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `progres_materi_id_pengguna_foreign` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_id_pengguna_foreign` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
