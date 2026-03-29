import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StaffService, DepartmentService, PositionService } from "@/services/staff.service";
import { StaffFormData } from "@/types/staff";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const STAFF_QUERY_KEYS = {
  staffs: ["staffs"] as const,
  departments: ["departments"] as const,
  positions: ["positions"] as const,
};

// ─── Staff ────────────────────────────────────────────────────────────────────

export const useStaffs = () =>
  useQuery({
    queryKey: [...STAFF_QUERY_KEYS.staffs],
    queryFn: () => StaffService.getAll(),
  });

export const useStaffMutations = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEYS.staffs });

  const addMutation = useMutation({
    mutationFn: (payload: Omit<StaffFormData, "ulid">) => StaffService.create(payload),
    onSuccess: () => { invalidate(); onSuccess(); },
    onError: (error) => {
      console.error("Lỗi khi thêm nhân viên:", error);
      alert("Có lỗi xảy ra khi thêm nhân viên!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ ulid, payload }: { ulid: string; payload: Omit<StaffFormData, "ulid"> }) =>
      StaffService.update(ulid, payload),
    onSuccess: () => { invalidate(); onSuccess(); },
    onError: (error) => {
      console.error("Lỗi khi cập nhật nhân viên:", error);
      alert("Có lỗi xảy ra khi cập nhật nhân viên!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (ulid: string) => StaffService.delete(ulid),
    onSuccess: invalidate,
    onError: (error) => {
      console.error("Lỗi khi xóa nhân viên:", error);
      alert("Có lỗi xảy ra khi xóa nhân viên!");
    },
  });

  return { addMutation, updateMutation, deleteMutation };
};

// ─── Departments ──────────────────────────────────────────────────────────────

export const useDepartments = (enabled: boolean) =>
  useQuery({
    queryKey: STAFF_QUERY_KEYS.departments,
    queryFn: DepartmentService.getAll,
    enabled,
  });

export const useDepartmentMutations = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEYS.departments });

  const addMutation = useMutation({
    mutationFn: DepartmentService.create,
    onSuccess: () => { invalidate(); onSuccess(); },
    onError: (error) => {
      console.error("Lỗi khi thêm phòng ban:", error);
      alert("Có lỗi xảy ra khi thêm phòng ban!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { name: string } }) =>
      DepartmentService.update(id, payload),
    onSuccess: () => { invalidate(); onSuccess(); },
    onError: (error) => {
      console.error("Lỗi khi cập nhật phòng ban:", error);
      alert("Có lỗi xảy ra khi cập nhật phòng ban!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DepartmentService.delete,
    onSuccess: invalidate,
    onError: (error) => {
      console.error("Lỗi khi xóa phòng ban:", error);
      alert("Có lỗi xảy ra khi xóa phòng ban!");
    },
  });

  return { addMutation, updateMutation, deleteMutation };
};

// ─── Positions ────────────────────────────────────────────────────────────────

export const usePositions = (enabled: boolean) =>
  useQuery({
    queryKey: STAFF_QUERY_KEYS.positions,
    queryFn: PositionService.getAll,
    enabled,
  });

export const usePositionMutations = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEYS.positions });

  const addMutation = useMutation({
    mutationFn: PositionService.create,
    onSuccess: () => { invalidate(); onSuccess(); },
    onError: (error) => {
      console.error("Lỗi khi thêm chức vụ:", error);
      alert("Có lỗi xảy ra khi thêm chức vụ!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { name: string } }) =>
      PositionService.update(id, payload),
    onSuccess: () => { invalidate(); onSuccess(); },
    onError: (error) => {
      console.error("Lỗi khi cập nhật chức vụ:", error);
      alert("Có lỗi xảy ra khi cập nhật chức vụ!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: PositionService.delete,
    onSuccess: invalidate,
    onError: (error) => {
      console.error("Lỗi khi xóa chức vụ:", error);
      alert("Có lỗi xảy ra khi xóa chức vụ!");
    },
  });

  return { addMutation, updateMutation, deleteMutation };
};
