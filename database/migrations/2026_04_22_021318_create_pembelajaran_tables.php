<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kursus', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('slug')->unique();
            $table->text('deskripsi')->nullable();
            $table->string('ikon')->nullable();
            $table->timestamps();
        });

        Schema::create('modul', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_kursus')->constrained('kursus')->onDelete('cascade');
            $table->string('judul');
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });

        Schema::create('materi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_modul')->constrained('modul')->onDelete('cascade');
            $table->string('judul');
            $table->string('slug')->unique();
            $table->longText('konten')->nullable(); // Markdown or HTML
            $table->string('tipe')->default('teks'); // teks, latihan
            $table->text('contoh_kode')->nullable();
            $table->text('jawaban_kode')->nullable();
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materi');
        Schema::dropIfExists('modul');
        Schema::dropIfExists('kursus');
    }
};
