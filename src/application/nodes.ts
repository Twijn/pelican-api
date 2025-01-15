import PelicanAPI from "../index";

import {Node, NodeConfiguration, NodeCreateOptions, NodeEditOptions} from "nodes";

export default class ApplicationNodeAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<Node[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/nodes").then(result => {
                const nodes: Node[] = result.data.map((x: any) => x.attributes as Node);
                resolve(nodes);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<Node> {
        return new Promise((resolve, reject) => {
           this.api.call(`/application/nodes/${id}`).then(result => {
               const node = result.data.attributes as Node;
               resolve(node);
           }, error => {
               reject(error);
           });
        });
    }

    getConfiguration(id: string|number): Promise<NodeConfiguration> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${id}/configuration`).then(result => {
                const nodeConfiguration = result.data as NodeConfiguration;
                resolve(nodeConfiguration);
            }, error => {
                reject(error);
            });
        });
    }

    create(options: NodeCreateOptions): Promise<Node> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/nodes", "POST", options).then(result => {
                const node = result.data.attributes as Node;
                resolve(node);
            }, error => {
                reject(error);
            })
        });
    }

    update(id: string|number, options: NodeEditOptions): Promise<Node> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${id}`, "PATCH", options).then(result => {
                const node = result.data.attributes as Node;
                resolve(node);
            }, error => {
                reject(error);
            });
        });
    }

    delete(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${id}`, "DELETE").then(result => {
                resolve();
            }, error => {
                reject(error);
            })
        });
    }

}
