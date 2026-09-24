const statsData = [
  {
    id: 1,
    value: "2005",
    label: "Tahun Berdiri",
  },
  {
    id: 2,
    value: "A",
    label: "Akreditasi MA",
    sublabel: "Madrasah Aliyah",
  },
  {
    id: 3,
    value: "B",
    label: "Akreditasi MTs",
    sublabel: "Madrasah Tsanawiyah",
  },
  {
    id: 4,
    value: "2",
    label: "Kombinasi Kurikulum",
    sublabel: "Gontor & Kemenag",
  },
];

export function AlRahmahStats() {
  return (
    <section aria-label="Profil singkat Al-Rahmah" className="text-white">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-4 lg:gap-x-8">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="grid min-w-0 grid-cols-1 content-start gap-y-1 border-t border-white/30 py-3 max-[374px]:py-2 lg:min-h-24 lg:grid-cols-[5.5rem_minmax(0,1fr)] lg:content-center lg:items-center lg:gap-x-4 lg:gap-y-0 lg:py-4"
          >
            <dt className={"col-start-1 row-start-2 text-xs font-medium leading-5 text-white/90 lg:col-start-2 lg:row-start-1 lg:text-sm lg:leading-6" + (stat.sublabel ? "" : " lg:row-span-2")}>
              {stat.label}
            </dt>
            <dd className="col-start-1 row-start-1 font-heading text-[26px] font-semibold leading-8 text-brand-lime tabular-nums sm:text-[28px] lg:row-span-2 lg:text-[32px]">
              {stat.value}
            </dd>
            {stat.sublabel && (
              <dd className="col-start-1 row-start-3 text-[11px] leading-5 text-white/75 sm:text-xs lg:col-start-2 lg:row-start-2 lg:leading-6">
                {stat.sublabel}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
