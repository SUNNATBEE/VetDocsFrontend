// // // Xato bo'lsa user qo'rqmasin —
// // // oddiy va tushunarli xabar + "Qayta urinish" tugmasi.
// // //
// // // Props:
// // //   - message: string
// // //   - onRetry?: () => void

// // type ErrorMessageProps = {
// //   message: string;
// //   onRetry?: () => void;
// // };

// // export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
// //   return (
// //     <div
// //       role="alert"
// //       className="flex flex-col items-center justify-center py-10 px-4 text-center"
// //     >
// //       <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
// //       <p className="text-sm text-red-600 mb-4 max-w-xs">{message}</p>
// //       {onRetry && (
// //         <button
// //           onClick={onRetry}
// //           className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
// //         >
// //           Qayta urinish
// //         </button>
// //       )}
// //     </div>
// //   );
// // }



// 'use client';
 
// // Xato bo'lsa user qo'rqmasin —
// // oddiy va tushunarli xabar + "Qayta urinish" tugmasi.
// //
// // Props:
// //   - message: string
// //   - onRetry?: () => void
 
// type ErrorMessageProps = {
//   message: string;
//   onRetry?: () => void;
// };
 
// export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
//   return (
//     <div
//       role="alert"
//       className="flex flex-col items-center justify-center py-10 px-4 text-center"
//     >
//       <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
//       <p className="text-sm text-red-600 mb-4 max-w-xs">{message}</p>
//       {onRetry && (
//         <button
//           onClick={onRetry}
//           className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
//         >
//           Qayta urinish
//         </button>
//       )}
//     </div>
//   );
// }



'use client';

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-10 px-4 text-center"
    >
      <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
      <p className="text-sm text-red-600 mb-4 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}