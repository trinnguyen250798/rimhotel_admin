import axiosClient from "@/lib/axios";
import { Staff, Department, DepartmentPayload, Position, PositionPayload, StaffFormData } from "@/types/staff";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
// ─── Staff ────────────────────────────────────────────────────────────────────

export const StaffService = {
  getAll: async (): Promise<Staff[]> => {
    const res = await axiosClient.get("/admin/staff");
    const data = res.data.data || res.data;
    return Array.isArray(data) ? data : [];
  },

  create: (payload: Omit<StaffFormData, "ulid">) =>
    axiosClient.post("/admin/staff", payload),

  update: (ulid: string, payload: Omit<StaffFormData, "ulid">) =>
    axiosClient.put(`/admin/staff/${ulid}`, payload),

  delete: (ulid: string) =>
    axiosClient.delete(`/admin/staff/${ulid}`),
};

// ─── Departments ──────────────────────────────────────────────────────────────

export const DepartmentService = {
  getAll: async (): Promise<Department[]> => {
    const res = await axiosClient.get("/admin/departments");
    const data = res.data.data || res.data;
    return Array.isArray(data) ? data : [];
  },

  create: (payload: DepartmentPayload) =>
    axiosClient.post("/admin/departments", payload),

  update: (id: number, payload: DepartmentPayload) =>
    axiosClient.put(`/admin/departments/${id}`, payload),

  delete: (id: number) =>
    axiosClient.delete(`/admin/departments/${id}`),
};

// ─── Positions ────────────────────────────────────────────────────────────────

export const PositionService = {
  getAll: async (): Promise<Position[]> => {
    const res = await axiosClient.get("/admin/positions");
    const data = res.data.data || res.data;
    return Array.isArray(data) ? data : [];
  },

  create: (payload: PositionPayload) =>
    axiosClient.post("/admin/positions", payload),

  update: (id: number, payload: PositionPayload) =>
    axiosClient.put(`/admin/positions/${id}`, payload),

  delete: (id: number) =>
    axiosClient.delete(`/admin/positions/${id}`),
};
