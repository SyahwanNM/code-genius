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
            'tautan_sosial' => 'nullable|array',
            'keahlian_utama' => 'nullable|array',
            'avatar_style' => 'nullable|string',
        ]);

        $pengguna->update([
            'nama' => $request->nama,
            'email' => $request->email,
            'bio' => $request->bio,
            'tautan_sosial' => $request->tautan_sosial,
            'keahlian_utama' => $request->keahlian_utama,
            'avatar_style' => $request->avatar_style,
        ]);

        return redirect()->back()->with('success', 'Profil Anda berhasil dimodernisasi!');
    }

    public function updateAdmin(Request $request)
    {
        $pengguna = auth()->user();

        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengguna,email,' . $pengguna->id,
        ]);

        $pengguna->update([
            'nama' => $request->nama,
            'email' => $request->email,
        ]);

        return redirect()->back()->with('success', 'Identitas admin berhasil diperbarui!');
    }

    public function pengaturan()
    {
        $konfigurasi = \App\Models\Konfigurasi::first();
        if (auth()->user()->peran === 'admin') {
            return Inertia::render('Admin/Settings/Indeks', [
                'konfigurasi' => $konfigurasi
            ]);
        }
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

    public function updateSystem(Request $request)
    {
        $request->validate([
            'site_name' => 'required|string|max:100',
            'maintenance_mode' => 'required|boolean',
            'registration_open' => 'required|boolean',
            'ai_debug' => 'required|boolean',
        ]);

        $konfigurasi = \App\Models\Konfigurasi::first();
        $konfigurasi->update($request->all());

        return redirect()->back()->with('success', 'Konfigurasi platform berhasil diperbarui!');
    }
}
