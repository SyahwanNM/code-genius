<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atur Ulang Kata Sandi</title>
    <style>
        body {
            font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #08090D;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #08090D;
            padding-bottom: 40px;
        }
        .main {
            background-color: #0F1118;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-top: 40px;
        }
        .header {
            padding: 40px 0;
            text-align: center;
            background: linear-gradient(to bottom, rgba(250, 204, 21, 0.05), transparent);
        }
        .content {
            padding: 40px;
            text-align: center;
        }
        .footer {
            padding: 30px;
            text-align: center;
            font-size: 12px;
            color: #6B7280;
            background-color: rgba(255, 255, 255, 0.02);
        }
        h1 {
            font-size: 28px;
            font-weight: 900;
            margin: 0 0 20px;
            letter-spacing: -0.5px;
        }
        p {
            font-size: 16px;
            line-height: 24px;
            color: #9CA3AF;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 16px 32px;
            background-color: #FACC15;
            color: #000000 !important;
            text-decoration: none;
            font-weight: 900;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(250, 204, 21, 0.2);
            transition: all 0.3s ease;
        }
        .logo {
            width: 150px;
            margin-bottom: 20px;
        }
        .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.05);
            margin: 40px 0;
        }
        .hint {
            font-size: 13px;
            color: #4B5563;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main" width="100%">
            <tr>
                <td class="header">
                    <!-- Gunakan URL absolute untuk logo jika sudah di-hosting -->
                    <h2 style="color: #FACC15; margin: 0; font-weight: 900; letter-spacing: 2px;">CODE GENIUS</h2>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h1>Halo, {{ $nama }}!</h1>
                    <p>Kami menerima permintaan untuk mengatur ulang kata sandi akun Code Genius Anda. Klik tombol di bawah ini untuk melanjutkan proses pemulihan.</p>
                    
                    <a href="{{ $url }}" class="button">Atur Ulang Kata Sandi</a>
                    
                    <div class="divider"></div>
                    
                    <p class="hint">Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini. Tautan ini akan kedaluwarsa dalam 60 menit.</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    &copy; 2026 Code Genius. Platform Pembelajaran Pemrograman Modern.<br>
                    Yogyakarta, Indonesia.
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
