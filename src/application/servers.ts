import PelicanAPI from "../index";
import {
    IServer,
    ServerCreateOptions,
    ServerEditBuild,
    ServerEditDetails,
    ServerEditStartup, ServerTransferOptions
} from "server";
import {Server} from "../models/Server";
import {ServerDatabase} from "../models/ServerDatabase";
import {IServerDatabase, ServerDatabaseCreateOptions} from "serverdatabases";

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

    getByExternalId(externalId: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/external/${encodeURIComponent(externalId)}`).then(result => {
                resolve(new Server(result.data.attributes as IServer, this.api));
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

    startTransfer(serverId: string|number, options: ServerTransferOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/transfer`, "POST", options).then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    stopTransfer(serverId: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/transfer/cancel`, "POST").then(() => {
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

    getAllDatabases(serverId: string|number): Promise<ServerDatabase[]> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/databases`).then(result => {
                const databases = result.data.map((x: any) => new ServerDatabase(x as IServerDatabase, this.api));
                resolve(databases);
            }, error => {
                reject(error);
            });
        });
    }

    getDatabaseById(serverId: string|number, databaseId: string|number): Promise<ServerDatabase> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/databases/${encodeURIComponent(databaseId)}`).then(result => {
                resolve(new ServerDatabase(result.data.attributes as IServerDatabase, this.api));
            }, error => {
                reject(error);
            });
        });
    }

    createDatabase(serverId: string|number, options: ServerDatabaseCreateOptions): Promise<ServerDatabase> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/databases`, "POST", options).then(result => {
                resolve(new ServerDatabase(result.data.attributes as IServerDatabase, this.api));
            }, error => {
                reject(error);
            });
        });
    }

    deleteDatabase(serverId: string|number, databaseId: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/databases/${encodeURIComponent(databaseId)}`, "DELETE").then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    resetDatabasePassword(serverId: string|number, databaseId: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${encodeURIComponent(serverId)}/databases/${encodeURIComponent(databaseId)}/reset-password`, "POST").then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

}