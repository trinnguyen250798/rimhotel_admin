import { Hotel } from "@/types/hotel";

interface PropertyCardProps {
  hotel: Hotel;
}

export default function PropertyCard({ hotel }: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${hotel?.images?.[0]}')` }}
      >
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[12px] font-bold text-[#ec5b13] flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">star</span> {hotel?.star_rating}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{hotel?.name}</h3>
            <span className="bg-[#ec5b13]/10 text-[#ec5b13] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              {hotel?.address.district.name}
            </span>
          </div>
        </div>
        <p className="text-slate-500 text-xs flex items-center gap-1 mb-2">
          <span className="!text-[18px] material-symbols-outlined ">location_on</span> {hotel?.address.address}
        </p>
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex flex-col">
            <span className="text-slate-400 !text-[10px] uppercase font-bold tracking-widest">District</span>
            <span className="text-slate-900 dark:text-white font-bold text-[12px]">{hotel?.address.district.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 !text-[10px] uppercase font-bold tracking-widest">Website</span>
            <a 
              href={hotel?.contact?.website?.startsWith('http') ? hotel.contact.website : `https://${hotel?.contact?.website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-900 dark:text-white font-bold text-[12px] truncate max-w-[200px] block hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors"
            >
              {hotel?.contact?.website || '—'}
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 !text-[10px] uppercase font-bold tracking-widest">Star Rating</span>
            <span className={`font-bold text-[12px] ${hotel?.star_rating ? "text-[#ec5b13]" : "text-slate-600 dark:text-slate-400"}`}>
              {hotel?.star_rating}
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
