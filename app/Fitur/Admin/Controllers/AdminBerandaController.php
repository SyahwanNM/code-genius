<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminBerandaController extends Controller
{
    public function indeks(\Illuminate\Http\Request $request)
    {
        // Statistik Utama
        $stats = [
            'total_users' => Pengguna::count(),
            'total_revenue' => DB::table('transaksi')->where('status', 'Berhasil')->sum('jumlah_bayar') ?? 0,
            'pending_mentors' => DB::table('pengajuan_mentor')->where('status', 'Pending')->count(),
            'active_courses' => DB::table('kursus')->count(),
            'total_materi' => DB::table('materi')->count(),
            'recent_users' => Pengguna::orderBy('created_at', 'desc')->limit(5)->get(),
            'top_courses' => DB::table('kursus')
                ->leftJoin('modul', 'kursus.id', '=', 'modul.id_kursus')
                ->leftJoin('materi', 'modul.id', '=', 'materi.id_modul')
                ->leftJoin('progres_materi', 'materi.id', '=', 'progres_materi.id_materi')
                ->select('kursus.nama', DB::raw('count(DISTINCT progres_materi.id_pengguna) as students_count'))
                ->groupBy('kursus.id', 'kursus.nama')
                ->orderBy('students_count', 'desc')
                ->limit(3)
                ->get(),
        ];

        // Data Grafik Revenue (6 bulan terakhir)
        $revenue_monthly = collect(range(5, 0))->map(function($i) {
            $date = now()->subMonths($i);
            $amount = DB::table('transaksi')
                ->where('status', 'Berhasil')
                ->whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year)
                ->sum('jumlah_bayar');
            
            return [
                'month' => $date->format('M'),
                'amount' => (int) $amount,
                'full_date' => $date->format('F Y')
            ];
        });

        // System Health Metrics (Robust for Hosting)
        $system_health = [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'database' => [
                'connection' => config('database.default'),
                'status' => 'Stable',
            ],
            'drivers' => [
                'cache' => config('cache.default'),
                'session' => config('session.driver'),
                'queue' => config('queue.default'),
            ],
            'environment' => app()->environment(),
            'debug_mode' => config('app.debug'),
            'https' => $request->secure() ? 'Enabled' : 'Disabled',
        ];

        // Disk Space Check with Fallback
        try {
            $diskFree = @disk_free_space(base_path());
            $diskTotal = @disk_total_space(base_path());
            
            if ($diskFree !== false && $diskTotal !== false) {
                $diskUsagePct = round((($diskTotal - $diskFree) / $diskTotal) * 100, 2);
                $system_health['disk'] = [
                    'free' => round($diskFree / (1024 * 1024 * 1024), 2) . ' GB',
                    'total' => round($diskTotal / (1024 * 1024 * 1024), 2) . ' GB',
                    'usage_pct' => $diskUsagePct,
                ];
            } else {
                $system_health['disk'] = ['status' => 'Restricted'];
            }
        } catch (\Exception $e) {
            $system_health['disk'] = ['status' => 'Not Available'];
        }

        // Memory Usage
        $system_health['memory'] = [
            'usage' => round(memory_get_usage(true) / (1024 * 1024), 2) . ' MB',
            'limit' => @ini_get('memory_limit') ?: 'Unknown',
        ];

        return Inertia::render('Admin/Dashboard/Indeks', [
            'stats' => $stats,
            'revenue_monthly' => $revenue_monthly,
            'system_health' => $system_health
        ]);
    }
}
