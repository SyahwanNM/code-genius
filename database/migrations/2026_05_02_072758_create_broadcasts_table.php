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
        Schema::create('broadcasts', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('pesan');
            $table->string('tipe')->default('info');
            $table->string('tautan')->nullable();
            $table->integer('total_penerima')->default(0);
            $table->timestamps();
        });

        Schema::table('notifikasi', function (Blueprint $table) {
            $table->foreignId('id_broadcast')->nullable()->constrained('broadcasts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifikasi', function (Blueprint $table) {
            $table->dropForeign(['id_broadcast']);
            $table->dropColumn('id_broadcast');
        });
        Schema::dropIfExists('broadcasts');
    }
};
