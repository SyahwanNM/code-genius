<?php

namespace App\Fitur\Admin\Controllers;

use App\Fitur\Autentikasi\Models\Pengguna;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function indeks()
    {
        $users = Pengguna::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Users/Indeks', [
            'users' => $users
        ]);
    }

    public function updateRole(Request $request, $id)
    {
        $request->validate(['peran' => 'required|in:Siswa,Mentor,Admin']);
        
        $user = Pengguna::findOrFail($id);
        $user->update(['peran' => $request->peran]);

        return redirect()->back()->with('success', 'Peran pengguna berhasil diubah!');
    }
}
