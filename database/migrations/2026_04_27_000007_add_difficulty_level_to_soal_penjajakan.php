<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('soal_penjajakan', function (Blueprint $table) {
            $table->string('difficulty_level')->default('beginner')->after('tipe'); // beginner, intermediate, advanced
        });
    }

    public function down(): void
    {
        Schema::table('soal_penjajakan', function (Blueprint $table) {
            $table->dropColumn('difficulty_level');
        });
    }
};
