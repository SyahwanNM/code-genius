<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi OTP</title>
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #08090D;
            margin: 0;
            padding: 0;
        }
        .wrapper {
            width: 100%;
            background-color: #08090D;
            padding: 40px 0;
        }
        .main {
            background-color: #0F1118;
            margin: 0 auto;
            width: 100%;
            max-width: 500px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            overflow: hidden;
            color: #ffffff;
        }
        .header {
            padding: 30px;
            text-align: center;
            background: linear-gradient(to bottom, rgba(250, 204, 21, 0.05), transparent);
        }
        .content {
            padding: 40px;
            text-align: center;
        }
        .otp-box {
            font-size: 36px;
            font-weight: 900;
            letter-spacing: 10px;
            color: #FACC15;
            background: rgba(250, 204, 21, 0.1);
            padding: 20px;
            border-radius: 12px;
            margin: 30px 0;
            display: inline-block;
            border: 1px dashed rgba(250, 204, 21, 0.3);
        }
        h1 {
            font-size: 24px;
            font-weight: 900;
            margin-bottom: 10px;
        }
        p {
            color: #9CA3AF;
            font-size: 14px;
            line-height: 22px;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: #4B5563;
            background: rgba(255, 255, 255, 0.02);
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main">
            <tr>
                <td class="header">
                    <h2 style="color: #FACC15; margin: 0; font-weight: 900; letter-spacing: 2px;">CODE GENIUS</h2>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h1>Verifikasi Email Anda</h1>
                    <p>Terima kasih telah mendaftar di Code Genius. Gunakan kode OTP di bawah ini untuk menyelesaikan pendaftaran Anda.</p>
                    
                    <div class="otp-box">{{ $otp }}</div>
                    
                    <p>Kode ini berlaku selama 10 menit. Jangan berikan kode ini kepada siapa pun.</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    &copy; 2026 Code Genius. Sistem Verifikasi Otomatis.
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
