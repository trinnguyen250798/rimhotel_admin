
import { useRouter } from "next/navigation";
export default function AddPropertyCard() {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/home/hotel/create")} className="bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-[#ec5b13]/50 transition-all">
      <div className="size-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-[#ec5b13] mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-4xl">add</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thêm khách sạn</h3>

    </div>
  );
}
