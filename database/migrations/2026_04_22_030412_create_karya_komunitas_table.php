<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('karya_komunitas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('cascade');
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->text('kode_html');
            $table->text('kode_css')->nullable();
            $table->text('kode_js')->nullable();
            $table->string('bahasa_utama'); // html/javascript
            $table->integer('jumlah_like')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('karya_komunitas');
    }
};
