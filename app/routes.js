var express = require('express');
var http = require('http');
var router = express.Router();
var pendingRequestsController = require("./controllers/pendingRequestsController");
var ownerController = require("./controllers/ownerController");
var visitorController = require("./controllers/visitorController");
var bookingController = require("./controllers/bookingController");




	// app.get('/api/me', passport.authenticate('basic', { session: false }), function(req, res) {
	// 	res.json(req.user);
	// });

	router.get('/visitor/viewBusinessPage',visitorController.viewBusinessPage);
	router.post('/visitor/searchBusinessPages', visitorController.searchBusinessPages);

	router.post('/booking/placeBook2', bookingController.placeBook2);

	router.post('/owner/register', ownerController.register);
	router.post('/requestBusinessPage', pendingRequestsController.requestsPageCreation);
	router.get('/owner/viewProfile', ownerController.viewProfile);
	router.post('/owner/editProfile', ownerController.editProfile);
	router.get('/owner/viewBusinessPage',ownerController.viewBusinessPage);
	router.post('/owner/editBusinessPage',ownerController.editBusinessPage);
	router.post('/owner/addPlace',ownerController.addPlace);
	router.post('/owner/editPlace',ownerController.editPlace);
	router.post('/owner/addTrip',ownerController.addTrip);
	router.post('/owner/editTrip',ownerController.editTrip);
	router.delete('/owner/removePlace',ownerController.removePlace);
	router.delete('/owner/removeTrip',ownerController.removeTrip);

module.exports = router;
