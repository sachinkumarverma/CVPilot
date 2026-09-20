'use client';

import { useToastStore } from '@/store/useToastStore';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast, errorModal, closeErrorModal } = useToastStore();

  return (
    <>
      {/* Toast Notifications Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          const isError = toast.type === 'error';
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl shadow-2xl border transition-all transform animate-in slide-in-from-top-4 duration-300 ${
                isError
                  ? 'bg-red-950/90 dark:bg-red-950/95 border-red-500/40 text-red-100 backdrop-blur-md'
                  : isSuccess
                  ? 'bg-emerald-950/90 dark:bg-emerald-950/95 border-emerald-500/40 text-emerald-100 backdrop-blur-md'
                  : isWarning
                  ? 'bg-amber-950/90 dark:bg-amber-950/95 border-amber-500/40 text-amber-100 backdrop-blur-md'
                  : 'bg-gray-900/90 dark:bg-gray-900/95 border-gray-700 text-gray-100 backdrop-blur-md'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {!isError && !isSuccess && !isWarning && <Info className="w-5 h-5 text-blue-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold leading-tight">{toast.title}</h4>
                {toast.message && (
                  <p className="text-xs opacity-90 mt-1 leading-relaxed break-words">{toast.message}</p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-white rounded-md transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Global Error Modal Dialog */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header / Accent Bar */}
            <div className="bg-red-50 dark:bg-red-950/40 p-6 border-b border-red-100 dark:border-red-900/30 flex items-start space-x-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl text-red-600 dark:text-red-400 flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {errorModal.title}
                </h3>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
                  Action Required
                </p>
              </div>
              <button
                onClick={closeErrorModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-mono whitespace-pre-wrap break-words text-xs">
                {errorModal.message}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                {errorModal.actionText && errorModal.onAction && (
                  <button
                    onClick={() => {
                      errorModal.onAction?.();
                      closeErrorModal();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
                  >
                    {errorModal.actionText}
                  </button>
                )}
                <button
                  onClick={closeErrorModal}
                  className="px-5 py-2.5 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  OK, Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
