import PelicanAPI from "../index";

import {User, UserCreateOptions, UserEditOptions} from "users";

export default class ApplicationUserAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/users").then(result => {
                const users: User[] = result.data.map((user: any) => user.attributes as User);
                resolve(users);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${encodeURIComponent(id)}`).then(result => {
                resolve(result.data.attributes as User);
            }, error => {
                reject(error);
            });
        });
    }

    getByExternalId(externalId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/external/${encodeURIComponent(externalId)}`).then(result => {
                resolve(result.data.attributes as User);
            }, error => {
                reject(error);
            });
        });
    }

    create(options: UserCreateOptions): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/users", "POST", options).then(result => {
                resolve(result.data.attributes as User);
            }, error => {
                reject(error);
            });
        });
    }

    update(id: string|number, options: UserEditOptions): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${encodeURIComponent(id)}`, "PATCH", options).then(result => {
                resolve(result.data.attributes as User);
            }, error => {
                reject(error);
            });
        });
    }

    delete(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${id}`, "DELETE").then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

}
