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
        Schema::table('token_atur_ulang_kata_sandi', function (Blueprint $table) {
            $table->renameColumn('dibuat_pada', 'created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('token_atur_ulang_kata_sandi', function (Blueprint $table) {
            $table->renameColumn('created_at', 'dibuat_pada');
        });
    }
};
