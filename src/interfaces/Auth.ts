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


//se puede mejorar auth pq tanto login como register devuelven un token
//(me da weba hacerlo)