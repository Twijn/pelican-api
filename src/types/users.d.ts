export interface User {
    id: number;
    external_id: string|null;
    uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    root_admin: boolean;
    "2fa": boolean;
    created_at: string;
    updated_at: string;
}

export interface UserCreateOptions {
    external_id?: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password?: string;
}

export interface UserEditOptions {
    external_id?: string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    language?: string;
}
