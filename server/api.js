const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("dotenv").config({ path: ".env.dev" });

app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
require("./server")(app);
