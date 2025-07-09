import api from './api';
import type {LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, RecoveryPayload, RecoveryResponse, UserSecurityUpdatePayload, UserSecurityUpdateResponse} from '../interfaces/Auth';
import { setToken } from '../utils/token';

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);

    const { token } = response.data;

    if (token) {
        setToken(token);
    }

    return response.data;
};

export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", {
        ...data,
        role: "USER"
    });
    return response.data;
};

export const recovery = async (data: RecoveryPayload): Promise<RecoveryResponse> => {
    const response = await api.post<RecoveryResponse>("/auth/recovery", data);
    return response.data;
};

export const updateUserSecurity = async (data: UserSecurityUpdatePayload): Promise<UserSecurityUpdateResponse> => {
    const response = await api.patch<UserSecurityUpdateResponse>("/user/security/me", data);
    return response.data;
};

export const verifyRecoveryCode = async (email: string, code: string): Promise<RecoveryResponse> => {
    const response = await api.post<RecoveryResponse>(`/auth/verify-recovery-code?email=${encodeURIComponent(email)}`, { code });
    return response.data;
};

export const resetPassword = async (email: string, code: string, newPassword: string): Promise<RecoveryResponse> => {
    const response = await api.post<RecoveryResponse>(`/auth/reset-password?email=${encodeURIComponent(email)}`, { code, newPassword });
    return response.data;
};
