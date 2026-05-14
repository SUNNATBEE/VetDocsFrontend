// 'use client';

// // Sahifa burchagida chiqadigan qisqa xabar (success / error / info).
// // ToastContainer tomonidan render qilinadi.

// import type { Toast as ToastType } from '@/src/lib/toast/toast.store';

// type ToastProps = {
//   toast: ToastType;
//   onClose: (id: string) => void;
// };

// const styles: Record<ToastType['type'], string> = {
//   success: 'bg-green-600 text-white',
//   error: 'bg-red-600 text-white',
//   info: 'bg-blue-600 text-white',
// };

// const icons: Record<ToastType['type'], string> = {
//   success: '✓',
//   error: '✕',
//   info: 'ℹ',
// };

// export default function Toast({ toast, onClose }: ToastProps) {
//   return (
//     <div
//       role="alert"
//       aria-live="assertive"
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm min-w-[220px] max-w-xs ${styles[toast.type]}`}
//     >
//       <span aria-hidden="true" className="font-bold text-base">
//         {icons[toast.type]}
//       </span>
//       <span className="flex-1">{toast.message}</span>
//       <button
//         onClick={() => onClose(toast.id)}
//         aria-label="Yopish"
//         className="ml-2 opacity-80 hover:opacity-100 transition-opacity"
//       >
//         ✕
//       </button>
//     </div>
//   );
// }



'use client';

import type { Toast as ToastType } from '@/src/lib/toast/toast.store';

type ToastProps = {
  toast: ToastType;
  onClose: (id: string) => void;
};

const styles: Record<ToastType['type'], string> = {
  success: 'bg-green-600 text-white',
  error:   'bg-red-600 text-white',
  info:    'bg-blue-600 text-white',
};

const icons: Record<ToastType['type'], string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
};

export default function Toast({ toast, onClose }: ToastProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm min-w-[220px] max-w-xs ${styles[toast.type]}`}
    >
      <span aria-hidden="true" className="font-bold text-base">
        {icons[toast.type]}
      </span>
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        aria-label="Yopish"
        className="ml-2 opacity-80 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}