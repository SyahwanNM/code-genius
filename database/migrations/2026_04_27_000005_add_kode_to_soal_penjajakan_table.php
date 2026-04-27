<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('soal_penjajakan', function (Blueprint $table) {
            // Kode/snippet yang ditampilkan sebagai konteks soal (opsional)
            $table->text('kode_pertanyaan')->nullable()->after('pertanyaan');
            // Untuk tipe 'kode': jawaban_benar bisa berupa keyword yang harus ada di jawaban
            // Contoh: "innerHTML" atau "console.log" atau "SELECT"
            $table->text('kata_kunci_jawaban')->nullable()->after('jawaban_benar');
        });
    }

    public function down(): void
    {
        Schema::table('soal_penjajakan', function (Blueprint $table) {
            $table->dropColumn(['kode_pertanyaan', 'kata_kunci_jawaban']);
        });
    }
};
