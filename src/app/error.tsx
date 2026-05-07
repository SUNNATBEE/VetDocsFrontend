"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="p-6">
      <h1 className="mb-2 text-xl font-semibold">Xatolik yuz berdi</h1>
      <p className="mb-4 text-sm text-gray-600">{error.message}</p>
      <button className="rounded bg-black px-3 py-2 text-white" onClick={reset}>
        Qayta urinish
      </button>
    </main>
  );
}
