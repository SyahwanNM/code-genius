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
        Schema::create('konfigurasi', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Code Genius');
            $table->boolean('maintenance_mode')->default(false);
            $table->boolean('registration_open')->default(true);
            $table->boolean('ai_debug')->default(false);
            $table->timestamps();
        });

        // Insert default record
        DB::table('konfigurasi')->insert([
            'site_name' => 'Code Genius',
            'maintenance_mode' => false,
            'registration_open' => true,
            'ai_debug' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konfigurasi');
    }
};
