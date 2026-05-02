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
        Schema::table('pengguna', function (Blueprint $table) {
            $table->json('tautan_sosial')->nullable(); // github, linkedin, website
            $table->json('keahlian_utama')->nullable(); // array of skills
            $table->string('avatar_style')->default('avataaars');
            $table->string('foto_profil')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->dropColumn(['tautan_sosial', 'keahlian_utama', 'avatar_style', 'foto_profil']);
        });
    }
};
