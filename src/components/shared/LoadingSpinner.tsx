// // Yuklanayotganini ko'rsatuvchi aylana.
// // Props: size = "sm" | "md" | "lg"

// type SpinnerSize = "sm" | "md" | "lg";

// type LoadingSpinnerProps = {
//   size?: SpinnerSize;
// };

// const sizeClasses: Record<SpinnerSize, string> = {
//   sm: "w-4 h-4 border-2",
//   md: "w-8 h-8 border-4",
//   lg: "w-12 h-12 border-4",
// };

// export default function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
//   return (
//     <div
//       role="status"
//       aria-label="Yuklanmoqda..."
//       className={`${sizeClasses[size]} rounded-full border-gray-200 border-t-blue-600 animate-spin`}
//     />
//   );
// }



type SpinnerSize = "sm" | "md" | "lg";

type LoadingSpinnerProps = {
  size?: SpinnerSize;
};

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

export default function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Yuklanmoqda..."
      className={`${sizeClasses[size]} rounded-full border-gray-200 border-t-blue-600 animate-spin`}
    />
  );
}