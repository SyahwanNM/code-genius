<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Konfigurasi;
use Inertia\Inertia;

class CekMaintenance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Hindari rekursi tak terbatas jika sedang merender halaman maintenance itu sendiri
        // Meskipun Inertia::render biasanya aman jika kita membatasi rutenya.

        $konfigurasi = Konfigurasi::first();

        if ($konfigurasi && $konfigurasi->maintenance_mode) {
            // Admin tetap bisa mengakses apapun
            if (Auth::check() && Auth::user()->peran === 'admin') {
                return $next($request);
            }

            // Izinkan rute kritikal: login, logout, dan semua rute admin
            if (
                $request->routeIs('login') || 
                $request->routeIs('logout') || 
                $request->is('admin*') || 
                $request->is('masuk*') || 
                $request->is('keluar*')
            ) {
                return $next($request);
            }

            // Tampilkan halaman maintenance premium via Inertia
            return Inertia::render('Errors/Maintenance')->toResponse($request)->setStatusCode(200);
        }

        return $next($request);
    }
}
