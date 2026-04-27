<?php

namespace App\Fitur\Autentikasi\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AutentikasiController extends Controller
{
    public function tampilanDaftar()
    {
        return Inertia::render('Autentikasi/Daftar');
    }

    public function daftar(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:pengguna',
            'kata_sandi' => 'required|string|min:8|confirmed',
        ]);

        $pengguna = Pengguna::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'kata_sandi' => Hash::make($request->kata_sandi),
        ]);

        Auth::login($pengguna);

        // Arahkan ke onboarding (pilih jalur)
        return redirect()->route('pilih.jalur');
    }

    public function tampilanMasuk()
    {
        return Inertia::render('Autentikasi/Masuk');
    }

    public function masuk(Request $request)
    {
        $kredensial = $request->validate([
            'email' => 'required|string|email',
            'kata_sandi' => 'required|string',
        ]);

        if (Auth::attempt(['email' => $kredensial['email'], 'password' => $kredensial['kata_sandi']])) {
            $request->session()->regenerate();
            
            $user = Auth::user();
            if (strtolower($user->peran) === 'admin') {
                return redirect()->intended('/admin/overview');
            }
            
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Kredensial yang diberikan tidak cocok dengan data kami.',
        ]);
    }

    public function keluar(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
