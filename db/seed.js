const format = require("pg-format");
const db = require("./connection.js");
const { convertValuesToArray, handlePlantData } = require("./utils.js");

// NOTES - should cuisine be in there? check foreign and primary keys setup

function seed(users, plants) {
  return db
    .query("DROP TABLE IF EXISTS owned_plants;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS favourited_plants;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS zones;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS plants;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createPlants();
    })
    .then(() => {
      return createOwnedPlants();
    })
    .then(() => {
      return createFavouritedPlants();
    })
    .then(() => {
      return createZones();
    })
    .then(() => {
      return db.query(
        format(
          "INSERT INTO users (username, email, geolocation) VALUES %L",
          convertValuesToArray(users.users)
        )
      );
    })
    .then(() => {
      return db.query(
        format(
          `INSERT INTO plants (plant_id, common_name, sci_name, type, cycle, attracts, watering, maintenance, growth_rate, drought_tolerant, thorny, invasive, tropical, care_level, pest_resistant, flowers, flowering_season, edible_fruit, harvest_season, edible_leaf, cuisine, poisonous_to_humans, poisonous_to_pets, description, default_image) VALUES %L`,
          handlePlantData(plants)
        )
      );
    });
}

function createUsers() {
  return db.query(`
      CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR (30) NOT NULL,
        email VARCHAR NOT NULL,
        geolocation VARCHAR
    )`);
}

function createPlants() {
  return db.query(
    `CREATE TABLE plants(
    plant_id INT PRIMARY KEY,
    common_name VARCHAR (90) NOT NULL,
    sci_name VARCHAR (90),
    type VARCHAR (20),
    cycle VARCHAR (20),
    attracts VARCHAR,
    watering VARCHAR (20),
    maintenance VARCHAR (20),
    growth_rate VARCHAR (20),
    drought_tolerant BOOLEAN,
    thorny BOOLEAN,
    invasive BOOLEAN,
    tropical BOOLEAN,
    care_level VARCHAR (20),
    pest_resistant BOOLEAN,
    flowers BOOLEAN,
    flowering_season VARCHAR,
    edible_fruit BOOLEAN,
    harvest_season VARCHAR,
    edible_leaf BOOLEAN,
    cuisine BOOLEAN,
    poisonous_to_humans BOOLEAN,
    poisonous_to_pets BOOLEAN,
    description VARCHAR,
    default_image VARCHAR
    )`
  );
}

function createOwnedPlants() {
  return db.query(`
    CREATE TABLE owned_plants(
    owned_plant_key SERIAL PRIMARY KEY,
    user_key INT REFERENCES users(user_id),
    plant_key INT REFERENCES plants(plant_id),
    zone_key INT REFERENCES zones(zone_key),
    last_watered DATE)
`);
}

function createFavouritedPlants() {
  return db.query(`
      CREATE TABLE favourited_plants(
      favourite_plant_key SERIAL PRIMARY KEY,
      user_key INT REFERENCES users(user_id),
      plant_key INT REFERENCES plants(plant_id))
  `);
}

function createZones() {
  return db.query(`
        CREATE TABLE zones(
        zone_key SERIAL PRIMARY KEY,
        user_key INT REFERENCES users(user_id),
        owned_plant_key INT REFERENCES owned_plants(owned_plant_key),
        is_outdoor BOOLEAN,
        sun_level VARCHAR (20),
        zone_name VARCHAR)`);
}

module.exports = seed;
