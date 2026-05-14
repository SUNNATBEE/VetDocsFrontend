import type { Clinic } from "@/src/features/clinics/types";
import { ClinicCard } from "@/src/features/clinics/components/ClinicCard";

type ClinicListProps = {
  clinics: Clinic[];
};

export function ClinicList({ clinics }: ClinicListProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
}
