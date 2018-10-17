require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
var cors = require('cors');

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
app.use(cors({
  credentials: true,
  origin: [process.env.FRONT_URL]
}));

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Enable authentication using session + passport
app.use(
  session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
require("./passport")(app);

const index = require("./routes/index");
app.use("/", index);

app.use("/auth", require("./routes/auth"));

app.use("/users",require("./routes/user"))
app.use("/users",require("./routes/genericCRUD")("User"))

app.use("/items",require("./routes/item"))
app.use("/items",require("./routes/genericCRUD")("Item"))

app.use("/tasks",require("./routes/task"))
app.use("/tasks",require("./routes/genericCRUD")("Task"))

app.use("/",require("./routes/speedHelp"))

module.exports = app;
