const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

const postPath = path.join(__dirname, "../resources/posts.json");

//Dùng dữ liệu raw (Json) trên postman để test dữ liệu

route
  .route("/")
  .get((req, res) => {
    fs.readFile(postPath, (err, data) => {
      if (!err) {
        const posts = JSON.parse(data);
        res.status(200).json(posts);
      }
    });
  })
  .post((req, res) => {
    fs.readFile(postPath, (err, data) => {
      const posts = JSON.parse(data);
      req.body.id = Number(req.body.id);
      //  console.log(1111111, req.body.id);
      const index = posts.findIndex((post) => post.id === req.body.id);
      console.log(index);
      if (index !== -1) {
        res.status(500).json({ message: "Post already exists" });
      } else {
        posts.unshift(req.body);
        fs.writeFile(postPath, JSON.stringify(posts), (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({ message: "Post is added successfully" });
      }
    });
  });

//Route Post theo ID
route
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    //   console.log(id);
    fs.readFile(postPath, (err, data) => {
      if (!err) {
        const posts = JSON.parse(data);
        const index = posts.findIndex((post) => post.id === +id);
        //  console.log(111111111, index);
        if (index == -1) {
          res.status(500).json({ message: "Post not found" });
        } else {
          res.status(200).json(posts[index]);
        }
      }
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    fs.readFile(postPath, (err, data) => {
      const posts = JSON.parse(data);
      const index = posts.findIndex((post) => post.id === +id);
      //  console.log(index);
      if (index == -1) {
        res.status(500).json({ message: "Post not found" });
      } else {
        posts[index] = { ...posts[index], ...req.body };
        fs.writeFile(postPath, JSON.stringify(posts), (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({ message: "Post is update successfully" });
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    fs.readFile(postPath, (err, data) => {
      const posts = JSON.parse(data);
      const index = posts.findIndex((post) => post.id === +id);
      //  console.log(index);
      if (index == -1) {
        res.status(500).json({ message: "Post not found" });
      } else {
        const newPosts = posts.filter((post) => post.id != id);
        fs.writeFile(postPath, JSON.stringify(newPosts), (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({ message: "Post is deleted successfully" });
      }
    });
  });

module.exports = route;
