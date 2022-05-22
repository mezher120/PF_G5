var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const productsRoutes = require("./routes/products.routes");
const sizesRoutes = require("./routes/sizes.routes");
const colorsRoutes = require("./routes/colors.routes");
const dbDataPushRoutes = require("./routes/db-data-push.routes");
const categoriesRoutes = require("./routes/categories.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const stockRoutes = require("./routes/stock.routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.use(productsRoutes);
app.use(sizesRoutes);
app.use(colorsRoutes);
app.use(dbDataPushRoutes);
app.use(categoriesRoutes);
app.use(reviewsRoutes);
app.use(stockRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
