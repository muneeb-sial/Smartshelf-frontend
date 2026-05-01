import { api } from "@/config/axios-client.config";
import {
    UserCreate,
    UserOut,
    UserLogin,
    Token,
} from "@/types/api.types";

export const AuthService = {
    register: async (data: UserCreate): Promise<UserOut> => {
        const res = await api.post<UserOut>("/auth/register", data);
        return res.data;
    },

    login: async (data: UserLogin): Promise<Token> => {
        const res = await api.post<Token>("/auth/login", data);
        return res.data;
    },

    loginAdmin: async (data: UserLogin): Promise<Token> => {
        const res = await api.post<Token>("/auth/login-admin", data);
        return res.data;
    },

    getMe: async (): Promise<UserOut> => {
        const res = await api.get<UserOut>("/auth/me");
        return res.data;
    },
};
