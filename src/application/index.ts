import PelicanAPI from "../index";

import ApplicationDatabaseHostsAPI from "./databasehosts";
import ApplicationEggAPI from "./eggs";
import ApplicationNodeAPI from "./nodes";
import ApplicationRoleAPI from "./roles";
import ApplicationServerAPI from "./servers";
import ApplicationUserAPI from "./users";

export default class ApplicationAPI {

    private api: PelicanAPI;

    public databaseHosts: ApplicationDatabaseHostsAPI;
    public eggs: ApplicationEggAPI;
    public nodes: ApplicationNodeAPI;
    public roles: ApplicationRoleAPI;
    public servers: ApplicationServerAPI;
    public users: ApplicationUserAPI;

    constructor(api: PelicanAPI) {
        this.api = api;

        this.databaseHosts = new ApplicationDatabaseHostsAPI(api);
        this.eggs = new ApplicationEggAPI(api);
        this.nodes = new ApplicationNodeAPI(api);
        this.roles = new ApplicationRoleAPI(api);
        this.servers = new ApplicationServerAPI(api);
        this.users = new ApplicationUserAPI(api);
    }

    public test(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/servers").then(result => {
                if (result.status === 200) {
                    return resolve();
                }

                reject(`Failed with status code ${result.status}`);
            }, error => {
                reject(error);
            });
        });
    }

}
