<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('cascade');
            $table->string('jenis_paket'); // Pro Monthly, Pro Yearly, Lifetime
            $table->integer('jumlah_bayar');
            $table->string('metode_pembayaran')->default('Midtrans');
            $table->enum('status', ['Pending', 'Berhasil', 'Gagal'])->default('Berhasil');
            $table->timestamp('tgl_bayar')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
