<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->string('jalur_belajar')->nullable()->after('level'); // 'frontend' | 'backend'
            $table->string('level_pemahaman')->nullable()->after('jalur_belajar'); // 'beginner' | 'intermediate' | 'advanced'
            $table->boolean('tes_selesai')->default(false)->after('level_pemahaman');
        });
    }

    public function down(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->dropColumn(['jalur_belajar', 'level_pemahaman', 'tes_selesai']);
        });
    }
};
