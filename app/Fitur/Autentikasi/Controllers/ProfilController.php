<?php

namespace App\Fitur\Autentikasi\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function indeks()
    {
        return Inertia::render('Profil/Indeks');
    }

    public function edit()
    {
        return Inertia::render('Profil/Edit');
    }

    public function update(Request $request)
    {
        $pengguna = auth()->user();

        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengguna,email,' . $pengguna->id,
            'bio' => 'nullable|string|max:1000',
        ]);

        $pengguna->update([
            'nama' => $request->nama,
            'email' => $request->email,
            'bio' => $request->bio,
        ]);

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }

    public function pengaturan()
    {
        return Inertia::render('Settings/Indeks');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $pengguna = auth()->user();

        if (!Hash::check($request->current_password, $pengguna->kata_sandi)) {
            return redirect()->back()->withErrors(['current_password' => 'Password saat ini salah.']);
        }

        $pengguna->update([
            'kata_sandi' => Hash::make($request->password)
        ]);

        return redirect()->back()->with('success', 'Password berhasil diubah!');
    }
}
