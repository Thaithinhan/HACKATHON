const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 8000;
const bodyParser = require("body-parser");
const routeUser = require("./routes/user.route");
const routePost = require("./routes/post.rout");
const routeUserPost = require("./routes/detail-post-user.route");

app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

//Route User
app.use("/api/users", routeUser);//Lấy user
app.use("/api/posts", routePost); //Lấy bài post
app.use("/api/users/1/posts", routeUserPost); //Lấy các bài post của 1 user

app.listen(port, () => {
  console.log(`Link server: http://localhost:${port}`);
});
