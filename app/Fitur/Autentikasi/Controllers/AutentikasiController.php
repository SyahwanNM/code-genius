<?php

namespace App\Fitur\Autentikasi\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Notification;
use App\Fitur\Autentikasi\Notifications\VerifikasiOTPNotification;

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

        // Generate OTP
        $otp = rand(100000, 999999);

        // Store data in session
        $request->session()->put('pendaftaran_sementara', [
            'nama' => $request->nama,
            'email' => $request->email,
            'kata_sandi' => Hash::make($request->kata_sandi),
            'otp' => $otp,
            'expired_at' => now()->addMinutes(10),
        ]);

        // Send OTP via Email
        // Karena user belum dibuat, kita kirim ke email langsung
        Notification::route('mail', $request->email)
            ->notify(new VerifikasiOTPNotification($otp));

        return redirect()->route('verifikasi.otp');
    }

    public function tampilanVerifikasiOTP(Request $request)
    {
        if (!$request->session()->has('pendaftaran_sementara')) {
            return redirect()->route('daftar');
        }

        return Inertia::render('Autentikasi/VerifikasiOTP', [
            'email' => $request->session()->get('pendaftaran_sementara')['email']
        ]);
    }

    public function verifikasiOTP(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $data = $request->session()->get('pendaftaran_sementara');

        if (!$data) {
            return redirect()->route('daftar')->withErrors(['email' => 'Sesi pendaftaran habis.']);
        }

        if ($data['otp'] != $request->otp) {
            return back()->withErrors(['otp' => 'Kode OTP tidak valid.']);
        }

        if (now()->greaterThan($data['expired_at'])) {
            return back()->withErrors(['otp' => 'Kode OTP telah kedaluwarsa.']);
        }

        // Create user
        $pengguna = Pengguna::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'kata_sandi' => $data['kata_sandi'],
        ]);

        // Clear session
        $request->session()->forget('pendaftaran_sementara');

        Auth::login($pengguna);

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
