const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

const userPath = path.join(__dirname, "../resources/users.json");

// console.log(userPath);
//Tạo route đến tất cả user
//Dùng dữ liệu raw (Json) trên postman để test dữ liệu
route
  .route("/")
  .get((req, res) => {
    fs.readFile(userPath, (err, data) => {
      if (!err) {
        const users = JSON.parse(data);
        res.status(200).json(users);
      }
    });
  })
  .post((req, res) => {
    fs.readFile(userPath, (err, data) => {
      const users = JSON.parse(data);
      req.body.id = Number(req.body.id);
      //  console.log(1111111, req.body.id);
      const index = users.findIndex((user) => user.id === req.body.id);
      //  console.log(index);
      if (index !== -1) {
        res.status(500).json({ message: "User already exists" });
      } else {
        users.unshift(req.body);
        fs.writeFile(userPath, JSON.stringify(users), (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({ message: "User is added successfully" });
      }
    });
  });

//Route User theo ID
route
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    //   console.log(id);
    fs.readFile(userPath, (err, data) => {
      if (!err) {
        const users = JSON.parse(data);
        const index = users.findIndex((user) => user.id === +id);
        //  console.log(111111111, index);
        if (index == -1) {
          res.status(500).json({ message: "User not found" });
        } else {
          res.status(200).json(users[index]);
        }
      }
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    fs.readFile(userPath, (err, data) => {
      const users = JSON.parse(data);
      const index = users.findIndex((user) => user.id === +id);
      //  console.log(index);
      if (index == -1) {
        res.status(500).json({ message: "User not found" });
      } else {
        users[index] = { ...users[index], email: req.body.email };
        fs.writeFile(userPath, JSON.stringify(users), (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({ message: "User is update successfully" });
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    fs.readFile(userPath, (err, data) => {
      const users = JSON.parse(data);
      const index = users.findIndex((user) => user.id === +id);
      //  console.log(index);
      if (index == -1) {
        res.status(500).json({ message: "User not found" });
      } else {
        const newUsers = users.filter((user) => user.id != id);
        fs.writeFile(userPath, JSON.stringify(newUsers), (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({ message: "User is deleted successfully" });
      }
    });
  });

module.exports = route;
