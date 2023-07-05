const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
// const cookieRoute = require("../app/routes/cookie.route");
// const sessionRoute = require("../app/routes/session.route");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const noteRoute = require("./routes/note.route");

//Middelware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

//database

//route
app.use("/notes", noteRoute);

//config ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//handle error

module.exports = app;
