

import PropertyFilter from "./components/PropertyFilter";
import PropertyGrid from "./components/PropertyGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default function HotelPage() {
    return (
        <div className="layout-container flex h-full grow flex-col min-h-screen bg-[#f8f6f6] dark:bg-[#221610] text-slate-900 dark:text-slate-100 font-sans">
            <main className="flex flex-col flex-1 mx-auto w-full bg-white dark:bg-gray-900 ">
                {/* <PropertyFilter /> */}
                <PropertyGrid />
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-10 py-8 mt-12">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span className="material-symbols-outlined text-[18px]">copyright</span>
                        2024 Hotel Manager Pro. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <a className="text-slate-500 hover:text-[#ec5b13] text-sm font-medium" href="#">Privacy Policy</a>
                        <a className="text-slate-500 hover:text-[#ec5b13] text-sm font-medium" href="#">Terms of Service</a>
                        <a className="text-slate-500 hover:text-[#ec5b13] text-sm font-medium" href="#">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}