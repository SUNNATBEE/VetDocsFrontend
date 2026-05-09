"use client";

import Link from "next/link";
import { useClinic } from "@/src/features/clinics/hooks/useClinic";
import { ClinicMap } from "@/src/features/clinics/components/ClinicMap";
import { ImageGallery } from "@/src/features/clinics/components/ImageGallery";
import { OpeningHours } from "@/src/features/clinics/components/OpeningHours";

type ClinicDetailProps = {
  id: string;
};

export function ClinicDetail({ id }: ClinicDetailProps) {
  const { data: clinic, isLoading, error, refetch } = useClinic(id);

  if (isLoading) {
    return <main className="min-h-screen bg-slate-50 p-6">Klinika yuklanmoqda...</main>;
  }

  if (error || !clinic) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-[8px] border border-red-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-red-800">Klinika ochilmadi</h1>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-[8px] bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Qayta yuklash
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/clinics" className="text-sm font-semibold text-emerald-800">
          Klinikalar ro&apos;yxatiga qaytish
        </Link>

        <div className="mt-5">
          <ImageGallery clinic={clinic} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-6">
            <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                  Rating {clinic.averageRating?.toFixed(1) ?? "yangi"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {clinic.reviewCount} sharh
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                  {clinic.isOpenNow ? "Ochiq" : "Yopiq"}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-semibold text-slate-950">Sharhlar</h2>
              <div className="mt-4 space-y-3">
                {clinic.reviews?.length ? (
                  clinic.reviews.map((review) => (
                    <div key={review.id} className="rounded-[8px] bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900">
                          {review.user?.name || review.user?.email || "Mijoz"}
                        </p>
                        <span className="text-sm font-semibold text-amber-700">
                          {review.rating}/5
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        {review.comment || "Izoh qoldirilmagan."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[8px] bg-slate-50 p-4 text-sm text-slate-600">
                    Hali sharhlar yo&apos;q.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <OpeningHours hours={clinic.openingHours} />
            <ClinicMap clinics={[clinic]} activeId={clinic.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
