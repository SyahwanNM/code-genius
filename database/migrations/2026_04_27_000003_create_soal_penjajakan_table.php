<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('soal_penjajakan', function (Blueprint $table) {
            $table->id();
            $table->string('jalur'); // 'frontend' | 'backend'
            $table->text('pertanyaan');
            $table->string('tipe')->default('pilihan_ganda'); // 'pilihan_ganda'
            $table->text('opsi_a');
            $table->text('opsi_b');
            $table->text('opsi_c');
            $table->text('opsi_d');
            $table->string('jawaban_benar', 1); // 'a', 'b', 'c', 'd'
            $table->text('penjelasan')->nullable(); // Penjelasan jawaban benar (opsional)
            $table->integer('bobot_skor')->default(10);
            $table->integer('urutan')->default(0);
            $table->boolean('aktif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('soal_penjajakan');
    }
};
