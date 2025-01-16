export interface ServerCreateLimits {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads?: string;
}

export interface ServerLimits extends ServerCreateLimits {
    oom_disabled?: boolean;
    oom_killer?: boolean;
}

export interface ServerFeatureLimits {
    databases: number;
    allocations: number;
    backups: number;
}

export interface ServerContainer {
    startup_command: string;
    image: string;
    installed: number;
    environment: any;
}

export interface IServer {
    id: number;
    external_id: string|null;
    uuid: string;
    identifier: string;
    name: string;
    description: string|null;
    status: any; // TODO: Add actual status?
    suspended: boolean;
    limits: ServerLimits;
    feature_limits: ServerFeatureLimits;
    user: number;
    node: number;
    allocation: number;
    egg: number;
    container: ServerContainer;
    updated_at: string;
    created_at: string;
}

export interface ServerAllocation {
    default: string;
    additional?: string[];
}

export interface ServerDeploy {
    tags?: string[];
    locations: string[];
    dedicated_ip: string;
    port_range: string[];
}

export interface ServerCreateOptions {
    external_id?: string;
    name: string;
    description?: string|null;
    user: number;
    egg: number;
    docker_image?: string;
    startup?: string;
    environment: any;
    skip_scripts?: boolean;
    oom_killer?: boolean;
    start_on_creation?: boolean;
    limits: ServerCreateLimits;
    feature_limits: ServerFeatureLimits;
    allocation?: ServerAllocation;
    deploy?: ServerDeploy;
}

export interface ServerEditDetails {
    external_id?: string|null;
    name: string;
    description?: string|null;
    user: number;
}

export interface ServerEditBuild {
    allocation: string;
    memory: number;
    swap: number;
    io: number;
    cpu: number;
    disk: number;
    threads: string;
    feature_limits?: ServerFeatureLimits;
}

export interface ServerEditStartup {
    startup?: string;
    environment: any;
    egg: string|number;
    image?: string;
    skip_scripts: boolean;
}

export interface ServerTransferOptions {
    node_id: number;
    allocation_id: number;
    allocation_additional: string|null;
}
