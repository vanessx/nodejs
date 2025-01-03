const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//////////////////////// MIDDLEWARE //////////////////////
// 3rd-party middlewares
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

// my own middleware to dated the request
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

/////////////////////// ROUTES //////////////////////////
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
