const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const morgan = require("morgan");
const cors = require('cors');

require("./models/user");
require("./models/Blog");
require("./models/Survey");
require("./services/passport");

// const seedDB = require('./seeds');
// seedDB();

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());

app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));


require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/blogRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//this is for server

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`SERVER STARTED AT ${PORT}`);
