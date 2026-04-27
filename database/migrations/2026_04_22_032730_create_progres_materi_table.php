<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progres_materi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('cascade');
            $table->foreignId('id_materi')->constrained('materi')->onDelete('cascade');
            $table->timestamp('selesai_pada');
            $table->timestamps();
            
            $table->unique(['id_pengguna', 'id_materi']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progres_materi');
    }
};
