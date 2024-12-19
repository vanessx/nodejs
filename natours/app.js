const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

//////////////////////// MIDDLEWARE //////////////////////
app.use(express.json());

/////////////////////// FUNCTIONS HANDLERS /////////////////////////
// get all the tours
const getAllTours = (req, res) => {
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

/////////////////////////// FILES //////////////////////////////
// read tours data before the route handler
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

////////////////////////// ROUTES //////////////////////////////
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
	.route("/api/v1/tours/:id") // define variable with :
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

/*
// old version
app.get("/api/v1/tours", getAllTours);
app.get("/api/v1/tours/:id", getTour); // define variable with :
app.post("/api/v1/tours", createTour);
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour);
*/

// create the server
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
