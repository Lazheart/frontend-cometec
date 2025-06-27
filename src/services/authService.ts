import api from './api';
import type {LoginPayload, LoginResponse, RegisterPayload, RegisterResponse} from '../interfaces/Auth';
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

    // Si quieres login automático después del registro, descomenta lo siguiente:
    /*
    const { token } = response.data;
    if (token) {
      setToken(token);
    }
    */

    return response.data;
};