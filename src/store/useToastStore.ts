import { create } from 'zustand';

export interface ToastItem {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface ErrorModalData {
  isOpen: boolean;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

interface ToastState {
  toasts: ToastItem[];
  errorModal: ErrorModalData;
  showToast: (title: string, message?: string, type?: ToastItem['type'], duration?: number) => void;
  removeToast: (id: string) => void;
  showErrorModal: (title: string, message: string, actionText?: string, onAction?: () => void) => void;
  closeErrorModal: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  errorModal: {
    isOpen: false,
    title: '',
    message: '',
  },
  showToast: (title, message, type = 'error', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, type, duration }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  showErrorModal: (title, message, actionText, onAction) =>
    set({
      errorModal: {
        isOpen: true,
        title,
        message,
        actionText,
        onAction,
      },
    }),
  closeErrorModal: () =>
    set({
      errorModal: {
        isOpen: false,
        title: '',
        message: '',
      },
    }),
}));
