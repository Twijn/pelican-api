import PelicanAPI from "../index";

export default class ClientAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    public test(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call("/client/account").then(result => {
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
