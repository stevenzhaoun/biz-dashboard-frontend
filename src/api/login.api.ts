import client from "./client";

interface LoginResponse {
    user: {
        id: number;
        email: string;
        name: string;
        role: number;
        token:  string
    }
}

export const loginApi = async (email: string, password: string) => {
    const resp = await client.post('/auth/login', {
        email,
        password
    });
    return resp.data as LoginResponse;
}