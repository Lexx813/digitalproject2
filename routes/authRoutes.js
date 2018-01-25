const passport = require("passport");
const passportService = require("../services/passport");
const mongoose = require("mongoose");
const Authentication = require("../controllers/authentication");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {

  app.get("/", function(req, res) {
    res.json({ message: "Make a POST requst to /api/auth/signup to signup" });
  });
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
    app.get("/api/current_user", (req, res) => {
      res.send(req.user);
    });
};