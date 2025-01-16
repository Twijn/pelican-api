export interface IRole {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface RoleCreateOptions {
    name: string;
}

export interface RoleEditOptions {
    name: string;
}
