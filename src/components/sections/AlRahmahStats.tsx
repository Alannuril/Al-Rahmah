const statsData = [
  {
    id: 1,
    value: "2005",
    label: "Tahun Berdiri",
    mobileLabel: "Berdiri",
    compactLabel: "Sejak 2005",
  },
  {
    id: 2,
    value: "A",
    label: "Akreditasi MA",
    mobileLabel: "Akred. MA",
    compactLabel: "MA A",
    sublabel: "Madrasah Aliyah",
  },
  {
    id: 3,
    value: "B",
    label: "Akreditasi MTs",
    mobileLabel: "Akred. MTs",
    compactLabel: "MTs B",
    sublabel: "Madrasah Tsanawiyah",
  },
  {
    id: 4,
    value: "2",
    label: "Kombinasi Kurikulum",
    mobileLabel: "Kurikulum",
    compactLabel: "2 Kurikulum",
    sublabel: "Gontor & Kemenag",
  },
];

export function AlRahmahStats() {
  return (
    <section aria-label="Profil singkat Al-Rahmah" className="w-full shrink-0 text-white">
      {/* Borderless Minimalist Strip on Mobile & Tablet (< lg) - Compact & Bright */}
      <div className="lg:hidden w-full py-1">
        <ul className="grid grid-cols-4 divide-x divide-white/30 text-center">
          {statsData.map((stat) => (
            <li
              key={stat.id}
              className="flex flex-col items-center justify-center px-0.5"
            >
              <span className="font-heading text-sm min-[390px]:text-[15px] font-bold text-emerald-300 tabular-nums tracking-tight leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {stat.value}
              </span>
              <span className="mt-0.5 text-[9px] min-[390px]:text-[9.5px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] tracking-tight">
                {stat.mobileLabel}
              </span>
              <span className="sr-only">
                {stat.label}: {stat.value}{stat.sublabel ? `, ${stat.sublabel}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expanded Credential Grid on Desktop (>= lg) */}
      <dl className="hidden lg:grid lg:grid-cols-4 lg:gap-x-8 xl:gap-x-12">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="relative grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] content-center items-center gap-x-1.5 py-1 before:absolute before:top-1/2 before:hidden before:h-8 before:w-px before:-translate-y-1/2 before:bg-white/20 lg:min-h-16 lg:gap-x-2 lg:py-2 lg:before:-left-4 lg:before:block lg:first:before:hidden xl:before:-left-6"
          >
            <dt className={"col-start-2 row-start-1 text-xs font-medium leading-4 text-white/90 lg:text-sm lg:leading-6" + (stat.sublabel ? "" : " row-span-2")}>
              {stat.label}
            </dt>
            <dd className="col-start-1 row-span-2 row-start-1 font-heading text-xl font-semibold leading-6 text-brand-lime tabular-nums sm:text-2xl lg:text-[32px] lg:leading-8">
              {stat.value}
            </dd>
            {stat.sublabel && (
              <dd className="col-start-2 row-start-2 text-[11px] leading-4 text-white/75 sm:text-xs lg:leading-6">
                {stat.sublabel}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
