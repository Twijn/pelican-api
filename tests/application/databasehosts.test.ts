import PelicanAPI from "../../src";
import {DatabaseHost} from "../../src/models/DatabaseHost";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

const api = new PelicanAPI(process.env.URL, { applicationApiKey: process.env.API_KEY });

let createdDatabaseHost: DatabaseHost;

describe("check database host endpoints", () => {

    // This stuff is all borked.
    // beforeAll(async () => {
    //     createdDatabaseHost = await api.application.databaseHosts.create({
    //         name: "dbh-test",
    //         host: "127.0.0.1",
    //         port: 3306,
    //         username: "dbhost",
    //         password: "P@ssw0rd!",
    //     });
    // });
    //
    // test("check database host created", () => {
    //     expect(createdDatabaseHost).toBeDefined();
    //     expect(createdDatabaseHost).toHaveProperty("name", "dbh-test");
    //     expect(createdDatabaseHost).toHaveProperty("host", "127.0.0.1");
    //     expect(createdDatabaseHost).toHaveProperty("port", 3306);
    // });

    test("get all database hosts", async () => {
        await expect(api.application.databaseHosts.getAll()).resolves.toBeDefined();
    });

    test("get database host with id = 1", async () => {
        await expect(api.application.databaseHosts.getById(1)).resolves.toHaveProperty("id", 1);
    });

});
