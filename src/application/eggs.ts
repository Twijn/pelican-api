import PelicanAPI from "../index";
import {Egg} from "eggs";

export default class ApplicationEggAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<Egg[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/eggs").then(result => {
                const eggs: Egg[] = result.data.map((x: any) => x.attributes as Egg);
                resolve(eggs);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<Egg> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/eggs/${encodeURIComponent(id)}`).then(result => {
                const egg: Egg = result.data.attributes as Egg;
                resolve(egg);
            }, error => {
                reject(error);
            });
        });
    }

}
