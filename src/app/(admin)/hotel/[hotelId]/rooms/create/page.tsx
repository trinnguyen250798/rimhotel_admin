"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RoomForm from "../../../_components/RoomForm";

export default function RoomCreatePage() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log("Create room", data);
  };

  return (
    <div>
      <div className="mb-6">
        <PageBreadcrumb pageTitle="Create Room" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <RoomForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
