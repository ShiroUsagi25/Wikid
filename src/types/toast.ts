import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export interface ToastProps {
  type: ToastType;
  message?: string | null;
  autoClose?: number | false;
  onClose?: () => void;
}

export type ToastType = 'check' | 'error' | 'notification';