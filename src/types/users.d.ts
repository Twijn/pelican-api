import {Language, Timezone} from "types";

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
    "2fa_enabled": boolean;
    created_at: string;
    updated_at: string;
}

export interface UserCreateOptions {
    email: string;
    external_id?: string;
    username: string;
    password?: string;
    language?: Language;
    timezone?: Timezone;
}

export interface UserEditOptions {
    email?: string;
    external_id?: string;
    username?: string;
    password?: string;
    language?: Language;
    timezone?: Timezone;
}
