import React from 'react';
import { X, AlertTriangle, LogOut, Trash2, Save, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function ModalKonfirmasi({ 
    show, 
    onClose, 
    onConfirm, 
    title = "Konfirmasi Tindakan", 
    message = "Apakah Anda yakin ingin melanjutkan tindakan ini?",
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    variant = "danger", // danger, warning, success, info
    icon = null,
    processing = false
}) {
    if (!show) return null;

    const variants = {
        danger: {
            bg: 'bg-red-500/10',
            text: 'text-red-500',
            border: 'border-red-500/20',
            btn: 'bg-red-600 hover:bg-red-500 shadow-red-600/20',
            icon: <Trash2 size={24} />
        },
        warning: {
            bg: 'bg-amber-500/10',
            text: 'text-amber-500',
            border: 'border-amber-500/20',
            btn: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20',
            icon: <AlertTriangle size={24} />
        },
        success: {
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-500',
            border: 'border-emerald-500/20',
            btn: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20',
            icon: <CheckCircle2 size={24} />
        },
        info: {
            bg: 'bg-blue-500/10',
            text: 'text-blue-500',
            border: 'border-blue-500/20',
            btn: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20',
            icon: <HelpCircle size={24} />
        },
        logout: {
            bg: 'bg-red-500/10',
            text: 'text-red-500',
            border: 'border-red-500/20',
            btn: 'bg-red-600 hover:bg-red-500 shadow-red-600/20',
            icon: <LogOut size={24} />
        }
    };

    const cfg = variants[variant] || variants.danger;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-[#0B0E14]/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-[#0D1117] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`w-16 h-16 rounded-2xl ${cfg.bg} ${cfg.text} border ${cfg.border} flex items-center justify-center`}>
                            {icon || cfg.icon}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={processing}
                            className={`w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-xs transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 ${cfg.btn}`}
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Memproses...
                                </>
                            ) : confirmText}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={processing}
                            className="w-full py-4 rounded-2xl bg-white/5 text-gray-500 font-bold text-xs hover:text-white hover:bg-white/10 transition-all border border-white/5"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-600 hover:text-white transition-all"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}
