interface PropertyCardProps {
  image: string;
  rating: number;
  name: string;
  location: string;
  tier: string;
  occupancy: string;
  revenue: string;
  tasks: string;
  taskHighlight?: boolean;
}

export default function PropertyCard({
  image,
  rating,
  name,
  location,
  tier,
  occupancy,
  revenue,
  tasks,
  taskHighlight = false,
}: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[12px] font-bold text-[#ec5b13] flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">star</span> {rating}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h3>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span> {location}
            </p>
          </div>
          <span className="bg-[#ec5b13]/10 text-[#ec5b13] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            {tier}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Occupancy</span>
            <span className="text-slate-900 dark:text-white font-bold text-lg">{occupancy}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Revenue</span>
            <span className="text-slate-900 dark:text-white font-bold text-lg">{revenue}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Tasks</span>
            <span className={`font-bold text-lg ${taskHighlight ? "text-[#ec5b13]" : "text-slate-600 dark:text-slate-400"}`}>
              {tasks}
            </span>
          </div>
        </div>

        <button className="w-full h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          Enter Dashboard
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
