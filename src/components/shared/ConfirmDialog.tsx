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
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Tasdiqlash",
  cancelLabel = "Bekor qilish",
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
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}