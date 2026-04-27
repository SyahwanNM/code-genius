<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kursus', function (Blueprint $table) {
            $table->string('jalur')->default('umum')->after('ikon'); // 'frontend' | 'backend' | 'umum'
            $table->string('level_kesulitan')->default('beginner')->after('jalur'); // 'beginner' | 'intermediate' | 'advanced'
        });
    }

    public function down(): void
    {
        Schema::table('kursus', function (Blueprint $table) {
            $table->dropColumn(['jalur', 'level_kesulitan']);
        });
    }
};
