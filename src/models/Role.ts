import {IRole, RoleEditOptions} from "roles";
import PelicanAPI from "../index";

export class Role {

    private api: PelicanAPI;

    private readonly _id: number;
    private _name: string;

    private readonly _created_at: string;
    private _updated_at: string;

    public get id() {return this._id;}
    public get name() {return this._name;}

    public get created_at() {return this._created_at;}
    public get updated_at() {return this._updated_at;}

    constructor(options: IRole, api: PelicanAPI) {
        this.api = api;

        this._id = options.id;
        this._name = options.name;

        this._created_at = options.created_at;
        this._updated_at = options.updated_at;
    }

    update(options: RoleEditOptions): Promise<Role> {
        return new Promise((resolve, reject) => {
            this.api.application.roles.update(this._id, options).then(role => {
                this._name = role.name;
                this._updated_at = role.updated_at;
                resolve(this);
            }, error => {
                reject(error);
            });
        });
    }

    delete(): Promise<void> {
        return this.api.application.roles.delete(this._id);
    }

}
