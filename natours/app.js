const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = 3000;

//////////////////////// MIDDLEWARE //////////////////////
// 3rd-party middlewares
app.use(morgan("dev"));

app.use(express.json());

// my own middleware to dated the request
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

/////////////////////// ROUTES //////////////////////////
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

/////////////////////// START THE SERVER /////////////////////////
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
