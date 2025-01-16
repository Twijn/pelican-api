import {IAllocation} from "nodes";
import PelicanAPI from "../index";

export class Allocation implements IAllocation {
    private api: PelicanAPI;
    private nodeId: string|number;

    public readonly id: number;
    public readonly ip: string;
    public readonly alias: string|null;
    public readonly port: number;
    public readonly notes: string;
    public readonly assigned: boolean;

    constructor(options: IAllocation, nodeId: string|number, api: PelicanAPI) {
        this.api = api;
        this.nodeId = nodeId;

        this.id = options.id;
        this.ip = options.ip;
        this.alias = options.alias;
        this.port = options.port;
        this.notes = options.notes;
        this.assigned = options.assigned;
    }

    delete(): Promise<void> {
        return this.api.application.nodes.deleteAllocation(this.nodeId, this.id);
    }

}
