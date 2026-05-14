// 'use client';

// // Barcha toast xabarlarini ekranning pastki o'ng burchagida ko'rsatadi.
// // app/layout.tsx da bir marta render qilinadi.

// import { useToastStore } from '@/src/lib/toast/toast.store';
// import Toast from './Toast';

// export default function ToastContainer() {
//   const { toasts, removeToast } = useToastStore();

//   if (toasts.length === 0) return null;

//   return (
//     <div
//       aria-label="Bildirishnomalar"
//       className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
//     >
//       {toasts.map((toast) => (
//         <Toast key={toast.id} toast={toast} onClose={removeToast} />
//       ))}
//     </div>
//   );
// }



'use client';

// app/layout.tsx da bir marta qo'ying:
//   <ToastProvider>
//     {children}
//     <ToastContainer />
//   </ToastProvider>

import { useToastStore } from '@/src/lib/toast/toast.store';
import Toast from './Toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Bildirishnomalar"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}