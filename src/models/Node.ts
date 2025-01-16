import {Scheme} from "types";
import {AllocatedResources, INode, NodeConfiguration, NodeEditOptions} from "nodes";
import PelicanAPI from "../index";

export class Node {
    private api: PelicanAPI;

    private readonly _id: number;
    private readonly _uuid: string;

    private _public: boolean;
    private _name: string;
    private _description?: string|null;
    private _fqdn: string;

    private _scheme: Scheme;
    private _behind_proxy: boolean;
    private _maintenance_mode: boolean;

    private _memory: number;
    private _memory_overallocate: number;
    private _disk: number;
    private _disk_overallocate: number;
    private _cpu: number;
    private _cpu_overallocate: number;
    private _upload_size: number;

    private _daemon_listen: number;
    private _daemon_sftp: number;
    private _daemon_sftp_alias: string|null;
    private _daemon_base: string;

    private _created_at: string;
    private _updated_at: string;

    private _tags: string[]|null;
    private _allocated_resources: AllocatedResources;

    public get id() {return this._id;}
    public get uuid() {return this._uuid;}
    public get public() {return this._public;}
    public get name() {return this._name;}
    public get description() {return this._description;}
    public get fqdn() {return this._fqdn;}
    public get scheme() {return this._scheme;}
    public get behind_proxy() {return this._behind_proxy;}
    public get maintenance_mode() {return this._maintenance_mode;}
    public get memory() {return this._memory;}
    public get memory_overallocate() {return this._memory_overallocate;}
    public get disk() {return this._disk;}
    public get disk_overallocate() {return this._disk_overallocate;}
    public get cpu() {return this._cpu;}
    public get cpu_overallocate() {return this._cpu_overallocate;}
    public get upload_size() {return this._upload_size;}
    public get daemon_listen() {return this._daemon_listen;}
    public get daemon_sftp() {return this._daemon_sftp;}
    public get daemon_sftp_alias() {return this._daemon_sftp_alias;}
    public get daemon_base() {return this._daemon_base;}
    public get created_at() {return this._created_at;}
    public get updated_at() {return this._updated_at;}
    public get tags() {return this._tags;}
    public get allocated_resources() {return this._allocated_resources;}

    constructor(options: INode, api: PelicanAPI) {
        this.api = api;

        this._id = options.id;
        this._uuid = options.uuid;
        this._public = options.public;
        this._name = options.name;
        this._description = options.description;
        this._fqdn = options.fqdn;
        this._scheme = options.scheme;
        this._behind_proxy = options.behind_proxy;
        this._maintenance_mode = options.maintenance_mode;
        this._memory = options.memory;
        this._memory_overallocate = options.memory_overallocate;
        this._disk = options.disk;
        this._disk_overallocate = options.disk_overallocate;
        this._cpu = options.cpu;
        this._cpu_overallocate = options.cpu_overallocate;
        this._upload_size = options.upload_size;

        this._daemon_listen = options.daemon_listen;
        this._daemon_sftp = options.daemon_sftp;
        this._daemon_sftp_alias = options.daemon_sftp_alias;
        this._daemon_base = options.daemon_base;

        this._created_at = options.created_at;
        this._updated_at = options.updated_at;

        this._tags = options.tags;
        this._allocated_resources = options.allocated_resources;
    }

    getConfiguration(): Promise<NodeConfiguration> {
        return this.api.application.nodes.getConfiguration(this._id);
    }

    update(options: Partial<NodeEditOptions>): Promise<Node> {
        const newOptions: NodeEditOptions = {
            ...{
                name: this._name,
                description: this._description,
                public: this._public,
                fqdn: this._fqdn,
                scheme: this._scheme,
                behind_proxy: this._behind_proxy,
                maintenance_mode: this._maintenance_mode,
                memory: this._memory,
                memory_overallocate: this._memory_overallocate,
                disk: this._disk,
                disk_overallocate: this._disk_overallocate,
                cpu: this._cpu,
                cpu_overallocate: this._cpu_overallocate,
                daemon_base: this._daemon_base,
                upload_size: this._upload_size,
                daemon_listen: this._daemon_listen,
                daemon_sftp: this._daemon_sftp,
                daemon_sftp_alias: this._daemon_sftp_alias,
                tags: this._tags,
            },
            ...options,
        }

        return new Promise((resolve, reject) => {
            this.api.application.nodes.update(this._id, newOptions).then(node => {
                this._name = node.name;
                this._description = node.description;
                this._fqdn = node.fqdn;
                this._scheme = node.scheme;
                this._behind_proxy = node.behind_proxy;
                this._maintenance_mode = node.maintenance_mode;
                this._memory = node.memory;
                this._memory_overallocate = node.memory_overallocate;
                this._disk = node.disk;
                this._disk_overallocate = node.disk_overallocate;
                this._cpu = node.cpu;
                this._cpu_overallocate = node.cpu_overallocate;
                this._daemon_base = node.daemon_base;
                this._upload_size = node.upload_size;
                this._daemon_listen = node.daemon_listen;
                this._daemon_sftp = node.daemon_sftp;
                this._daemon_sftp_alias = node.daemon_sftp_alias;
                this._tags = node.tags;
                resolve(this);
            }, error => {
                reject(error);
            });
        });
    }

    addTags(tags: string[]): Promise<Node> {
        tags = [
            ...this?._tags ?? [],
            ...tags
        ];

        return this.update({ tags });
    }

    removeTags(tags: string[]): Promise<Node> {
        tags = (this._tags ?? []).filter(x => !tags.includes(x));

        return this.update({ tags });
    }

    setPublic(value: boolean): Promise<Node> {
        return this.update({ public: value });
    }

    setMaintenanceMode(value: boolean): Promise<Node> {
        return this.update({ maintenance_mode: value });
    }

    delete(): Promise<void> {
        return this.api.application.nodes.delete(this._id);
    }
}
