

export interface Staff {
    ulid: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    role_id: number;
    avatar?: string;
    department_id: number;
    position_id: number;
    hotel_id: string | number;
}

export interface StaffResponse {
    data: Staff[];
    links: [] | null;
    meta: [] | null;
}

export interface StaffFormData {
    ulid: string | null;
    email: string;
    name: string;
    phone: string;
    role_id: number;
    department_id: number;
    position_id: number;
    hotel_id: string | number;
}

export interface Department {
    id: number;
    name: string;
}

export interface Position {
    id: number;
    name: string;
}

export interface DepartmentPayload {
    name: string;
}

export interface PositionPayload {
    name: string;
}
