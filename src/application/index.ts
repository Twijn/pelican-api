import PelicanAPI from "../index";
import ApplicationUserAPI from "./users";

export default class ApplicationAPI {

    private api: PelicanAPI;

    public users: ApplicationUserAPI;

    constructor(api: PelicanAPI) {
        this.api = api;

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
