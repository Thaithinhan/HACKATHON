const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

const postPath = path.join(__dirname, "../resources/posts.json");
const userPath = path.join(__dirname, "../resources/users.json");

//Check Postman

route.route("/:idUser").get((req, res) => {
  const idUser = req.params.idUser;
  fs.readFile(postPath, (err, data) => {
    const posts = JSON.parse(data);
    const filterPost = posts.filter((post) => post.userId === +idUser);
    if (filterPost.length > 0) {
      res.status(200).json(filterPost);
    }
  });
});
module.exports = route;
