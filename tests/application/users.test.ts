import {User} from "../../src/models/User";
import PelicanAPI from "../../src";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

if (!process?.env?.URL || !process?.env?.API_KEY) {
    console.error("missing environment variable");
    process.exit(1);
}

const api = new PelicanAPI(process.env.URL, process.env.API_KEY);

describe("test base GET endpoints", () => {
    test("get all users", async () => {
        await expect(api.application.users.getAll()).resolves.toBeDefined();
    });

    test("get user with id = 1", async () => {
        await expect(api.application.users.getById(1)).resolves.toHaveProperty("id", 1);
    });
})

let createdUser: User;

describe("test user endpoints", () => {

    beforeAll(async () => {
        createdUser = await api.application.users.create({
            external_id: "pelicanapi_test",
            username: "johndoe",
            email: "john@example.com",
            password: "12345678",
            language: "af",
            timezone: "Africa/Abidjan",
        });
        console.log(`Created user ${createdUser?.id}`);
    });

    test("check if mock user created", async () => {
        expect(createdUser).toHaveProperty("id");
        expect(createdUser.username).toBe("johndoe");
    });

    test("get user with external_id = pelicanapi_test", async () => {
        await expect(api.application.users.getByExternalId("pelicanapi_test")).resolves.toHaveProperty("id", createdUser.id);
    });

    test("update created user", async () => {
        const updateUser = createdUser.update({
            external_id: "pelicanapi_test2",
            username: "janesmith",
            email: "jane@example.com",
            password: "12345678!",
            timezone: "Africa/Banjul",
            language: "es",
        });

        await expect(updateUser).resolves.toHaveProperty("username", "janesmith");
        await expect(updateUser).resolves.toHaveProperty("email", "jane@example.com");
        await expect(updateUser).resolves.toHaveProperty("language", "es");
    });

    afterAll(async () => {
        if (!createdUser?.id) return;

        await api.application.users.delete(createdUser.id);
    });

});
