<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hasil_penjajakan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('cascade');
            $table->string('jalur'); // 'frontend' | 'backend'
            $table->integer('skor_total')->default(0);
            $table->integer('skor_maksimal')->default(0);
            $table->integer('persentase')->default(0);
            $table->string('level_didapat'); // 'beginner' | 'intermediate' | 'advanced'
            $table->json('detail_jawaban')->nullable(); // [{soal_id, jawaban_user, benar}]
            $table->timestamp('selesai_pada')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hasil_penjajakan');
    }
};
