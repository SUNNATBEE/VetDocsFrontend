<<<<<<< HEAD
// Data bo'lmasa xafa bo'lmasin deb, tushunarli xabar chiqaramiz.
"use client";

import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title = "Ma'lumot topilmadi",
  description = "Afsuski, hozircha bu bo'limda hech qanday ma'lumot yo'q.",
  icon = "📭",
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[var(--on-surface)] mb-2">{title}</h3>
      <p className="text-[var(--on-surface-variant)] max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
=======
// // // Data bo'lmaganda userga "hech narsa yo'q" emas,
// // // "shu yerga nimadir qo'shing" qabilida tushunarli xabar beramiz.
// // //
// // // Props:
// // //   - title: string
// // //   - description?: string
// // //   - icon?: ReactNode
// // //   - action?: { label: string; onClick: () => void }

// // import type { ReactNode } from "react";

// // type EmptyStateProps = {
// //   title: string;
// //   description?: string;
// //   icon?: ReactNode;
// //   action?: {
// //     label: string;
// //     onClick: () => void;
// //   };
// // };

// // export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
// //   return (
// //     <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
// //       {icon && (
// //         <div className="mb-4 text-gray-400 text-5xl" aria-hidden="true">
// //           {icon}
// //         </div>
// //       )}
// //       <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
// //       {description && (
// //         <p className="text-sm text-gray-500 mb-4 max-w-xs">{description}</p>
// //       )}
// //       {action && (
// //         <button
// //           onClick={action.onClick}
// //           className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
// //         >
// //           {action.label}
// //         </button>
// //       )}
// //     </div>
// //   );
// // }



// 'use client';
 
// // Data bo'lmaganda userga "hech narsa yo'q" emas,
// // "shu yerga nimadir qo'shing" qabilida tushunarli xabar beramiz.
// //
// // Props:
// //   - title: string
// //   - description?: string
// //   - icon?: ReactNode
// //   - action?: { label: string; onClick: () => void }
 
// import type { ReactNode } from "react";
 
// type EmptyStateProps = {
//   title: string;
//   description?: string;
//   icon?: ReactNode;
//   action?: {
//     label: string;
//     onClick: () => void;
//   };
// };
 
// export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
//   return (
//     <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
//       {icon && (
//         <div className="mb-4 text-gray-400 text-5xl" aria-hidden="true">
//           {icon}
//         </div>
//       )}
//       <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
//       {description && (
//         <p className="text-sm text-gray-500 mb-4 max-w-xs">{description}</p>
//       )}
//       {action && (
//         <button
//           onClick={action.onClick}
//           className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           {action.label}
//         </button>
//       )}
//     </div>
//   );
// }




'use client';

import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="mb-4 text-gray-400 text-5xl" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-4 max-w-xs">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
