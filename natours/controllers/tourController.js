const fs = require("fs");

/////////////////////////// FILES //////////////////////////////
// read tours data before the route handler
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

////////////////////////// FUNCTIONS HANDLERS ///////////////////////////
// get all the tours
exports.getAllTours = (req, res) => {
	console.log(req.requestTime);
	res
		.status(200)
		.json({ status: "success", results: tours.length, data: { tours } }); // not needed to 'tours: tours' when they have the same name
};

// get a specific tour by id
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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