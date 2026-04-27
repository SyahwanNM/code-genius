<?php

namespace App\Fitur\Pembelajaran\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AsistenAIController extends Controller
{
    public function tanya(Request $request)
    {
        $request->validate([
            'kode_pengguna' => 'required|string',
            'bahasa' => 'required|string',
            'konteks_materi' => 'required|string',
        ]);

        $apiKey = trim(env('GEMINI_API_KEY'));

        if (!$apiKey) {
            return response()->json([
                'pesan' => 'API Key Gemini belum dikonfigurasi di file .env'
            ], 500);
        }

        $prompt = "Anda adalah asisten AI evaluator coding di 'Code Genius'. 
        Pengguna sedang berada di level pembelajaran tertentu dan mengerjakan soal/materi: '{$request->konteks_materi}'.
        Bahasa pemrograman: {$request->bahasa}.
        
        Kode yang dikumpulkan pengguna:
        ```
        {$request->kode_pengguna}
        ```
        
        Tugas Anda:
        1. Analisis apakah kode tersebut sudah menjawab instruksi/soal dengan benar dan berfungsi.
        2. Berikan respon HANYA dalam format JSON yang valid, tanpa markdown tambahan.
        Format JSON harus seperti ini:
        {
            \"status\": \"benar\" atau \"salah\",
            \"feedback\": \"penjelasan ramah berbahasa Indonesia. Beri selamat jika benar, beri petunjuk perbaikan jika salah tanpa membocorkan kode lengkap.\"
        }";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
            ]
        ]);

        if ($response->successful()) {
            $hasil = $response->json();
            $text = $hasil['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
            $parsed = json_decode($text, true);
            
            return response()->json([
                'status' => $parsed['status'] ?? 'salah',
                'jawaban' => $parsed['feedback'] ?? 'Gagal memparsing respon AI.'
            ]);
        }

        $errorDetail = $response->json();
        return response()->json([
            'pesan' => 'Terjadi kesalahan: ' . ($errorDetail['error']['message'] ?? 'Gagal menghubungi layanan AI.')
        ], 500);
    }
}
