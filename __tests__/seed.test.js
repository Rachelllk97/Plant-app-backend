const db = require("../db/connection");
const seed = require("../db/seed");
const plants = require("../db/data/plantsTest.json");
const users = require("../db/data/testUsers.json");
const zones = require("../db/data/zones.json");
const ownedPlants = require("../db/data/ownedPlants.json");
const favePlants = require("../db/data/favePlants.json");

beforeAll(() => seed(users, plants, zones, ownedPlants, favePlants));
afterAll(() => db.end());

describe("seed", () => {
  describe("users table", () => {
    test("users table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                      SELECT FROM 
                          information_schema.tables 
                      WHERE 
                          table_name = 'users'
                      );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });
  describe("plants table", () => {
    test("plants table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                      SELECT FROM 
                          information_schema.tables 
                      WHERE 
                          table_name = 'plants'
                      );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });
  describe("owned plants table", () => {
    test("owned plants exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                      SELECT FROM 
                          information_schema.tables 
                      WHERE 
                          table_name = 'owned_plants'
                      );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });
  describe("favourited plants table", () => {
    test("favourited plants exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                      SELECT FROM 
                          information_schema.tables 
                      WHERE 
                          table_name = 'favourited_plants'
                      );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });
  describe("zones table", () => {
    test("zones exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                      SELECT FROM 
                          information_schema.tables 
                      WHERE 
                          table_name = 'zones'
                      );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });
});
