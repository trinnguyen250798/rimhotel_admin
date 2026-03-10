import { Hotel } from "@/types/hotel";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${hotel.image ?? "/images/hotel-placeholder.jpg"})`,
          }}
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
          {hotel.star}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-1">
            {hotel.name}
          </h3>

          <div className="flex items-center text-slate-500 text-sm">
            <span className="material-symbols-outlined text-sm mr-1">
              location_on
            </span>
            {hotel.district}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Occupancy
            </span>
            <span className="text-lg font-bold">85%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Revenue
            </span>
            <span className="text-lg font-bold">$12.4k</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Tasks
            </span>
            <span className="text-lg font-bold text-primary">5</span>
          </div>
        </div>

        <button className="w-full py-3 px-4 bg-slate-900 hover:bg-primary text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-auto">
          Enter Dashboard
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}