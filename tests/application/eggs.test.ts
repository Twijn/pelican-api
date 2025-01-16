import PelicanAPI from "../../src";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

const api = new PelicanAPI(process.env.URL, process.env.API_KEY);

describe("check egg endpoints", () => {

    test("get all eggs", async () => {
        await expect(api.application.eggs.getAll()).resolves.toBeDefined();
    });

    test("get single egg with id = 1", async () => {
        await expect(api.application.eggs.getById(1)).resolves.toHaveProperty("id", 1);
    });

});
