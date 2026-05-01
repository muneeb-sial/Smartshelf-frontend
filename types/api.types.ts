/* ==================== AUTH TYPES ==================== */

export interface UserBase {
    email: string;
    name: string;
    role?: string;
}

export interface UserCreate extends UserBase {
    password: string;
}

export interface UserOut {
    id: number;
    email: string;
    name: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface Token {
    access_token: string;
    token_type: string;
}

/* ==================== BOOK TYPES ==================== */

export interface BookBase {
    title: string;
    author?: string | null;
    file_name?: string | null;
    cover_img?: string | null;
    tags?: string[] | null;
}

export type BookCreate = BookBase;

export interface BookUpdate {
    title?: string | null;
    author?: string | null;
    file_name?: string | null;
    cover_img?: string | null;
    tags?: string[] | null;
}

export interface BookOut {
    id: number;
    user_id: number;
    title: string;
    author?: string | null;
    file_name?: string | null;
    cover_image_path?: string | null;
    tags?: string[] | null;
    ingestion_status: string;
    created_at: string;
    updated_at: string;
}

/* ==================== UPLOAD TYPES ==================== */

export interface UploadAcceptedResponse {
    book_id: number | null;
    file_name: string;
    content_type: string;
    ingestion_status: string;
    message: string;
}

export interface UploadRequest {
    file: File;
    title?: string | null;
    author?: string | null;
}

/* ==================== CHAT TYPES ==================== */

export interface SourceReference {
    chunk_id?: string | null;
    chunk_index?: number | null;
    excerpt?: string | null;
}

export interface ChatTurnRequest {
    message: string;
    thread_id?: string | null;
}

export interface ChatTurnResponse {
    thread_id?: string | null;
    message: string;
    sources: SourceReference[];
}

/* ==================== QA TYPES ==================== */

export interface BookQuestionRequest {
    question: string;
}

export interface BookQuestionResponse {
    answer: string;
    sources: SourceReference[];
    grounded: boolean;
}
