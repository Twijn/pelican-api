import PelicanAPI from "../index";
import {DatabaseHostEditOptions, IDatabaseHost} from "databasehosts";

export class DatabaseHost {

    private api: PelicanAPI;

    private readonly _id: number;
    private _name: string;
    private _host: string;
    private _port: number;

    private _updated_at: string;
    private readonly _created_at: string;

    public get id() {return this._id;}
    public get name() {return this._name;}
    public get host() {return this._host;}
    public get port() {return this._port;}

    public get updated_at() {return this._updated_at;}
    public get created_at() {return this._created_at;}

    constructor(options: IDatabaseHost, api: PelicanAPI) {
        this.api = api;

        this._id = options.id;
        this._name = options.name;
        this._host = options.host;
        this._port = options.port;

        this._updated_at = options.updated_at;
        this._created_at = options.created_at;
    }

    update(options: Partial<DatabaseHostEditOptions>): Promise<DatabaseHost> {
        const newOptions = {
            ...{},
            ...options,
        }

        return new Promise((resolve, reject) => {
            this.api.application.databaseHosts.update(this._id, newOptions).then(databaseHost => {
                this._name = databaseHost.name;
                this._host = databaseHost.host;
                this._port = databaseHost.port;
                this._updated_at = databaseHost.updated_at;
                resolve(this);
            }, error => {
                reject(error);
            });
        });
    }

    delete(): Promise<void> {
        return this.api.application.databaseHosts.delete(this._id);
    }

}
