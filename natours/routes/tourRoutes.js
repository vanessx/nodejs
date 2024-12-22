const express = require("express");
const tourController = require("./../controllers/tourController");

////////////////////////// ROUTES //////////////////////////////
// routes for tours
const router = express.Router();

router
	.route("/")
	.get(tourController.getAllTours)
	.post(tourController.createTour);
router
	.route("/:id") // define variable with :
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour);

module.exports = router;
