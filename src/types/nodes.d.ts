import {Scheme} from "types";

export interface AllocatedResources {
    memory: number;
    disk: number;
    cpu: number;
}

export interface Node {
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description: string|null;
    fqdn: string;
    scheme: "http"|"https";
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    cpu: number;
    cpu_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_sftp_alias: string|null;
    daemon_base: string;
    created_at: string;
    updated_at: string;
    tags: string[]|null;
    allocated_resources: AllocatedResources;
}

export interface NodeAPISSLConfiguration {
    enabled: boolean;
    cert: string;
    key: string;
}

export interface NodeAPIConfiguration {
    host: string;
    port: number;
    ssl: NodeAPISSLConfiguration;
    upload_limit: number;
}

export interface NodeSystemSFTPConfiguration {
    bind_port: number;
}

export interface NodeSystemConfiguration {
    data: string;
    sftp: NodeSystemSFTPConfiguration;
}

export interface NodeConfiguration {
    debug: boolean;
    uuid: string;
    token_id: string;
    token: string;
    api: NodeAPIConfiguration;
    system: NodeSystemConfiguration;
    allowed_mounts: any[]; // TODO: Define mount type.
    remote: string;
}

export interface NodeCreateOptions {
    name: string;
    description?: string;
    public?: boolean;
    fqdn: string;
    scheme: "http"|"https";
    behind_proxy?: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    cpu: number;
    cpu_overallocate: number;
    daemon_base: string;
    daemon_sftp: number;
    daemon_sftp_alias?: string;
    daemon_listen: number;
    maintenance_mode?: boolean;
    upload_size: number;
}

export interface NodeEditOptions {
    name: string;
    description?: string;
    public?: boolean;
    fqdn: string;
    scheme: Scheme;
    behind_proxy?: boolean;
    maintenance_mode?: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    cpu: number;
    cpu_overallocate: number;
    daemon_base?: string;
    upload_size?: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_sftp_alias?: string;
    tags?: string[];
}
