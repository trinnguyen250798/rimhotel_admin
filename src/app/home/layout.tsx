"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import React, { useEffect, useState } from "react"; // Thêm useEffect, useState
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false); // Trạng thái kiểm tra quyền

    useEffect(() => {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user) {
            router.replace("/signin"); // Dùng replace để không lưu lại lịch sử trang lỗi
        } else if (user.role_id == 4) {
            router.replace("/");
        } else {
            setIsAuthorized(true); // Chỉ khi hợp lệ mới cho phép hiển thị
        }
    }, [router]);

    // Nếu chưa xác minh xong, trả về null hoặc Loading spinner để không bị "flash" nội dung
    if (!isAuthorized) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        ); 
    }

    // Logic tính toán class vẫn giữ nguyên
    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";

    return (
        <div className="min-h-screen xl:flex">
            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                <AppHeader />
                <div className="p-4 mx-auto md:p-6">{children}</div>
            </div>
        </div>
    );
}