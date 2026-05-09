import type { OpeningHours as OpeningHoursValue, OpeningSlot } from "@/src/features/clinics/types";

const days: Array<[keyof OpeningHoursValue, string]> = [
  ["mon", "Dushanba"],
  ["tue", "Seshanba"],
  ["wed", "Chorshanba"],
  ["thu", "Payshanba"],
  ["fri", "Juma"],
  ["sat", "Shanba"],
  ["sun", "Yakshanba"],
];

function formatSlot(slot: OpeningSlot | undefined) {
  if (!slot) {
    return "Dam olish";
  }

  return `${slot.open} - ${slot.close}`;
}

export function OpeningHours({ hours }: { hours?: OpeningHoursValue }) {
  if (!hours) {
    return (
      <div className="rounded-[8px] border border-slate-200 bg-white p-5 text-sm text-slate-600">
        Ish vaqti backenddan kelmadi.
      </div>
    );
  }

  return (
    <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Ish vaqti</h2>
      <div className="mt-4 divide-y divide-slate-100">
        {days.map(([key, label]) => (
          <div key={key} className="flex items-center justify-between py-2 text-sm">
            <span className="font-medium text-slate-700">{label}</span>
            <span className="text-slate-600">{formatSlot(hours[key])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
