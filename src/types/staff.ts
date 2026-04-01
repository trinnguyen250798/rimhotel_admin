export interface UserDetails {
    id: number;
    ulid: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    role_id: number;
    status: number;
    last_login_at: string | null;
    provider: string | null;
    provider_id: string | null;
    email_verified_at: string | null;
    address: string | null;
    district_id: string;
    province_id: string;
    country_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    role?: string;
}

export interface StaffDB {
    id: number;
    ulid: string;
    user_id: number;
    hotel_id: number;
    department_id: number;
    position_id: number;
    created_at: string;
    updated_at: string;
    // Các object lồng nhau
    user: UserDetails;
    department: Department;
    position: Position;
}

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
    data: StaffDB[];
    links: [] | null;
    meta: [] | null;
}

export interface StaffFormData {
    ulid: string | null;
    email: string;
    name: string;
    password: string | null;
    phone: string;
    department_id: number;
    position_id: number;
    country_id: string;
    province_id: string;
    district_id: string;
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
