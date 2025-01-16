import PelicanAPI from "../index";
import ApplicationUserAPI from "./users";
import ApplicationNodeAPI from "./nodes";
import ApplicationServerAPI from "./servers";

export default class ApplicationAPI {

    private api: PelicanAPI;

    public nodes: ApplicationNodeAPI;
    public servers: ApplicationServerAPI;
    public users: ApplicationUserAPI;

    constructor(api: PelicanAPI) {
        this.api = api;

        this.nodes = new ApplicationNodeAPI(api);
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
