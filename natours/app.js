const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

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

/////////////////////// FUNCTIONS HANDLERS /////////////////////////
// get all the tours
const getAllTours = (req, res) => {
	console.log(req.requestTime);
	res
		.status(200)
		.json({ status: "success", results: tours.length, data: { tours } }); // not needed to 'tours: tours' when they have the same name
};

// get a specific tour by id
const getTour = (req, res) => {
	const id = req.params.id * 1; // convert string to a number
	if (id > tours.length - 1) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}

	const tour = tours.find((el) => el.id === id);

	res.status(200).json({ status: "success", data: { tour } }); // not needed to 'tours: tours' when they have the same name
};

// add a new tour to tours
const createTour = (req, res) => {
	const newID = tours.length;
	const newTour = Object.assign({ id: newID }, req.body);

	tours.push(newTour);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({ status: "success", data: { tour: newTour } });
		}
	);
};

// update a specific tour by id
const updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length - 1) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}

	res.status(200).json({
		status: "success",
		data: { tour: "<Updated tour here>" },
	});
};

// delete a specific tour by id
const deleteTour = (req, res) => {
	if (req.params.id * 1 > tours.length - 1) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}

	res.status(204).json({
		// 204 status means no content
		status: "success",
		data: null,
	});
};

const getAllUsers = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined!",
	});
};

const getUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined!",
	});
};

const createUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined!",
	});
};

const updateUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined!",
	});
};

const deleteUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined!",
	});
};

/////////////////////////// FILES //////////////////////////////
// read tours data before the route handler
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

////////////////////////// ROUTES //////////////////////////////
// routes for tours
const tourRouter = express.Router();
app.use("/api/v1/tours", tourRouter);

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter
	.route("/:id") // define variable with :
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

// routes for users
const userRouter = express.Router();
app.use("/api/v1/users", userRouter);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

/////////////////////// START THE SERVER /////////////////////////
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
