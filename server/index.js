const next = require("next");
const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

require("dotenv").config();

nextApp
  .prepare()
  .then(() => {
    const app = express();
    app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
    require("./server")(app);
    app.get("*", (req, res) => {
      return handle(req, res);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
