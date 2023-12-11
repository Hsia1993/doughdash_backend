const express = require("express");
const path = require("path");
const db = require("./db");
const fs = require("fs");
const bootControllers = require("./bootControllers");
const session = require("express-session");

const frontendDirRelative = "../frontend";
const frontendDir = path.resolve(__dirname, `${frontendDirRelative}`);

const init = async () => {
  try {
    await db();
    const app = new express();
    app.set("view engine", "ejs");
    app.set("views", frontendDir);
    app.use(express.static(`${frontendDir}/public`));
    app.use(express.json());
    app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
      })
    );
    fs.readdirSync(`${frontendDir}/views`)
      .filter((file) => file.endsWith(".ejs"))
      .forEach((file) => {
        const url = file.split(".")[0];
        app.get(`/${url == "index" ? "" : url}`, (req, res) => {
          if (req.session && req.session.userId) {
            if (req.path == "/login" || req.path == "/signup") {
              res.redirect("/");
              return;
            }
          } else {
            if (req.path == "/") {
              res.redirect("/login");
              return;
            }
          }
          res.render("layouts/base", {
            content: `${frontendDir}/views/${file}`,
            title: "DoughDash",
            logged: !!req.session.userId,
          });
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
