const request = require("supertest");
const app = require("../src/app");
const db = require("../db/connection");
const seed = require("../seed");

beforeAll(async () => {
  await seed();
});

describe("restaurants", () => {
  test("GET request should return all restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(6);
    // console.log(JSON.parse(response.body.text))
    expect(response.body[0].cuisine).toBe("FastFood");
  });

  test("parametric endpoint of id should return singular restaurant", async () => {
    const response = await request(app).get("/restaurants/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe("AppleBees");
    expect(response.body.location).toBe("Texas");
  });

  test("POST request should add to the list of restaurants", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Crust Bros",
      location: "Croydon",
      cuisine: "Italian",
    });
    const allRestaurants = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Crust Bros");
    expect(allRestaurants.body.length).toBe(7);
  });

  test("POST request should throw error if any value is empty", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "",
      location: "Croydon",
      cuisine: "Italian",
    });
    const allRestaurants = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toEqual([
      {
        location: "body",
        msg: "Invalid value",
        path: "name",
        type: "field",
        value: "",
      },
    ]);
    // console.log(allRestaurants.body.text)
    expect(allRestaurants.body.length).toBe(7);
  });

  test("PUT should replace a restaurant with sent values", async () => {
    const response = await request(app).put("/restaurants/1").send({
      name: "The Savoy",
      location: "The Strand",
      cuisine: "Modern European",
    });
    const firstRestaurant = await request(app).get("/restaurants/1");
    expect(response.statusCode).toBe(200);
    expect(firstRestaurant.body.name).toBe("The Savoy");
  });

  test("DELETE should remove the restaurant by ID", async () => {
    const response = await request(app).delete("/restaurants/2");
    const deleteConfirmation = await request(app).get("/restaurants/2");
    expect(response.statusCode).toBe(200);
    expect(deleteConfirmation.body).toBe(null);
  });
});
