<?php

namespace App\Fitur\Autentikasi\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Notification;
use App\Fitur\Autentikasi\Notifications\ResetPasswordOTPNotification;

class LupaKataSandiController extends Controller
{
    public function tampilanLupaKataSandi()
    {
        return Inertia::render('Autentikasi/LupaKataSandi', [
            'status' => session('status'),
        ]);
    }

    public function kirimTautanReset(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:pengguna,email']);

        // Generate OTP
        $otp = rand(100000, 999999);

        // Store in session
        $request->session()->put('reset_password_sementara', [
            'email' => $request->email,
            'otp' => $otp,
            'expired_at' => now()->addMinutes(10),
        ]);

        // Send OTP via Email
        Notification::route('mail', $request->email)
            ->notify(new ResetPasswordOTPNotification($otp));

        return redirect()->route('password.reset');
    }

    public function tampilanAturUlangKataSandi(Request $request)
    {
        if (!$request->session()->has('reset_password_sementara')) {
            return redirect()->route('password.request');
        }

        return Inertia::render('Autentikasi/AturUlangKataSandi', [
            'email' => $request->session()->get('reset_password_sementara')['email'],
        ]);
    }

    public function aturUlangKataSandi(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
            'kata_sandi' => 'required|min:8|confirmed',
        ]);

        $data = $request->session()->get('reset_password_sementara');

        if (!$data) {
            return redirect()->route('password.request')->withErrors(['email' => 'Sesi reset password habis.']);
        }

        if ($data['otp'] != $request->otp) {
            return back()->withErrors(['otp' => 'Kode OTP tidak valid.']);
        }

        if (now()->greaterThan($data['expired_at'])) {
            return back()->withErrors(['otp' => 'Kode OTP telah kedaluwarsa.']);
        }

        $user = Pengguna::where('email', $data['email'])->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Pengguna tidak ditemukan.']);
        }

        $user->forceFill([
            'kata_sandi' => Hash::make($request->kata_sandi),
            'token_ingat' => Str::random(60),
        ])->save();

        event(new PasswordReset($user));

        $request->session()->forget('reset_password_sementara');

        return redirect()->route('login')->with('status', 'Kata sandi berhasil diatur ulang. Silakan masuk.');
    }
}
