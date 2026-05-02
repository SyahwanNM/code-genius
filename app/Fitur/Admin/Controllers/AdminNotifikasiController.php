<?php

namespace App\Fitur\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Fitur\Autentikasi\Models\Pengguna;
use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminNotifikasiController extends Controller
{
    public function indeks()
    {
        $broadcasts = \App\Models\Broadcast::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Notifikasi/Indeks', [
            'broadcasts' => $broadcasts
        ]);
    }

    public function kirim(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'pesan' => 'required|string',
            'tipe' => 'required|in:info,peringatan,sukses',
            'tautan' => 'nullable|string',
        ]);

        $users = Pengguna::where('peran', 'pengguna_biasa')->get();
        $url = $request->tautan ?: null;

        DB::beginTransaction();
        try {
            // 1. Simpan Sesi Broadcast Utama
            $broadcast = \App\Models\Broadcast::create([
                'judul' => $request->judul,
                'pesan' => $request->pesan,
                'tipe' => $request->tipe,
                'tautan' => $url,
                'total_penerima' => $users->count(),
            ]);

            // 2. Kirim Notifikasi ke setiap User
            foreach ($users as $user) {
                Notifikasi::create([
                    'id_pengguna' => $user->id,
                    'id_broadcast' => $broadcast->id,
                    'judul' => $request->judul,
                    'pesan' => $request->pesan,
                    'tipe' => $request->tipe,
                    'url' => $url,
                    'dibaca' => false,
                ]);
            }

            DB::commit();
            return redirect()->back()->with('success', 'Pesan berhasil dibroadcast ke ' . $users->count() . ' pengguna!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal mengirim broadcast: ' . $e->getMessage());
        }
    }

    public function hapus($id)
    {
        $broadcast = \App\Models\Broadcast::findOrFail($id);
        $broadcast->delete(); // Ini akan otomatis menghapus notifikasi terkait karena onDelete('cascade')

        return redirect()->back()->with('success', 'Riwayat broadcast berhasil dibersihkan!');
    }
}
