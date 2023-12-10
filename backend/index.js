const express = require("express");
const path = require("path");
const db = require("./db");
const fs = require("fs");
const bootControllers = require("./bootControllers");
const session = require("express-session");

const frontendDirRelative = "../frontend";
const htmlDir = path.resolve(__dirname, `${frontendDirRelative}`);

const init = async () => {
  try {
    await db();
    const app = new express();
    console.log(__dirname);
    app.use(express.static("./frontend/public"));
    app.use(express.json());
    app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
      })
    );
    fs.readdirSync(htmlDir)
      .filter((file) => file.endsWith(".html"))
      .forEach((file) => {
        const url = file.split(".")[0];
        app.get(`/${url == "index" ? "" : url}`, (req, res) => {
          res.sendFile(file, { root: htmlDir });
        });
      });
    app.use(express.urlencoded());
    //boot api controllers
    bootControllers(app);
    // listen 4000 port
    app.listen(4000, () => {
      console.log("App listening on port 4000 : http://localhost:4000");
    });
  } catch (e) {
    console.log(e);
  }
};

init();
