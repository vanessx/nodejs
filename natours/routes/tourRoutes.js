const express = require("express");
const tourController = require("./../controllers/tourController");

// routes for tours
const router = express.Router();

// middleware for a param. in this cas 'val' is to the value of the param we pass
router.param("id", tourController.checkID);

router
	.route("/")
	.get(tourController.getAllTours)
	.post(tourController.checkBody, tourController.createTour);
router
	.route("/:id") // define variable with :
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour);

module.exports = router;
