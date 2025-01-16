import PelicanAPI from "../index";
import {
    IServer,
    ServerCreateOptions,
    ServerEditBuild,
    ServerEditDetails,
    ServerEditStartup
} from "server";
import {Server} from "../models/Server";

export default class ApplicationServerAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<Server[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/servers").then(result => {
                const servers = result.data.map((x: any) => new Server(x.attributes as IServer, this.api));
                resolve(servers);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}`).then(result => {
                const server = new Server(result.data.attributes as IServer, this.api);
                resolve(server);
            }, error => {
                reject(error);
            });
        });
    }

    create(options: ServerCreateOptions): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers`, "POST", options).then(result => {
                const server = new Server(result.data.attributes as IServer, this.api);
                resolve(server);
            }, error => {
                reject(error);
            });
        });
    }

    updateDetails(id: string|number, options: ServerEditDetails): Promise<IServer> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}/details`, "PATCH", options).then(result => {
                const server = result.data.attributes as IServer;
                resolve(server);
            }, error => {
                reject(error);
            });
        });
    }

    updateBuild(id: string|number, options: ServerEditBuild): Promise<IServer> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}/build`, "PATCH", options).then(result => {
                const server = result.data.attributes as IServer;
                resolve(server);
            }, error => {
                reject(error);
            });
        });
    }

    updateStartup(id: string|number, options: ServerEditStartup): Promise<IServer> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}/startup`, "PATCH", options).then(result => {
                const server = result.data.attributes as IServer;
                resolve(server);
            }, error => {
                reject(error);
            });
        });
    }

    suspend(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}/suspend`, "POST").then(result => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    unsuspend(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}/unsuspend`, "POST").then(result => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    reinstall(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}/reinstall`, "POST").then(result => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    delete(id: string|number, force: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(id)}${force ? "/force" : ""}`, "DELETE").then(result => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

}