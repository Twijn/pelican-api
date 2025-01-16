import PelicanAPI from "../index";

import {Node} from "../models/Node";
import {Allocation} from "../models/Allocation";
import {
    AllocationCreateOptions,
    IAllocation,
    INode,
    NodeConfiguration,
    NodeCreateOptions,
    NodeEditOptions
} from "nodes";

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

    createAllocation(nodeId: string|number, options: AllocationCreateOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(nodeId)}/allocations`, "POST", options).then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

    getAllocations(nodeId: string|number): Promise<Allocation[]> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(nodeId)}/allocations`).then(result => {
                const allocations = result.data.map((x: any) => new Allocation(x.attributes as IAllocation, nodeId, this.api));
                resolve(allocations);
            }, error => {
                reject(error);
            });
        });
    }

    getAllocation(nodeId: string|number, allocationId: string|number): Promise<Allocation> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(nodeId)}/allocations/${encodeURIComponent(allocationId)}`).then(result => {
                const allocations = new Allocation(result.data.attributes as IAllocation, nodeId, this.api);
                resolve(allocations);
            }, error => {
                reject(error);
            });
        });
    }

    deleteAllocation(nodeId: string|number, allocationId: string|number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${encodeURIComponent(nodeId)}/allocations/${encodeURIComponent(allocationId)}`, "DELETE").then(result => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    }

}
