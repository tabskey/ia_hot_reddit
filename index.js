require("dotenv").config();
const express = require("express");
const routes = require("./src/routes");
const app = express();
const cron = require("./src/cron");

app.use(routes);
app.listen(4000);
