<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CekOnboarding
{
    /**
     * Pastikan user sudah menyelesaikan onboarding (pilih jalur & tes penjajakan).
     * Jika belum, redirect ke halaman yang sesuai.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || $user->peran === 'admin') {
            return $next($request);
        }

        // Jika belum pilih jalur, redirect ke pilih jalur
        if (!$user->jalur_belajar) {
            // Izinkan akses ke route onboarding itu sendiri
            if ($request->routeIs('pilih.jalur') || $request->routeIs('pilih.jalur.simpan')) {
                return $next($request);
            }
            return redirect()->route('pilih.jalur');
        }

        // Jika sudah pilih jalur tapi belum selesai tes
        if (!$user->tes_selesai) {
            // Izinkan akses ke route tes penjajakan
            if ($request->routeIs('tes.penjajakan') || $request->routeIs('tes.penjajakan.proses') || $request->routeIs('hasil.tes')) {
                return $next($request);
            }
            return redirect()->route('tes.penjajakan');
        }

        return $next($request);
    }
}
