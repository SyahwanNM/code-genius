<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminMentorController extends Controller
{
    public function ajukan(Request $request)
    {
        $request->validate([
            'motivasi' => 'required|string|min:50',
            'portofolio' => 'nullable|url',
        ]);

        // Cek apakah sudah pernah mengajukan
        $existing = DB::table('pengajuan_mentor')
            ->where('id_pengguna', auth()->id())
            ->where('status', 'Pending')
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Anda sudah memiliki pengajuan yang sedang diproses.'], 422);
        }

        DB::table('pengajuan_mentor')->insert([
            'id_pengguna' => auth()->id(),
            'motivasi' => $request->motivasi,
            'portofolio' => $request->portofolio,
            'status' => 'Pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Pengajuan mentor berhasil dikirim!']);
    }

    public function pending()
    {
        $pengajuan = DB::table('pengajuan_mentor')
            ->join('pengguna', 'pengajuan_mentor.id_pengguna', '=', 'pengguna.id')
            ->where('pengajuan_mentor.status', 'Pending')
            ->select('pengajuan_mentor.*', 'pengguna.nama', 'pengguna.email')
            ->get();

        return Inertia::render('Admin/Mentor/Pending', [
            'pengajuan' => $pengajuan
        ]);
    }

    public function approve(Request $request, $id)
    {
        $pengajuan = DB::table('pengajuan_mentor')->where('id', $id)->first();
        
        if ($pengajuan) {
            // Update status pengajuan
            DB::table('pengajuan_mentor')->where('id', $id)->update(['status' => 'Diterima']);
            
            // Ubah role pengguna menjadi Mentor
            Pengguna::where('id', $pengajuan->id_pengguna)->update(['peran' => 'Mentor']);
        }

        return redirect()->back()->with('success', 'Mentor berhasil disetujui!');
    }
}
