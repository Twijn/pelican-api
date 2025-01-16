import PelicanAPI from "../index";

import {
    IServer,
    ServerContainer,
    ServerEditBuild,
    ServerEditDetails,
    ServerEditStartup,
    ServerFeatureLimits,
    ServerLimits, ServerTransferOptions
} from "server";
import {ServerDatabaseCreateOptions} from "serverdatabases";
import {ServerDatabase} from "./ServerDatabase";



export class Server {

    private api: PelicanAPI;

    private readonly _id: number;
    private readonly _uuid: string;
    private readonly _identifier: string;

    private _external_id: string | null;
    private _name: string;
    private _description: string | null;
    private _user: number;

    private _status: any;
    private _suspended: boolean;

    private _limits: ServerLimits;
    private _feature_limits: ServerFeatureLimits;

    private _node: number;
    private _allocation: string|number;
    private _egg: number;
    private _container: ServerContainer;

    private _updated_at: string;
    private _created_at: string;

    public get id() {return this._id;}
    public get uuid() {return this._uuid;}
    public get identifier() {return this._identifier;}

    public get external_id() {return this._external_id;}
    public get name() {return this._name;}
    public get description() {return this._description;}
    public get user() {return this._user;}

    public get status() {return this._status;}
    public get suspended() {return this._suspended;}

    public get limits() {return this._limits;}
    public get feature_limits() {return this._feature_limits;}

    public get node() {return this._node;}
    public get allocation() {return this._allocation;}
    public get egg() {return this._egg;}
    public get container() {return this._container;}

    public get updated_at() {return this._updated_at;}
    public get created_at() {return this._created_at;}

    constructor(options: IServer, api: PelicanAPI) {
        this.api = api;

        this._id = options.id;
        this._uuid = options.uuid;
        this._identifier = options.identifier;
        this._external_id = options.external_id;

        this._name = options.name;
        this._description = options.description;

        this._status = options.status;
        this._suspended = options.suspended;

        this._limits = options.limits;
        this._feature_limits = options.feature_limits;

        this._user = options.user;

        this._node = options.node;
        this._allocation = options.allocation;
        this._egg = options.egg;
        this._container = options.container;

        this._updated_at = options.updated_at;
        this._created_at = options.created_at;
    }

    updateDetails(options: Partial<ServerEditDetails>): Promise<Server> {
        const newOptions: ServerEditDetails = {
            ...{
                external_id: this._external_id ?? null,
                name: this._name,
                description: this._description,
                user: this._user,
            },
            ...options,
        };

        return new Promise((resolve, reject) => {
            this.api.application.servers.updateDetails(this._id, newOptions).then(server => {
                this._external_id = server.external_id;
                this._name = server.name;
                this._description = server.description;
                this._status = server.status;
                resolve(this);
            }, error => {
                reject(error);
            });
        });
    }

    updateBuild(options: Partial<ServerEditBuild>): Promise<Server> {
        const newOptions: ServerEditBuild = {
            ...{
                allocation: String(this._allocation),
                memory: this._limits.memory,
                swap: this._limits.swap,
                disk: this._limits.disk,
                io: this._limits.io,
                cpu: this._limits.cpu,
                threads: this._limits.threads ?? "",
                feature_limits: this._feature_limits,
            },
            ...options,
        };

        return new Promise((resolve, reject) => {
            this.api.application.servers.updateBuild(this._id, newOptions).then(server => {
                this._allocation = server.allocation;
                this._limits = server.limits;
                this._feature_limits = server.feature_limits;
                resolve(this);
            }, error => {
                reject(error);
            });
        });
    }

    updateStartup(options: Partial<ServerEditStartup>): Promise<Server> {
        const newOptions: ServerEditStartup = {
            ...{
                startup: this._container.startup_command,
                environment: this._container.environment,
                egg: this._egg,
                image: this._container.image,
                skip_scripts: false,
            },
            ...options,
        };

        return new Promise((resolve, reject) => {
            this.api.application.servers.updateStartup(this._id, newOptions).then(server => {
                this._container.startup_command = server.container.startup_command;
                this._container.environment = server.container.environment;
                this._egg = server.egg;
                this._container.image = server.container.image;
                resolve(this);
            }, error => {
                reject(error);
            });
        });
    }

    delete(force: boolean = false): Promise<void> {
        return this.api.application.servers.delete(this._id, force);
    }

    suspend(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.application.servers.suspend(this._id).then(() => {
                this._suspended = true;
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    unsuspend(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.application.servers.unsuspend(this._id).then(() => {
                this._suspended = false;
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    reinstall(): Promise<void> {
        return this.api.application.servers.reinstall(this._id);
    }

    startTransfer(options: ServerTransferOptions): Promise<void> {
        return this.api.application.servers.startTransfer(this._id, options);
    }

    stopTransfer(): Promise<void> {
        return this.api.application.servers.stopTransfer(this._id);
    }

    createDatabase(options: ServerDatabaseCreateOptions): Promise<ServerDatabase> {
        return this.api.application.servers.createDatabase(this._id, options);
    }

    getAllDatabases(): Promise<ServerDatabase[]> {
        return this.api.application.servers.getAllDatabases(this._id);
    }

    getDatabaseById(databaseId: string|number) {
        return this.api.application.servers.getDatabaseById(this._id, databaseId);
    }

}
