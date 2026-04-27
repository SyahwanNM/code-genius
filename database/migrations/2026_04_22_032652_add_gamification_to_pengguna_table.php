<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->integer('xp')->default(0);
            $table->integer('level')->default(1);
            $table->integer('streak_harian')->default(0);
            $table->timestamp('terakhir_belajar')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->dropColumn(['xp', 'level', 'streak_harian', 'terakhir_belajar']);
        });
    }
};
