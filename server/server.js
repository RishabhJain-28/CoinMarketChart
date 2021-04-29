const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");

module.exports = function (app) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
  app.use(express.json());

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
    }
  );
  // require("./test.js");

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 604800000, // * 7 days
        sameSite: true,
      },
      store: new MongoStore({
        ttl: 604800000,
        mongooseConnection: mongoose.connection,
      }),
    })
  );

  // * Route imports
  const token = require("./routes/token");
  const user = require("./routes/user");
  const chart = require("./routes/chart");
  const prices = require("./routes/prices");

  // * Routes

  app.use("/api/tokens", token);
  app.use("/api/user", user);
  app.use("/api/chart", chart);
  app.use("/api/prices", prices);

  // * Server
  const port = process.env.PORT || 5000;
  const server = app.listen(
    port,
    console.log(`Server started on port ${port}`)
  );

  // // * Socket IO
  // const io = ioInit(server, {
  //   cors: {
  //     origin: "*", //! change for security
  //   },
  // });
  // io.on("connection", (socket) => {
  //   console.log(socket.id);
  //   socket.emit("hello", "world");
  // });

  // * CRON
  require("./util/cron");

  // * set initConversionRates cron
  const { init } = require("./util/conversionRates");
  init(app);

  // * Production setup
  if (process.env.NODE_ENV === "production") {
    console.log("production");
    app.use(express.static(path.resolve(__dirname, "Client", "build")));
    // app.get("/*", function (req, res) {
    //   res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
    // });
    // * Handle unhandled promise exceptions
    process.on("uncaughtException", (err, promise) => {
      console.log(`Error: ${err.message}`);
    });

    // * Handle unhandled promise rejections
    process.on("unhandledRejection", (err, promise) => {
      console.log(`Error: ${err.message}`);
    });
  }

  // const abc = require("./dbShift");
  // app.get("/zxc", () => abc());
};
