<?php

namespace Database\Factories;

use App\Fitur\Autentikasi\Models\Pengguna;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<Pengguna>
 */
class PenggunaFactory extends Factory
{
    protected $model = Pengguna::class;

    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_diverifikasi_pada' => now(),
            'kata_sandi' => static::$password ??= Hash::make('password'),
            'token_ingat' => Str::random(10),
        ];
    }
}
