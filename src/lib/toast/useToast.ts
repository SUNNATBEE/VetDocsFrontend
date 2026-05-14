// 'use client';

// // Loyiha bo'yicha yagona toast API:
// //   toast.success(message)
// //   toast.error(message)
// //   toast.info(message)
// //
// // Ichida store ga push qiladi, ToastContainer esa ekranda chiqaradi.

// import { useToastStore } from './toast.store';

// export function useToast() {
//   const { addToast } = useToastStore();

//   return {
//     success: (message: string) => addToast(message, 'success'),
//     error: (message: string) => addToast(message, 'error'),
//     info: (message: string) => addToast(message, 'info'),
//   };
// }



'use client';

// Loyiha bo'yicha yagona toast API:
//   toast.success(message)
//   toast.error(message)
//   toast.info(message)

import { useToastStore } from './toast.store';

export function useToast() {
  const { addToast } = useToastStore();

  return {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    info: (message: string) => addToast(message, 'info'),
  };
}