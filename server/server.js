const express = require("express");
// const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const ioInit = require("socket.io");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

const next = require("next");
const path = require("path");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();
    app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    const sessionStore = new session.MemoryStore();
    app.use(
      session({
        secret: process.env.COOKIE_SECRET_KEY,
        resave: true,
        store: sessionStore,
        saveUninitialized: true,
      })
    );
    // app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

    // * passport init
    require("./config/passport-local");
    app.use(passport.initialize());
    app.use(passport.session());

    // * DB
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) return console.log("Connection to MongoDB failed.\n", err);
        console.log("Connected to MongoDB");
        // require("./util/testChart");
        require("./tempAddData");
      }
    );

    // * Route imports
    const token = require("./routes/token");
    const user = require("./routes/user");
    const chart = require("./routes/chart");
    const prices = require("./routes/prices");

    // * Routes
    app.get("/api/socket", (req, res) => {
      io.emit("data", {
        a: 1,
        b: 2,
      });
      res.send("done");
    });
    app.use("/api/tokens", token);
    app.use("/api/user", user);
    app.use("/api/chart", chart);
    app.use("/api/prices", prices);
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    // * Server
    const port = process.env.PORT || 5000;
    const server = app.listen(
      port,
      console.log(`Server started on port ${port}`)
    );

    // * Socket IO
    const io = ioInit(server, {
      cors: {
        origin: "*", //! change for security
      },
    });
    io.on("connection", (socket) => {
      console.log(socket.id);
      socket.emit("hello", "world");
    });

    // * CRON
    require("./util/cron")(io);

    // app.get("/", (req, res) => {
    //   res.send("a");
    // });

    // * Production setup
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.resolve(__dirname, "Client", "build")));
      app.get("/*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
      });
      // * Handle unhandled promise exceptions
      process.on("uncaughtException", (err, promise) => {
        console.log(`Error: ${err.message}`);
      });

      // * Handle unhandled promise rejections
      process.on("unhandledRejection", (err, promise) => {
        console.log(`Error: ${err.message}`);
      });
    }
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
