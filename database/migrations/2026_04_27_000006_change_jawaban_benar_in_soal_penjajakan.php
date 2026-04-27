<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('soal_penjajakan', function (Blueprint $table) {
            // Ubah jawaban_benar dari VARCHAR(1) menjadi TEXT
            // agar bisa menyimpan jawaban panjang untuk soal tipe 'kode'
            $table->text('jawaban_benar')->change();
        });
    }

    public function down(): void
    {
        Schema::table('soal_penjajakan', function (Blueprint $table) {
            $table->string('jawaban_benar', 1)->change();
        });
    }
};
