"use client";
import { api } from "@/config/axios-client.config";
import {
    BookCreate,
    BookUpdate,
    BookOut,
} from "@/types/api.types";

export const BookService = {
    list: async (): Promise<BookOut[]> => {
        const res = await api.get<BookOut[]>("/books/");
        return res.data;
    },
};
