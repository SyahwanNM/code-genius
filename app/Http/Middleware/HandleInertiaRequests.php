<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'pengguna' => $request->user() ? $request->user() : null,
                'notifikasi' => $request->user() ? $request->user()->notifikasis()->take(5)->get() : [],
                'notif_unread_count' => $request->user() ? $request->user()->notifikasis()->where('dibaca', false)->count() : 0,
            ],
            'flash' => [
                'sukses' => fn () => $request->session()->get('sukses'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
