<?php

namespace App\Fitur\Autentikasi\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class AturUlangKataSandiNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $token;
    public $email;

    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = url('/atur-ulang-password/' . $this->token . '?email=' . urlencode($this->email));

        return (new MailMessage)
            ->subject(Lang::get('Atur Ulang Kata Sandi - Code Genius'))
            ->view('emails.auth.reset_password', [
                'url' => $url,
                'nama' => $notifiable->nama,
            ]);
    }
}
