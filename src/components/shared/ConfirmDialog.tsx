<<<<<<< HEAD
// Xavfli amal oldidan userdan yana bir marta tasdiq so'raymiz.
"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
=======
// // // Xavfli amal (masalan delete) oldidan tasdiq so'raymiz.
// // //
// // // Props:
// // //   - open: boolean
// // //   - title: string
// // //   - description?: string
// // //   - confirmLabel?: string  // default: "Tasdiqlash"
// // //   - cancelLabel?: string   // default: "Bekor qilish"
// // //   - onConfirm: () => void
// // //   - onCancel: () => void

// // type ConfirmDialogProps = {
// //   open: boolean;
// //   title: string;
// //   description?: string;
// //   confirmLabel?: string;
// //   cancelLabel?: string;
// //   onConfirm: () => void;
// //   onCancel: () => void;
// // };

// // export default function ConfirmDialog({
// //   open,
// //   title,
// //   description,
// //   confirmLabel = "Tasdiqlash",
// //   cancelLabel = "Bekor qilish",
// //   onConfirm,
// //   onCancel,
// // }: ConfirmDialogProps) {
// //   if (!open) return null;

// //   return (
// //     // Backdrop
// //     <div
// //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
// //       role="dialog"
// //       aria-modal="true"
// //       aria-labelledby="confirm-dialog-title"
// //       onClick={onCancel}
// //     >
// //       {/* Modal panel */}
// //       <div
// //         className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <h2 id="confirm-dialog-title" className="text-base font-semibold text-gray-800 mb-2">
// //           {title}
// //         </h2>
// //         {description && (
// //           <p className="text-sm text-gray-500 mb-5">{description}</p>
// //         )}
// //         <div className="flex gap-3 justify-end">
// //           <button
// //             onClick={onCancel}
// //             className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
// //           >
// //             {cancelLabel}
// //           </button>
// //           <button
// //             onClick={onConfirm}
// //             className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
// //           >
// //             {confirmLabel}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// 'use client';

// // Xavfli amal (masalan delete) oldidan tasdiq so'raymiz.
// //
// // Props:
// //   - open: boolean
// //   - title: string
// //   - description?: string
// //   - confirmLabel?: string  // default: "Tasdiqlash"
// //   - cancelLabel?: string   // default: "Bekor qilish"
// //   - onConfirm: () => void
// //   - onCancel: () => void

// type ConfirmDialogProps = {
//   open: boolean;
//   title: string;
//   description?: string;
//   confirmLabel?: string;
//   cancelLabel?: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// };

// export default function ConfirmDialog({
//   open,
//   title,
//   description,
//   confirmLabel = "Tasdiqlash",
//   cancelLabel = "Bekor qilish",
//   onConfirm,
//   onCancel,
// }: ConfirmDialogProps) {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="confirm-dialog-title"
//       onClick={onCancel}
//     >
//       <div
//         className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 id="confirm-dialog-title" className="text-base font-semibold text-gray-800 mb-2">
//           {title}
//         </h2>
//         {description && (
//           <p className="text-sm text-gray-500 mb-5">{description}</p>
//         )}
//         <div className="flex gap-3 justify-end">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             {cancelLabel}
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
//           >
//             {confirmLabel}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

type ConfirmDialogProps = {
  open: boolean;
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
<<<<<<< HEAD
  danger?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
=======
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
  title,
  description,
  confirmLabel = "Tasdiqlash",
  cancelLabel = "Bekor qilish",
<<<<<<< HEAD
  danger = true,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-500 mb-6">{description}</p>}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border font-medium text-sm hover:bg-gray-50"
=======
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-dialog-title"
          className="text-base font-semibold text-gray-800 mb-2"
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 mb-5">{description}</p>
        )}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
          >
            {cancelLabel}
          </button>
          <button
<<<<<<< HEAD
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm text-white ${
              danger ? "bg-red-500 hover:bg-red-600" : "bg-[var(--primary)] hover:opacity-90"
            }`}
=======
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
