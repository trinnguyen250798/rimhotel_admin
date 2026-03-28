"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Staff, Department, Position } from "@/types/staff";
import { useStaffs, useDepartments, usePositions, useDepartmentMutations, usePositionMutations } from "@/hooks/useStaff";

export default function StaffPage() {
  // ─── Modal visibility ──────────────────────────────────────────────────────
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);

  // ─── Department form state ─────────────────────────────────────────────────
  const [deptName, setDeptName] = useState("");
  const [editingDeptId, setEditingDeptId] = useState<number | null>(null);

  // ─── Position form state ───────────────────────────────────────────────────
  const [posName, setPosName] = useState("");
  const [editingPosId, setEditingPosId] = useState<number | null>(null);

  // ─── Data fetching ─────────────────────────────────────────────────────────
  const { data: staffList = [], isLoading: isLoadingStaff } = useStaffs();
  const { data: departments = [], isLoading: isLoadingDepts } = useDepartments(isDeptModalOpen);
  const { data: positions = [], isLoading: isLoadingPos } = usePositions(isPosModalOpen);

  // ─── Department mutations ──────────────────────────────────────────────────
  const handleCancelEditDept = () => { setEditingDeptId(null); setDeptName(""); };
  const { addMutation: addDept, updateMutation: updateDept, deleteMutation: deleteDept } =
    useDepartmentMutations(handleCancelEditDept);

  // ─── Position mutations ────────────────────────────────────────────────────
  const handleCancelEditPos = () => { setEditingPosId(null); setPosName(""); };
  const { addMutation: addPos, updateMutation: updatePos, deleteMutation: deletePos } =
    usePositionMutations(handleCancelEditPos);

  // ─── Department handlers ───────────────────────────────────────────────────
  const handleEditDept = (dept: Department) => { setEditingDeptId(dept.id); setDeptName(dept.name); };
  const handleDeleteDept = (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa phòng ban này?")) return;
    deleteDept.mutate(id);
  };
  const handleSubmitDept = () => {
    if (!deptName.trim()) { alert("Vui lòng nhập tên phòng ban!"); return; }
    if (editingDeptId) {
      updateDept.mutate({ id: editingDeptId, payload: { name: deptName } });
    } else {
      addDept.mutate({ name: deptName });
    }
  };

  // ─── Position handlers ─────────────────────────────────────────────────────
  const handleEditPos = (pos: Position) => { setEditingPosId(pos.id); setPosName(pos.name); };
  const handleDeletePos = (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa chức vụ này?")) return;
    deletePos.mutate(id);
  };
  const handleSubmitPos = () => {
    if (!posName.trim()) { alert("Vui lòng nhập tên chức vụ!"); return; }
    if (editingPosId) {
      updatePos.mutate({ id: editingPosId, payload: { name: posName } });
    } else {
      addPos.mutate({ name: posName });
    }
  };

  const isSubmittingDept = addDept.isPending || updateDept.isPending;
  const isSubmittingPos = addPos.isPending || updatePos.isPending;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Action bar */}
      <div className="flex justify-end gap-3 mb-6">
        <Button size="xs" onClick={() => setIsDeptModalOpen(true)}>Thêm phòng ban</Button>
        <Button size="xs" onClick={() => setIsPosModalOpen(true)}>Thêm chức vụ</Button>
      </div>

      {/* Staff table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nhân viên</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Liên hệ</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Vai trò (Role)</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">Thao tác</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {isLoadingStaff ? (
                  <TableRow>
                    <TableCell colSpan={4} className="px-5 py-4 text-center text-gray-500">Đang tải danh sách nhân viên...</TableCell>
                  </TableRow>
                ) : staffList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="px-5 py-4 text-center text-gray-500">Chưa có nhân viên nào.</TableCell>
                  </TableRow>
                ) : (
                  staffList.map((staff: Staff) => (
                    <TableRow key={staff.ulid || Math.random().toString()}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center relative">
                            {staff.avatar ? (
                              <Image fill src={staff.avatar} className="object-cover" alt="User" />
                            ) : (
                              <span className="text-gray-500 font-bold uppercase">{staff.name?.charAt(0) || "U"}</span>
                            )}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{staff.name}</span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">ID: {staff.ulid}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-800 dark:text-white/90">{staff.email}</span>
                          <span className="text-gray-500 dark:text-gray-400">{staff.phone || "Chưa cập nhật SĐT"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm">
                        <Badge size="sm" color="success">{staff.role || "Nhân viên"}</Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-end text-theme-sm">
                        <button className="text-brand-500 hover:text-brand-600 transition-colors">Xem / Sửa</button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal: Phòng ban */}
      <Modal
        isOpen={isDeptModalOpen}
        onClose={() => { setIsDeptModalOpen(false); handleCancelEditDept(); }}
        className="max-w-[700px] p-6"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {editingDeptId ? "Cập nhật phòng ban" : "Thêm phòng ban"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="deptName">Tên phòng ban</Label>
              <Input type="text" id="deptName" placeholder="Nhập tên phòng ban..." value={deptName} onChange={(e) => setDeptName(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            {!editingDeptId && <Button size="xs" variant="outline" onClick={() => setIsDeptModalOpen(false)}>Đóng</Button>}
            {editingDeptId && <Button size="xs" variant="outline" onClick={handleCancelEditDept}>Hủy Cập Nhật</Button>}
            <Button size="xs" onClick={handleSubmitDept} disabled={isSubmittingDept}>
              {isSubmittingDept ? "Đang lưu..." : editingDeptId ? "Cập nhật" : "Lưu"}
            </Button>
          </div>
          <hr className="my-2 border-gray-200 dark:border-white/[0.05]" />
          <h4 className="text-md font-medium text-gray-800 dark:text-white">Danh sách phòng ban</h4>
          <div className="max-h-[300px] overflow-y-auto w-full border border-gray-200 rounded-lg dark:border-white/[0.05]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-gray-900 z-10">
                <TableRow>
                  <TableCell isHeader className="px-4 py-2 text-start font-medium text-gray-500 text-sm">ID</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-start font-medium text-gray-500 text-sm">Tên phòng ban</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-end font-medium text-gray-500 text-sm">Thao tác</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {isLoadingDepts ? (
                  <TableRow><TableCell className="px-4 py-3 text-center" colSpan={3}>Đang tải...</TableCell></TableRow>
                ) : departments.length === 0 ? (
                  <TableRow><TableCell className="px-4 py-3 text-center" colSpan={3}>Không có dữ liệu</TableCell></TableRow>
                ) : (
                  departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="px-4 py-3 text-sm">{dept.id}</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{dept.name}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex gap-3 justify-end items-center">
                          <button onClick={() => handleEditDept(dept)} className="text-brand-500 hover:text-brand-600 text-sm font-medium transition-colors">Sửa</button>
                          <button onClick={() => handleDeleteDept(dept.id)} className="text-error-500 hover:text-error-600 text-sm font-medium transition-colors">Xóa</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Modal>

      {/* Modal: Chức vụ */}
      <Modal
        isOpen={isPosModalOpen}
        onClose={() => { setIsPosModalOpen(false); handleCancelEditPos(); }}
        className="max-w-[700px] p-6"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {editingPosId ? "Cập nhật chức vụ" : "Thêm chức vụ"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="posName">Tên chức vụ</Label>
              <Input type="text" id="posName" placeholder="Nhập tên chức vụ..." value={posName} onChange={(e) => setPosName(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            {!editingPosId && <Button size="xs" variant="outline" onClick={() => setIsPosModalOpen(false)}>Đóng</Button>}
            {editingPosId && <Button size="xs" variant="outline" onClick={handleCancelEditPos}>Hủy Cập Nhật</Button>}
            <Button size="xs" onClick={handleSubmitPos} disabled={isSubmittingPos}>
              {isSubmittingPos ? "Đang lưu..." : editingPosId ? "Cập nhật" : "Lưu"}
            </Button>
          </div>
          <hr className="my-2 border-gray-200 dark:border-white/[0.05]" />
          <h4 className="text-md font-medium text-gray-800 dark:text-white">Danh sách chức vụ</h4>
          <div className="max-h-[300px] overflow-y-auto w-full border border-gray-200 rounded-lg dark:border-white/[0.05]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-gray-900 z-10">
                <TableRow>
                  <TableCell isHeader className="px-4 py-2 text-start font-medium text-gray-500 text-sm">ID</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-start font-medium text-gray-500 text-sm">Tên chức vụ</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-end font-medium text-gray-500 text-sm">Thao tác</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {isLoadingPos ? (
                  <TableRow><TableCell className="px-4 py-3 text-center" colSpan={3}>Đang tải...</TableCell></TableRow>
                ) : positions.length === 0 ? (
                  <TableRow><TableCell className="px-4 py-3 text-center" colSpan={3}>Không có dữ liệu</TableCell></TableRow>
                ) : (
                  positions.map((pos) => (
                    <TableRow key={pos.id}>
                      <TableCell className="px-4 py-3 text-sm">{pos.id}</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{pos.name}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex gap-3 justify-end items-center">
                          <button onClick={() => handleEditPos(pos)} className="text-brand-500 hover:text-brand-600 text-sm font-medium transition-colors">Sửa</button>
                          <button onClick={() => handleDeletePos(pos.id)} className="text-error-500 hover:text-error-600 text-sm font-medium transition-colors">Xóa</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
