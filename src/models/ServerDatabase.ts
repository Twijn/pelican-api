import {IServerDatabase} from "serverdatabases";
import PelicanAPI from "../index";
import {Server} from "./Server";
import {DatabaseHost} from "./DatabaseHost";

export class ServerDatabase {

    private readonly api: PelicanAPI;

    private readonly _id: number;
    private readonly _server: number;
    private readonly _host: number;
    
    private readonly _database: string;
    private readonly _username: string;
    private readonly _remote: string;
    private readonly _max_connections: number;

    private readonly _updated_at: string;
    private readonly _created_at: string;
    
    public get id() {return this._id;}
    public get server() {return this._server;}
    public get host() {return this._host;}

    public get database() {return this._database;}
    public get username() {return this._username;}
    public get remote() {return this._remote;}
    public get max_connections() {return this._max_connections;}

    public get created_at() {return this._created_at;}
    public get updated_at() {return this._updated_at;}

    constructor(options: IServerDatabase, api: PelicanAPI) {
        this.api = api;

        this._id = options.id;
        this._server = options.server;
        this._host = options.host;

        this._database = options.database;
        this._username = options.username;
        this._remote = options.remote;
        this._max_connections = options.max_connections;

        this._updated_at = options.updated_at;
        this._created_at = options.created_at;
    }

    getServer(): Promise<Server> {
        return this.api.application.servers.getById(this._server);
    }

    getHost(): Promise<DatabaseHost> {
        return this.api.application.databaseHosts.getById(this._host);
    }

    delete(): Promise<void> {
        return this.api.application.servers.deleteDatabase(this._server, this._id);
    }

    resetPassword(): Promise<void> {
        return this.api.application.servers.resetDatabasePassword(this._server, this._id);
    }

}
