import PelicanAPI from "../index";

import {Role} from "../models/Role";
import {IRole, RoleCreateOptions, RoleEditOptions} from "roles";

export default class ApplicationRoleAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<Role[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/roles").then(result => {
                const roles = result.data.map((x: any) => new Role(x.attributes as IRole, this.api));
                resolve(roles);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<Role> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/roles/${id}`).then(result => {
                const role = new Role(result.data.attributes as IRole, this.api);
                resolve(role);
            }, error => {
                reject(error);
            });
        });
    }

    create(options: RoleCreateOptions): Promise<Role> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/roles`, "POST", options).then(result => {
                const role = new Role(result.data.attributes as IRole, this.api);
                resolve(role);
            }, error => {
                reject(error);
            });
        });
    }

    update(id: string|number, options: RoleEditOptions): Promise<IRole> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/roles/${encodeURIComponent(id)}`, "PATCH", options).then(result => {
                const role = new Role(result.data.attributes as IRole, this.api);
                resolve(role);
            }, error => {
                reject(error);
            });
        });
    }

    delete(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/roles/${encodeURIComponent(id)}`, "DELETE").then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

}
