export interface IDatabaseHost {
    id: number;
    name: string;
    host: string;
    port: number;
    updated_at: string;
    created_at: string;
}

export interface DatabaseHostCreateOptions {
    name: string;
    host: string;
    port: number;
    username: string;
    password?: string|null;
    node_ids?: number[]|null;
}

export interface DatabaseHostEditOptions {
    name?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string|null;
    node_ids?: number[]|null;
}
