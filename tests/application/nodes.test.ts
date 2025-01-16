import PelicanAPI from "../../src";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

import { Node } from "../../src/models/Node";

const api = new PelicanAPI(process.env.URL, process.env.API_KEY);

let createdNode: Node;

describe("test node endpoints", () => {

    beforeAll(async () => {
        createdNode = await api.application.nodes.create({
            public: false,
            maintenance_mode: true,
            cpu: 0,
            cpu_overallocate: 0,
            memory: 0,
            memory_overallocate: 0,
            disk: 0,
            disk_overallocate: 0,
            upload_size: 256,
            daemon_base: "/var/lib/pelican/volumes",
            daemon_listen: 8443,
            daemon_sftp: 2022,
            fqdn: "pelican.example.com",
            daemon_sftp_alias: "alias.pelican.example.com",
            name: "test-node",
            scheme: "https",
        });

        console.log(`Created node ${createdNode.id}`);
    });

    test("check if created server exists", () => {
        expect(createdNode).toHaveProperty("id");
        expect(createdNode.name).toBe("test-node");
    });

    test("get all nodes", async () => {
        await expect(api.application.nodes.getAll()).resolves.toBeDefined();
    });

    test("get node with id = 1", async () => {
        await expect(api.application.nodes.getById(1)).resolves.toHaveProperty("id", 1);
    });

    test("get node configuration of created node", async () => {
        await expect(createdNode.getConfiguration()).resolves.toHaveProperty("uuid");
    });

    // test("update created node", async () => {
    //     await expect(createdNode.update({
    //         name: "new-name",
    //     })).resolves.toHaveProperty("name", "new-name");
    // });

    afterAll(async () => {
        await api.application.nodes.delete(createdNode.id);
    });

});
