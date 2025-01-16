import PelicanAPI from "../../src";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY || !process?.env?.DEDICATED_IP) {
    console.error("missing environment variable");
    process.exit(1);
}

import { Server } from "../../src/models/Server";

const api = new PelicanAPI(process.env.URL, process.env.API_KEY);
const DEDICATED_IP: string = process.env.DEDICATED_IP;

let createdServer: Server;

describe("test server endpoints", () => {

    beforeAll(async () => {
        createdServer = await api.application.servers.create({
            egg: 3,
            environment: {
                SERVER_JARFILE: "server.jar",
                VANILLA_VERSION: "latest",
            },
            feature_limits: {
                databases: 0,
                backups: 1,
                allocations: 0,
            },
            limits: {
                memory: 1024,
                cpu: 0,
                disk: 0,
                swap: 0,
                io: 500,
            },
            name: "wrapper-test",
            user: 1,
            allocation: {
                default: "3",
            },
        });

        console.log(`Created server with id ${createdServer.id}`);
    });

    test("check if server was created", () => {
        expect(createdServer).toBeDefined();
        expect(createdServer.name).toBe("wrapper-test");
    });

    // This does not work currently (for some reason)
    test("check update build endpoint", async () => {
        const updateBuild = createdServer.updateBuild({
            memory: 512,
            cpu: 100,
            swap: 0,
            io: 500,
            disk: 1024,
            threads: "",
            feature_limits: {
                databases: 0,
                backups: 0,
                allocations: 0,
            }
        });

        await expect(updateBuild).resolves.toHaveProperty("limits.memory", 512);
        await expect(updateBuild).resolves.toHaveProperty("limits.cpu", 100);
        await expect(updateBuild).resolves.toHaveProperty("limits.disk", 1024);

        await expect(updateBuild).resolves.toHaveProperty("feature_limits.databases", 0);
        await expect(updateBuild).resolves.toHaveProperty("feature_limits.backups", 0);
        await expect(updateBuild).resolves.toHaveProperty("feature_limits.allocations", 0);
    });

    test("check update details endpoint", async () => {
        const updateDetails = createdServer.updateDetails({
            name: "new-server-name",
            description: "I have a description now!",
        });

        await expect(updateDetails).resolves.toHaveProperty("name", "new-server-name");
        await expect(updateDetails).resolves.toHaveProperty("description", "I have a description now!");
    })

    test("check update startup endpoint", async () => {
        const updateStartup = createdServer.updateStartup({
            egg: "4",
            environment: {
                SPONGE_VERSION: "latest",
                SERVER_JARFILE: "server.jar",
            },
            skip_scripts: true,
        });

        await expect(updateStartup).resolves.toHaveProperty("egg", 4);
        await expect(updateStartup).resolves.toHaveProperty("container.environment.SPONGE_VERSION", "latest");
    });

    test("get all servers", async () => {
        await expect(api.application.servers.getAll()).resolves.toBeDefined();
    });

    test("get server with id = 1", async () => {
        await expect(api.application.servers.getById(1)).resolves.toHaveProperty("id", 1);
    });

    afterAll(async () => {
        await api.application.servers.delete(createdServer.id);
    });

});
