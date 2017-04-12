var express = require('express');
var http = require('http');
var router = express.Router();
var pendingRequestsController = require("./controllers/pendingRequestsController");
var ownerController = require("./controllers/ownerController");
var visitorController = require("./controllers/visitorController");
var bookingController = require("./controllers/bookingController");
var registeredUserController = require("./controllers/registeredUserController");




	// app.get('/api/me', passport.authenticate('basic', { session: false }), function(req, res) {
	// 	res.json(req.user);
	// });

	router.get('/',function(req,res){
		// res.json("hey");
		res.sendFile('home.html',{root:"./views"});
	});

	router.get('/SignUp',function(req,res){
		res.sendFile('signup.html',{root:"./views"});
	});

	router.post('/Login',function(req,res){
		res.sendFile('profile.html',{root:"./views"});
	});

	router.get('/Profile',function(req,res){
		// console.log("hey");
		res.sendFile('profile.html',{root:"./views"});
		// res.render('profile');
	});

	router.get('/Profile.json',function(req,res){
		// res.json(registeredUserController.viewProfile);
		res.json({hey:'ehhhhh'});
		// res.render('profile');
	});

	router.get('/a',function(req,res){
		res.send("hey");
	});

	// router.get('/visitor/viewBusinessPage',visitorController.visitorViewsBusinessPage);
	router.get('/visitor/viewBusinessPage',function(req,res){
		res.sendFile('viewBusinessPage.html', { root:"./views" });
	});

	router.post('/visitor/searchBusinessPages', visitorController.searchBusinessPages);

	router.get('/visitor/login', function(req,res){
		res.sendFile('login.html', { root:"./views" });
	});

	router.post('/visitor/SignUp', function(req,res){
		res.sendFile('login.html', { root:"./views" });
	});

	// router.post('/visitor/login', function(req,res){
	// 	res.sendFile('login.html', { root:"./views" });
	// });


	router.post('/booking/placeBook2', bookingController.placeBook2);
	router.post('/owner/register', ownerController.register);
	router.post('/requestBusinessPage', pendingRequestsController.requestsPageCreation);
	router.get('/owner/viewProfile', ownerController.viewProfile);
	router.post('/owner/editProfile', ownerController.editProfile);
	router.get('/owner/ownerViewBusinessPage',ownerController.ownerViewsBusinessPage);
	router.post('/owner/editBusinessPage',ownerController.editBusinessPage);
	router.post('/owner/addPlace',ownerController.addPlace);
	router.post('/owner/editPlace',ownerController.editPlace);
	router.post('/owner/addTrip',ownerController.addTrip);
	router.post('/owner/editTrip',ownerController.editTrip);
	router.delete('/owner/removePlace',ownerController.removePlace);
	router.delete('/owner/removeTrip',ownerController.removeTrip);

module.exports = router;
