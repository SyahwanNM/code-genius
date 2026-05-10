<?php

namespace App\Fitur\Autentikasi\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifikasiOTPNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Kode Verifikasi Akun - Code Genius')
            ->view('emails.auth.otp_verification', [
                'otp' => $this->otp,
            ]);
    }
}
