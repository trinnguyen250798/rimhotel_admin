export default function AddPropertyCard() {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-[#ec5b13]/50 transition-all">
      <div className="size-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-[#ec5b13] mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-4xl">add</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Add Another Property</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[200px] mb-6">
        Scale your business by adding more properties to your portfolio.
      </p>
      <button className="h-10 px-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm font-bold shadow-sm hover:shadow transition-shadow">
        Start Onboarding
      </button>
    </div>
  );
}
