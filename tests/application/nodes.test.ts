import PelicanAPI from "../../src";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

import { Node } from "../../src/types/nodes";

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

    test("get all nodes", async () => {
        await expect(api.application.nodes.getAll()).resolves.toBeDefined();
    });

    test("get node with id = 1", async () => {
        await expect(api.application.nodes.getById(1)).resolves.toHaveProperty("id", 1);
    });

    test("get node configuration of id = 1", async () => {
        await expect(api.application.nodes.getConfiguration(1)).resolves.toHaveProperty("uuid");
    });

    // test("update created node", async () => {
    //     await expect(api.application.nodes.update(createdNode.id, {
    //         public: true,
    //         maintenance_mode: false,
    //         cpu: 100,
    //         cpu_overallocate: 0,
    //         memory: 1024,
    //         memory_overallocate: 0,
    //         disk: 2048,
    //         disk_overallocate: 0,
    //         upload_size: 512,
    //         daemon_base: "/var/lib/pelican/new-volumes",
    //         daemon_listen: 8080,
    //         daemon_sftp: 2122,
    //         fqdn: "newpelican.example.com",
    //         daemon_sftp_alias: "alias.newpelican.example.com",
    //         name: "new-name",
    //         scheme: "https"
    //     })).resolves.toHaveProperty("name", "new-name");
    // });

    afterAll(async () => {
        await api.application.nodes.delete(createdNode.id);
    });

});
