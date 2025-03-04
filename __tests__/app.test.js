const app = require('../app.js')
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed.js")
const plants = require("../db/data/plantsTest.json");
const users = require("../db/data/testUsers.json");
const zones = require("../db/data/zones.json");
const ownedPlants = require("../db/data/ownedPlants.json");
const favePlants = require("../db/data/favePlants.json");

beforeAll(() => seed(users, plants, zones, ownedPlants, favePlants)); 
afterAll(() => db.end());


  describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).toEqual(endpoints);
        });
    });
  });


  describe("GET /api/plants/:plant_id", () => {
    test("200: get a plant by its id with correct properties", () => {
      return request(app)
      .get("/api/plants/855")
      .then(({body}) => {
      const plant = body.plant
        expect(plant.common_name).toEqual("anthurium")
        expect(plant.watering).toEqual("Average")
      })
  })
    test("400: id not a number", () => {
        return request(app)
        .get("/api/plants/hello")
        .expect(400)
        .then((response) => {
            expect(response.body.error).toBe("Bad Request");
        });
    });
    test("404: no plants with that id number", () => {
        return request(app)
        .get("/api/plants/9999")
        .expect(404)
        .then((response) => {
        expect(response.body.error).toBe("No plant associated with this id number");
        })
        })
        });


    describe("GET /api/users/:user_id", () => {
        test("200: responds with correct user information", () => {
            return request(app)
            .get("/api/users/1")
            .expect(200)
            .then(({body}) => {
                const user = body.user
                expect(user).toMatchObject({
                    user_id: 1,
                    username: 'ReymundoCancer',
                    email: 'Reymundo15@yahoo.com',
                    geolocation: expect.any(String),   
                  })
            })
        })
        test("400: id not a number", () => {
            return request(app)
            .get("/api/users/hello")
            .expect(400)
            .then((response) => {
                expect(response.body.error).toBe("Bad Request");
            });
        });
        test("404: no user with that id number", () => {
            return request(app)
            .get("/api/users/9999")
            .expect(404)
            .then((response) => {
            expect(response.body.error).toBe("No user associated with this id number");
            })
            })
            });

describe("POST /api/users", () => {
    test("should add a new user and return correct user details", () => {
        const newUser = {
            username: 'RachelJelly',
            email: 'RachelJelly@yahoo.com',
            geolocation:  "51.633476273314955, -0.765394936606981"
        }

        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then((response) => {
            expect(response.body.user).toMatchObject({
            user_id: 6,
            username: 'RachelJelly',
            email: 'RachelJelly@yahoo.com',
            geolocation:  expect.any(String),     
            })
        })
    })
    test("should return 400 if username is missing", () => {
        const newUser = {
            email: 'RachelJelly@yahoo.com',
            geolocation: "51.633476273314955, -0.765394936606981"
        };
    
        return request(app)
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Username is required")
            })
        })
        test("should return 400 if email is missing", () => {
            const newUser = {
                username: "RachelJelly",
                geolocation: "51.633476273314955, -0.765394936606981"
            };
        
            return request(app)
                .post("/api/users")
                .send(newUser)
                .expect(400)
                .then((response) => {
                    expect(response.body.msg).toBe("Email is required");
                });
        });
     
})