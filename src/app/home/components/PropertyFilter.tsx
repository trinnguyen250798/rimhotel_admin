const filters = [
  { label: "All Properties", icon: null, active: true },
  { label: "Luxury", icon: "diamond", active: false },
  { label: "Resort", icon: "pool", active: false },
  { label: "Boutique", icon: "storefront", active: false },
];

export default function PropertyFilter() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
      {/* Search */}
      <div className="flex">
        <label className="flex flex-col h-12 w-[590px]">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <div className="text-slate-400 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 text-base font-normal px-4"
              placeholder="Search properties by name, city or tier..."
            />
          </div>
        </label>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {filters.map((f) => (
          f.active ? (
            <div
              key={f.label}
              className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#ec5b13] text-white px-6 font-semibold cursor-pointer"
            >
              <span className="text-sm">{f.label}</span>
            </div>
          ) : (
            <div
              key={f.label}
              className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 text-slate-600 dark:text-slate-300 font-medium hover:border-[#ec5b13]/50 cursor-pointer transition-colors"
            >
              {f.icon && <span className="material-symbols-outlined text-[18px]">{f.icon}</span>}
              <span className="text-sm">{f.label}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
