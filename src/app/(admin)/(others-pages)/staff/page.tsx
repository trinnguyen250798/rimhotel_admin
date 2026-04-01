"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
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
import Select from "@/components/form/Select";
import { Province, District } from "@/types/location";
import { useAppDispatch } from "@/store/hooks";
import { fetchProvincesByCountry, fetchDistrictsByProvince } from "@/store/slices/locationSlice";
import { StaffDB,Staff, Department, Position, StaffFormData } from "@/types/staff";
import {
  useStaffs,
  useStaffMutations,
  useDepartments,
  usePositions,
  useDepartmentMutations,
  usePositionMutations,
} from "@/hooks/useStaff";

const EMPTY_STAFF_FORM: StaffFormData = {
  ulid: null,
  name: "",
  email: "",
  phone: "",
  password: "",
  country_id: "",
  province_id: "",
  district_id: "",
  department_id: 0,
  position_id: 0,
};

export default function StaffPage() {
  // ─── Modal visibility ──────────────────────────────────────────────────────
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);

  // ─── Staff form state ──────────────────────────────────────────────────────
  const [staffForm, setStaffForm] = useState<StaffFormData>(EMPTY_STAFF_FORM);

  const setStaffField = <K extends keyof StaffFormData>(
    field: K,
    value: StaffFormData[K]
  ) => setStaffForm((prev) => ({ ...prev, [field]: value }));

  // ─── Department form state ─────────────────────────────────────────────────
  const [deptName, setDeptName] = useState("");
  const [editingDeptId, setEditingDeptId] = useState<number | null>(null);

  // ─── Position form state ───────────────────────────────────────────────────
  const [posName, setPosName] = useState("");
  const [editingPosId, setEditingPosId] = useState<number | null>(null);

  // ─── Location Data Fetching ────────────────────────────────────────────────
  const dispatch = useAppDispatch();
  const countries = useSelector((state: RootState) => state.location.countries);
  const provincesState = useSelector((state: RootState) => state.location.provinces);
  const districtsState = useSelector((state: RootState) => state.location.districts);
  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);

  React.useEffect(() => {
    if (staffForm.country_id) {
      const country = countries.find((c) => String(c.id) === staffForm.country_id);
      const data = provincesState[country?.code || ""];
      if (data) {
        setProvince(data);
      } else {
        dispatch(fetchProvincesByCountry(country?.code || ""));
      }
    } else {
      setProvince([]);
    }
  }, [staffForm.country_id, provincesState, dispatch]);

  React.useEffect(() => {
    if (staffForm.province_id) {
      const provincce = province.find((p) => String(p.id) === staffForm.province_id);
      const data = districtsState[provincce?.code || ""];
      if (data) {
        setDistrict(data);
      } else {
        dispatch(fetchDistrictsByProvince(provincce?.code || ""));
      }
    } else {
      setDistrict([]);
    }
  }, [staffForm.province_id, districtsState, dispatch]);

  // ─── Hotel ID (lấy từ HotelCurrent) ─────────────────────────────────────────
  const hotelCurrent = useSelector((state: RootState) => state.hotelCurrent.hotelCurrent);
  const hotelId =
    hotelCurrent?.ulid ||
    (hotelCurrent as any)?.data?.ulid ||
    (typeof window !== "undefined" ? localStorage.getItem("hotelIdCurrent") : "") ||
    "";

  // ─── Data fetching ─────────────────────────────────────────────────────────
  const { data: staffList = [], isLoading: isLoadingStaff } = useStaffs();
  const { data: departments = [], isLoading: isLoadingDepts } = useDepartments(isDeptModalOpen || isStaffModalOpen);
  const { data: positions = [], isLoading: isLoadingPos } = usePositions(isPosModalOpen || isStaffModalOpen);

  // ─── Staff mutations ───────────────────────────────────────────────────────
  const handleStaffModalClose = () => {
    setIsStaffModalOpen(false);
    setStaffForm(EMPTY_STAFF_FORM);
  };
  const { addMutation: addStaff, updateMutation: updateStaff, deleteMutation: deleteStaff } = useStaffMutations(handleStaffModalClose);

  const handleSubmitStaff = () => {
    if (!staffForm.name.trim()) { alert("Vui lòng nhập họ tên!"); return; }
    if (!staffForm.email.trim()) { alert("Vui lòng nhập email!"); return; }
    if (!staffForm.phone.trim()) { alert("Vui lòng nhập số điện thoại!"); return; }
    if (!staffForm.ulid && !staffForm.password?.trim()) { alert("Vui lòng nhập mật khẩu!"); return; }
    if (!staffForm.country_id) { alert("Vui lòng chọn quốc gia!"); return; }
    if (!staffForm.province_id) { alert("Vui lòng chọn tỉnh thành!"); return; }

    const { ulid, ...payloadData } = staffForm;
    if (ulid) {
      updateStaff.mutate({ ulid, payload: payloadData });
    } else {
      addStaff.mutate(payloadData);
    }
  };

  const handleEditStaff = (staff: StaffDB) => {
    setStaffForm({
      ulid: staff.ulid,
      name: staff.user?.name || "",
      email: staff.user?.email || "",
      phone: staff.user?.phone || "",
      password: "", 
      country_id: String(staff.user?.country_id || ""),
      province_id: String(staff.user?.province_id || ""),
      district_id: String(staff.user?.district_id || ""),
      department_id: staff.department_id || 0,
      position_id: staff.position_id || 0,
    });
    setIsStaffModalOpen(true);
  };

  const handleDeleteStaff = (ulid: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;
    deleteStaff.mutate(ulid);
  };

  // Khi mở modal thêm nhân viên, reset form
  const handleOpenStaffModal = () => {
    setStaffForm(EMPTY_STAFF_FORM);
    setIsStaffModalOpen(true);
  };

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

  const isSubmittingStaff = addStaff.isPending || updateStaff.isPending;
  const isSubmittingDept = addDept.isPending || updateDept.isPending;
  const isSubmittingPos = addPos.isPending || updatePos.isPending;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-end gap-3 mb-6">
        <Button size="xs" onClick={handleOpenStaffModal}>Thêm nhân viên</Button>
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
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Phòng ban / Chức vụ</TableCell>
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
                  staffList.map((staff: StaffDB) => (
                    <TableRow key={staff.ulid || Math.random().toString()}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center relative">
                            {staff.user.avatar ? (
                              <Image fill src={staff.user.avatar} className="object-cover" alt="User" />
                            ) : (
                              <span className="text-gray-500 font-bold uppercase">{staff.user.name?.charAt(0) || "U"}</span>
                            )}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{staff.user.name}</span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">Email: {staff.user.email}</span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">Số điện thoại: {staff.user.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-800 dark:text-white/90">{staff.department?.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{staff.position?.name || "Chưa cập nhật chức vụ"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm">
                        <Badge size="sm" color="success">{staff.user.role || "Nhân viên"}</Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-end text-theme-sm">
                        <div className="flex gap-3 justify-end items-center">
                          <button onClick={() => handleEditStaff(staff)} className="text-brand-500 hover:text-brand-600 font-medium transition-colors">Sửa</button>
                          <button onClick={() => handleDeleteStaff(staff.ulid)} className="text-error-500 hover:text-error-600 font-medium transition-colors">Xóa</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal: Thêm nhân viên */}
      <Modal
        isOpen={isStaffModalOpen}
        onClose={handleStaffModalClose}
        className="max-w-[800px] p max-h-[80vh] overflow-y-auto-6"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {staffForm.ulid ? "Cập nhật nhân viên" : "Thêm nhân viên"}
          </h3>

          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="staffName">Họ và tên <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                id="staffName"
                placeholder="Nhập họ và tên..."
                value={staffForm.name}
                onChange={(e) => setStaffField("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="staffEmail">Email <span className="text-error-500">*</span></Label>
              <Input
                type="email"
                id="staffEmail"
                placeholder="Nhập email..."
                value={staffForm.email}
                onChange={(e) => setStaffField("email", e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Phone + Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="staffPhone">Số điện thoại <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                id="staffPhone"
                placeholder="Nhập SĐT..."
                value={staffForm.phone}
                onChange={(e) => setStaffField("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="staffPassword">Mật khẩu {!staffForm.ulid && <span className="text-error-500">*</span>}</Label>
              <Input
                type="password"
                id="staffPassword"
                placeholder={staffForm.ulid ? "Bỏ trống nếu không đổi..." : "Nhập mật khẩu..."}
                value={staffForm.password || ""}
                onChange={(e) => setStaffField("password", e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Country + Province + District */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="staffCountry">Quốc gia <span className="text-error-500">*</span></Label>
              <Select
                id="staffCountry"
                options={countries.map((c) => ({ value: String(c.id), label: c.name }))}
                value={String(staffForm.country_id)}
                onChange={(val) => {
                  setStaffField("country_id", (String(val) ?? "VN"));
                  setStaffField("province_id", "");
                  setStaffField("district_id", "");
                }}
                placeholder="Chọn quốc gia"
              />
            </div>
            <div>
              <Label htmlFor="staffProvince">Tỉnh thành <span className="text-error-500">*</span></Label>
              <Select
                id="staffProvince"
                options={province.map((p) => ({ value: String(p.id), label: p.name }))}
                value={String(staffForm.province_id)}
                onChange={(val) => {
                  setStaffField("province_id", String(val) ?? "");
                  setStaffField("district_id", "");
                }}
                placeholder="Chọn tỉnh thành"
              />
            </div>
            <div>
              <Label htmlFor="staffDistrict">Quận huyện <span className="text-error-500">*</span></Label>
              <Select
                id="staffDistrict"
                options={district.map((d) => ({ value: String(d.id), label: d.name }))}
                value={String(staffForm.district_id)}
                onChange={(val) => setStaffField("district_id", String(val) ?? "")}
                placeholder="Chọn quận huyện"
              />
            </div>
          </div>

          {/* Row 4: Department + Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="staffDept">Phòng ban</Label>
              <select
                id="staffDept"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-white/[0.15] dark:bg-white/[0.05] dark:text-white"
                value={staffForm.department_id}
                onChange={(e) => setStaffField("department_id", Number(e.target.value))}
              >
                <option value={0}>-- Chọn phòng ban --</option>
                {isLoadingDepts ? (
                  <option disabled>Đang tải...</option>
                ) : (
                  departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))
                )}
              </select>
            </div>
            <div>
              <Label htmlFor="staffPos">Chức vụ</Label>
              <select
                id="staffPos"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-white/[0.15] dark:bg-white/[0.05] dark:text-white"
                value={staffForm.position_id}
                onChange={(e) => setStaffField("position_id", Number(e.target.value))}
              >
                <option value={0}>-- Chọn chức vụ --</option>
                {isLoadingPos ? (
                  <option disabled>Đang tải...</option>
                ) : (
                  positions.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2">
            <Button size="xs" variant="outline" onClick={handleStaffModalClose} disabled={isSubmittingStaff}>Đóng</Button>
            <Button size="xs" onClick={handleSubmitStaff} disabled={isSubmittingStaff}>
              {isSubmittingStaff ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </div>
      </Modal>

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
