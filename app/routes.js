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

	router.get('/visitor/SignUp',function(req,res){
		res.sendFile('signup.html',{root:"./views"});
	});

	router.post('/visitor/SignUp', registeredUserController.register);

	router.get('/registeredUser/Profile',function(req,res){
		res.sendFile('registeredUserProfilePage.html',{root:"./views"});
	});

	router.get('/registeredUser/Profile.json',function(req,res){
		res.json(req.session.data);
	});

	router.get('/registeredUser/editProfile',function(req,res){
		res.sendFile('registeredUserEditsProfile.html',{root:"./views"});
	});

	router.get('/registeredUser/editProfile.json',function(req,res){
		res.json(req.session.data);
	});

	router.post('/registeredUser/editProfile', registeredUserController.editProfile);

	router.get('/owner/Profile',function(req,res){
		res.sendFile('ownerProfilePage.html',{root:"./views"});
	});

	router.get('/owner/Profile.json',function(req,res){
		res.json(req.session.data);
	});

	router.post('/Login',function(req,res){
		res.sendFile('profile.html',{root:"./views"});
	});


	router.get('/a',function(req,res){
		res.send("hey");
	});

	router.get('/visitor/viewBusinessPage',function(req,res){
		res.sendFile('viewBusinessPage.html', { root:"./views" });
	});

	router.get('/user/viewBusinessPage.json',registeredUserController.userViewsBusinessPage);

	router.post('/visitor/searchBusinessPages', visitorController.searchBusinessPages);

	router.get('/visitor/login', function(req,res){
		res.sendFile('signup.html', { root:"./views" });
	});

	router.post('/visitor/login', registeredUserController.registeredUserLogsIn);


	router.post('/booking/placeBook2', bookingController.placeBook2);
	router.post('/owner/register', ownerController.register);
	router.post('/requestBusinessPage', pendingRequestsController.requestsPageCreation);
	router.get('/owner/viewProfile', ownerController.viewProfile);
	router.post('/owner/editProfile', ownerController.editProfile);
	router.get('/owner/ownerViewsBusinessPage',function(req,res){
		res.sendFile('viewBusinessPage.html', { root:"./views" });
	});

	// router.get('/owner/ownerViewsBusinessPage.json',function(req,res){
	// 	res.json(req.session.data.BusinessPage);
	// });

	router.get('/owner/ownerViewsBusinessPage.json',ownerController.ownerViewsBusinessPage);


	router.get('/owner/editBusinessPage',function(req,res){
		res.sendFile('editBusinessPage.html', { root:"./views" });
	});

	router.get('/owner/editBusinessPag.json',function(req,res){
		res.json(req.session.BusinessPage);
	});

	router.post('/owner/editBusinessPage',ownerController.editBusinessPage);

	router.post('/owner/addPlace',ownerController.addPlace);
	router.post('/owner/editPlace',ownerController.editPlace);

	router.get('/owner/addTrip',function(req,res){
		res.sendFile('addTrip.html', { root:"./views" });
	});

	router.get('/owner/addPlace',function(req,res){
		res.sendFile('addPlace.html', { root:"./views" });
	});

	router.post('/owner/addTrip',ownerController.addTrip);
	router.post('/owner/editTrip',ownerController.editTrip);

	// router.post('/owner/removePlace',ownerController.removePlace);
	// router.post('/owner/removeTrip',ownerController.removeTrip);

	router.get('/logOut', ownerController.ownerLogsOut);

	router.post('/test', function(req,res){
		res.send(req.body);
	});

module.exports = router;
