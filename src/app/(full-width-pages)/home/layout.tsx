"use client";

import AppHeader from "@/layout/AppHeader";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="min-h-screen xl:flex">
                <div
                    className={`flex-1 transition-all  duration-300 ease-in-out `}
                >
                    <AppHeader />
                    <div className="p-4 mx-auto  md:p-6">{children}</div>
                </div>
            </div>
        </AuthGuard>
    );
}
