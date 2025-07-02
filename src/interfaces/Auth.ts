export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}


export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    lastname: string;
    phone: string;
    role: "USER";
}

export interface RegisterResponse {
    token: string;
}

export interface RecoveryPayload {
    email: string;
    name: string;
    lastname: string;
    phone: string;
}


export interface RecoveryResponse {
    message: string;
}

export interface UserSecurityUpdatePayload {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    code: string;
    newPassword: string;
}

export interface UserSecurityUpdateResponse {
    message: string;
}
