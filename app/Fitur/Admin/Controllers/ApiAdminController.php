<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiAdminController extends Controller
{
    // API Manajemen User
    public function updateRole(Request $request, $id)
    {
        $request->validate(['peran' => 'required|in:pengguna_biasa,mentor,admin']);
        
        $user = Pengguna::findOrFail($id);
        $user->update(['peran' => $request->peran]);

        return response()->json([
            'status' => 'success',
            'message' => 'Peran pengguna berhasil diperbarui',
            'data' => $user
        ]);
    }

    public function hapusUser($id)
    {
        $user = Pengguna::findOrFail($id);
        
        // Proteksi agar tidak menghapus diri sendiri jika sedang login
        if (auth()->id() == $user->id) {
            return response()->json(['status' => 'error', 'message' => 'Tidak bisa menghapus akun sendiri'], 403);
        }

        $user->delete();
        return response()->json(['status' => 'success', 'message' => 'Pengguna berhasil dihapus']);
    }

    // API Manajemen Mentor
    public function approveMentor(Request $request, $id)
    {
        $pengajuan = DB::table('pengajuan_mentor')->where('id', $id)->first();
        
        if (!$pengajuan) {
            return response()->json(['status' => 'error', 'message' => 'Data pengajuan tidak ditemukan'], 404);
        }

        DB::beginTransaction();
        try {
            DB::table('pengajuan_mentor')->where('id', $id)->update(['status' => 'Diterima', 'updated_at' => now()]);
            Pengguna::where('id', $pengajuan->id_pengguna)->update(['peran' => 'mentor']);
            DB::commit();

            return response()->json(['status' => 'success', 'message' => 'Calon mentor berhasil disetujui']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Terjadi kesalahan sistem'], 500);
        }
    }

    public function rejectMentor($id)
    {
        DB::table('pengajuan_mentor')->where('id', $id)->update(['status' => 'Ditolak', 'updated_at' => now()]);
        return response()->json(['status' => 'success', 'message' => 'Pengajuan mentor telah ditolak']);
    }
}
