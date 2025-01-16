import PelicanAPI from "../index";

import {DatabaseHost} from "../models/DatabaseHost";
import {DatabaseHostCreateOptions, DatabaseHostEditOptions, IDatabaseHost} from "databasehosts";

export default class ApplicationDatabaseHostsAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<DatabaseHost[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/database-hosts").then(result => {
                const databaseHosts: DatabaseHost[] = result.data.map((x: any) => new DatabaseHost(x.attributes as IDatabaseHost, this.api));
                resolve(databaseHosts);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<DatabaseHost> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/database-hosts/${encodeURIComponent(id)}`).then(result => {
                const databaseHost: DatabaseHost = new DatabaseHost(result.data.attributes as IDatabaseHost, this.api);
                resolve(databaseHost);
            }, error => {
                reject(error);
            });
        });
    }

    create(options: DatabaseHostCreateOptions): Promise<DatabaseHost> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/database-hosts", "POST", options).then(result => {
                const databaseHost: DatabaseHost = new DatabaseHost(result.data.attributes as IDatabaseHost, this.api);
                resolve(databaseHost);
            }, error => {
                reject(error);
            });
        });
    }

    update(id: string|number, options: DatabaseHostEditOptions): Promise<IDatabaseHost> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/database-hosts/${encodeURIComponent(id)}`, "PATCH", options).then(result => {
                resolve(result.data.attributes as IDatabaseHost);
            }, error => {
                reject(error);
            });
        });
    }

    delete(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/database-hosts/${encodeURIComponent(id)}`, "DELETE").then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

}
