import PelicanAPI from "../../src";

const api = new PelicanAPI("https://pelican.twijn.dev/api", "peli_8V5RkpCNZ026xotK6ekEToHzs7xETCMTrc67woklrQ0");

describe("check application connection", () => {
    const falseApi = new PelicanAPI("https://pelican.twijn.dev/api", "fake");

    test("can connect to API", async () => {
        await expect(api.application.test()).resolves.toBeUndefined();
    });

    test("can't connect with fake API credentials", async () => {
        await expect(falseApi.application.test()).rejects.toBeDefined(); // TODO: Improve error handling
    });
});
