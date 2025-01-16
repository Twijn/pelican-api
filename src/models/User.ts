import {Language} from "types";
import {IUser, UserEditOptions} from "users";
import PelicanAPI from "../index";

export class User {
    private api: PelicanAPI;

    private readonly _id: number;
    private _external_id: string|null;
    private readonly _uuid: string|null;

    private _username: string;
    private _email: string;
    private _language: Language;

    private _root_admin: boolean;
    private _2fa: boolean;
    private _2fa_enabled: boolean;

    private _created_at: string;
    private _updated_at: string;

    public get id() {return this._id;}
    public get external_id() {return this._external_id;}
    public get uuid() {return this._uuid;}

    public get username() {return this._username;}
    public get email() {return this._email;}
    public get language() {return this._language;}

    public get root_admin() {return this._root_admin;}
    public get "2fa"() {return this._2fa;}
    public get "2fa_enabled"() {return this._2fa_enabled}

    public get created_at() {return this._created_at;}
    public get updated_at() {return this._updated_at;}

    public constructor(options: IUser, api: PelicanAPI) {
        this.api = api;

        this._id = options.id;
        this._external_id = options.external_id;
        this._uuid = options.uuid;

        this._username = options.username;
        this._email = options.email;
        this._language = options.language;

        this._root_admin = options.root_admin;
        this._2fa = options["2fa"];
        this._2fa_enabled = options["2fa_enabled"];

        this._created_at = options.created_at;
        this._updated_at = options.updated_at;
    }

    update(options: Partial<UserEditOptions>): Promise<User> {
        const newOptions: UserEditOptions = {
            ...{
                email: this._email,
                username: this._username,
            },
            ...options,
        };

        return new Promise((resolve, reject) => {
            this.api.application.users.update(this._id, newOptions).then(user => {
                this._email = user.email;
                this._external_id = user.external_id;
                this._username = user.username;
                this._language = user.language;
                console.log(user);
                resolve(this);
            }, error => {
                reject(error);
            })
        });
    }

    delete(): Promise<void> {
        return this.api.application.users.delete(this._id);
    }

}
