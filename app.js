
const express = require("express");
const app = express();
const endpoints = require("./endpoints.json")
const {getPlantByID} = require("./controllers/plantsController")


app.use(express.json());


app.get("/api", (req, res) => {
    res.status(200).send({ endpoints})
});

app.get("/api/plants/:plant_id", getPlantByID)

app.all("*", (req, res) => {
    res.status(404).send({error: "Endpoint not found"})
})

app.use((err, req, res, next) => { 
    if (err.code === "22P02" || err.code === "23502") {
      res.status(400).send({ error: "Bad Request" });
    }
    else if (err.code === "23503" ){
        res.status(404).send({ error: "Not Found" });

     } else{
      next(err); 
    }
  });
  
  app.use((err, req, res, next) => { 
    if (err.status && err.msg) {
      return res.status(err.status).send({ error: err.msg });
    }
    next(err); 
  });
  
  app.use((err, req, res, next) => {
    console.log(err, "<<< you havent handled this error yet");
    res.status(500).send({ error: "Internal Server Error" });
  });

module.exports = app

