const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const MongoDBSession = require("connect-mongodb-session")(session);

const store = new MongoDBSession({
  uri: process.env.DB_URI,
  collection: "sessions",
});

// Route declaration
const viewRoute = require("./routes/views");
const fakerRoute = require("./routes/faker");
const userRoute = require("./routes/user");
const mealRoute = require("./routes/meal");
const recipeRoute = require("./routes/recipe");
const reviewRoute = require("./routes/review");
const blogRoute = require("./routes/blog");
const bookingRoute = require("./routes/booking");
const orderRoute = require("./routes/booking");
const eventRoute = require("./routes/events");
const branchRoute = require("./routes/branch");
const appError = require("./utils/appError");
const errorController = require("./controllers/error");

app.use(express.json());
app.use(
  session({
    secret: "CafeRoyale",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/", viewRoute);
app.use("/api/v1/faker", fakerRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/meals", mealRoute);
app.use("/api/v1/recipes", recipeRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/branches", branchRoute);

app.all("*", (req, res, next) => {
  return next(
    new appError(`Can't find ${req.originalUrl} route on this server.`)
  );
});

app.use(errorController);

module.exports = app;
