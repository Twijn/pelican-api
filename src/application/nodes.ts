import PelicanAPI from "../index";

import {Node} from "../models/Node";
import {INode, NodeConfiguration, NodeCreateOptions, NodeEditOptions} from "nodes";

export default class ApplicationNodeAPI {

    private api: PelicanAPI;

    constructor(api: PelicanAPI) {
        this.api = api;
    }

    getAll(): Promise<Node[]> {
        return new Promise((resolve, reject) => {
            this.api.call("/application/nodes").then(result => {
                const nodes: Node[] = result.data.map((x: any) => new Node(x.attributes as INode, this.api));
                resolve(nodes);
            }, error => {
                reject(error);
            });
        });
    }

    getById(id: string|number): Promise<Node> {
        return new Promise((resolve, reject) => {
           this.api.call(`/application/nodes/${encodeURIComponent(id)}`).then(result => {
               const node = new Node(result.data.attributes as INode, this.api);
               resolve(node);
           }, error => {
               reject(error);
           });
        });
    }

    getConfiguration(id: string|number): Promise<NodeConfiguration> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(id)}/configuration`).then(result => {
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
                const node = new Node(result.data.attributes as INode, this.api);
                resolve(node);
            }, error => {
                reject(error);
            })
        });
    }

    update(id: string|number, options: NodeEditOptions): Promise<INode> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(id)}`, "PATCH", options).then(result => {
                const node = result.data.attributes as INode;
                resolve(node);
            }, error => {
                reject(error);
            });
        });
    }

    delete(id: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(id)}`, "DELETE").then(result => {
                resolve();
            }, error => {
                reject(error);
            })
        });
    }

}
