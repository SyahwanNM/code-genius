<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminBerandaController extends Controller
{
    public function indeks()
    {
        // Statistik Utama
        $stats = [
            'total_users' => Pengguna::count(),
            'total_revenue' => DB::table('transaksi')->where('status', 'Berhasil')->sum('jumlah_bayar'),
            'pending_mentors' => DB::table('pengajuan_mentor')->where('status', 'Pending')->count(),
            'active_courses' => DB::table('kursus')->count(),
        ];

        // Data Grafik (Simulasi bulanan)
        $revenue_monthly = [
            ['month' => 'Jan', 'amount' => 1200000],
            ['month' => 'Feb', 'amount' => 2100000],
            ['month' => 'Mar', 'amount' => 1800000],
            ['month' => 'Apr', 'amount' => 3500000],
        ];

        return Inertia::render('Admin/Dashboard/Indeks', [
            'stats' => $stats,
            'revenue_monthly' => $revenue_monthly
        ]);
    }
}
