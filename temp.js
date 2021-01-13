const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

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
    return console.log("Connected to MongoDB");
  }
);

// * Route imports
const token = require("./routes/token");
const user = require("./routes/user");



// * Server
const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Server started on port temp : ${port}`));



app.get("/", (req, res) => {
  res.send("a");
});

