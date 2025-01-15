import PelicanAPI from "../../src";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

const api = new PelicanAPI(process.env.URL, process.env.API_KEY);
const fakeApi = new PelicanAPI(process.env.URL, "fake");

describe("check application connection", () => {

    test("can connect to API", async () => {
        await expect(api.application.test()).resolves.toBeUndefined();
    });

    test("can't connect with fake API credentials", async () => {
        await expect(fakeApi.application.test()).rejects.toBeDefined(); // TODO: Improve error handling
    });
});
