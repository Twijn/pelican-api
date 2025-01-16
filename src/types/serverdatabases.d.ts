export interface IServerDatabase {
    id: number;
    server: number;
    host: number;
    database: string;
    username: string;
    remote: string;
    max_connections: number;
    created_at: string;
    updated_at: string;
}

export interface ServerDatabaseCreateOptions {
    database: string;
    remote: string;
    host: number;
}
