import PelicanAPI from "../../src";

import {Role} from "../../src/models/Role";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

const api = new PelicanAPI(process.env.URL, { applicationApiKey: process.env.API_KEY });

let createdRole: Role;

describe("check role endpoints", () => {

    beforeAll(async () => {
        createdRole = await api.application.roles.create({name: "Test Role"});

        console.log(`Created role ${createdRole.id}`);
    });

    test("get all roles", async () => {
        await expect(api.application.roles.getAll()).resolves.toBeDefined();
    })

    test("new role created", () => {
        expect(createdRole).toBeDefined();
        expect(createdRole.name).toBe("Test Role");
    });

    test("update created role", async () => {
        await expect(createdRole.update({ name: "New Test Role" })).resolves.toHaveProperty("name", "New Test Role");
    });

    test("get created role by ID", async () => {
        await expect(api.application.roles.getById(createdRole.id)).resolves.toBeDefined();
    });

    afterAll(async () => {
        await createdRole.delete();
    });

});
