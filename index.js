require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { db } = require("./src/models");
const swaggerSpecs = require("./swagger");
const swaggerUi = require('swagger-ui-express');

const indexRouter = require("./src/routes");

db.sequelize
  .sync()
  .then(() => {
    console.log("Db is synced.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api", indexRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
