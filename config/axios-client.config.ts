"use client";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { readAuthToken } from "@/lib/auth";
import { SERVER_URL } from "@/env";

const DEBUG_MODE = true;
const SHOW_ERROR_ONLY = true;
function createHttpClient(): AxiosInstance {
    const baseURL = SERVER_URL;
    
    const client = axios.create({
        baseURL,
        timeout: 30_000,
        withCredentials: false,
    });

    /* -------------------- REQUEST -------------------- */
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Add auth token if available
            const token = readAuthToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Handle FormData for file uploads
            if (config.data instanceof FormData) {
                // Remove Content-Type header to let axios set it with boundary
                delete config.headers["Content-Type"];
            } else if (config.data && !(config.data instanceof FormData)) {
                // Set JSON content type for non-FormData requests
                config.headers["Content-Type"] = "application/json";
            }

            if (DEBUG_MODE) {
                console.log("[HTTP → REQUEST]", {
                    method: config.method,
                    url: config.url,
                    headers: config.headers,
                    params: config.params,
                    data: config.data instanceof FormData ? "[FormData]" : config.data,
                });
            }
            return config;
        },
        (error: AxiosError) => {
            if (DEBUG_MODE) {
                console.error("[HTTP → REQUEST ERROR]", error);
            }
            return Promise.reject(error);
        }
    );

    /* -------------------- RESPONSE -------------------- */
    client.interceptors.response.use(
        (response: AxiosResponse) => {
            if (DEBUG_MODE && !SHOW_ERROR_ONLY) {
                console.log("[HTTP ← RESPONSE]", {
                    url: response.config.url,
                    status: response.status,
                    headers: response.headers,
                    data: response.data,
                });
            }
            return response;
        },
        (error: AxiosError<{ detail?: string | string[] }>) => {
            if (DEBUG_MODE) {
                const errorMessage = error.response?.data?.detail;
                if (Array.isArray(errorMessage)) {
                    toast.error(errorMessage[0] || "Something went wrong");
                } else {
                    toast.error(errorMessage || error.message || "Something went wrong");
                }
                console.error("[HTTP ← RESPONSE ERROR]", {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    url: error.config?.url,
                    response: error.response?.data,
                });
            }

            // normalize error shape
            return Promise.reject({
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                isAxiosError: true,
            });
        }
    );

    return client;
}

export const api = createHttpClient();
