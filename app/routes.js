var express = require('express');
var http = require('http');
var router = express.Router();
var pendingRequestsController = require("./controllers/pendingRequestsController");
var ownerController = require("./controllers/ownerController");
var visitorController = require("./controllers/visitorController");
var bookingController = require("./controllers/bookingController");
var registeredUserController = require("./controllers/registeredUserController");
var Place = require("./models/Place");
var Trip = require("./models/Trip");
var anEvent = require("./models/Event");
var mongoose = require("mongoose");
var Profile = require("./models/Profile");
var RegisteredUser = require("./models/RegisteredUser");

	router.get('/',function(req,res){
		res.sendFile('home.html',{root:"./views"});
	})

	router.get('/visitor/SignUp',function(req,res){
		res.sendFile('signup.html',{root:"./views"});
	});

	router.get('/visitor/RequestPage',function(req,res){
		res.sendFile('requestPage.html',{root:"./views"});
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

	router.get('/a',function(req,res){
		res.send("hey");
	});

	router.get('/visitor/viewBusinessPage',function(req,res){
		res.sendFile('viewBusinessPage.html', { root:"./views" });
	});

	router.post('/visitor/searchBusinessPages', visitorController.searchBusinessPages);

	router.post('/visitor/searchBusinessPages.json', function (req,res) {
		res.json(req.session.data);
	});


	router.get('/visitor/login', function(req,res){
		res.sendFile('login.html', { root:"./views" });
	});

	router.post('/visitor/login', registeredUserController.logIn);

	router.post('/visitor/searchBusinessPages', visitorController.searchBusinessPages);
	router.get('/visitor/popularBusinessPages', visitorController.popularBusinessPages);



/*
	router.post('/charge', function(req, res) {
	console.log(req);
	    var stripeToken = req.body.id;

	    var charge = stripe.charges.create({
	        amount: 10000, // amount in cents, again
	        currency: "usd",
	        card: stripeToken,
	        description: "email@email.com"
	    }, function(err, charge) {
	        if (err && err.type === 'StripeCardError') {
	            console.log(JSON.stringify(err, null, 2));
	        }
	        res.send("completed payment!");
	    });
	});
*/


	router.post('/booking/charge', bookingController.charge);
  	router.post('/booking/tripPay', bookingController.tripPay);
  	router.post('/booking/placePay', bookingController.placePay);

	router.post('/booking/placeBook2View', function(req,res){
		req.session.data.eventId = req.body.eventId;
		res.sendFile('placeBook2View.html', { root:"./views" });
	});

	router.get('/booking/placeBook2View.json', function(req,res){
		Place.findOne({anEvent: req.session.data.eventId}, function (err, place) {
			res.json({openingTimes:place.openingTimes});
		});
		// req.session.data.placeId = req.body.eventId;
		// res.sendFile('placeBook2View.html', { root:"./views" });
	});

	router.post('/booking/placeBook2', bookingController.placeBook2);

	router.post('/booking/tripBook2', bookingController.tripBook2);

	router.post('/owner/register', ownerController.register);
	router.post('/requestBusinessPage', pendingRequestsController.requestsPageCreation);
	router.get('/owner/viewProfile', ownerController.viewProfile);
	router.post('/owner/editProfile', ownerController.editProfile);
	router.get('/owner/ownerViewsBusinessPage',function(req,res){
		res.sendFile('viewBusinessPage.html', { root:"./views" });
	});

	router.get('/owner/ownerViewsBusinessPage.json',ownerController.ownerViewsBusinessPage);

	router.get('/owner/editBusinessPage',function(req,res){
		res.sendFile('editBusinessPage.html', { root:"./views" });
	});

	router.get('/owner/editBusinessPage.json',function(req,res){
		res.json(req.session.data.BusinessPage);
	});

	router.post('/owner/editBusinessPage',ownerController.editBusinessPage);


	router.get('/owner/addPlace',function(req,res){
		res.sendFile('addPlace.html', { root:"./views" });
	});
	router.post('/owner/addPlace',ownerController.addPlace);

	router.post('/owner/editPlace',function(req,res){
		req.session.data.eventID = req.body._id;
		res.sendFile('editPlace.html', { root:"./views" });
	});

	router.get('/owner/editPlace.json',function(req,res){
		let id = req.session.data.eventID;
		anEvent.findOne({_id:id},function(err,AnEvent){
			if(err)
				res.send(err.message)
			else{
				Place.findOne({anEvent:id},function(err,place){
					if(err)
						res.send(err.message);
					else {
						res.json({"event":AnEvent,"place":place});
					}
				})
			}
		});

	});
	router.post('/owner/editPlace.post',ownerController.editPlace);


	router.get('/owner/addTrip',function(req,res){
		res.sendFile('addTrip.html', { root:"./views" });
	});
	router.post('/owner/addTrip',ownerController.addTrip);

	router.post('/owner/editTrip',function(req,res){
		req.session.data.eventID = req.body._id;
		res.sendFile('editTrip.html', { root:"./views" });
	});

	router.get('/owner/editTrip.json',function(req,res){
		let id = req.session.data.eventID;
		anEvent.findOne({_id:id},function(err,AnEvent){
			if(err)
				res.send(err.message)
			else{
				Trip.findOne({anEvent:id},function(err,trip){
					if(err)
						res.send(err.message);
					else {
						res.json({"event":AnEvent,"trip":trip});
					}
				})
			}
		});

	});
	router.post('/owner/editTrip.post',ownerController.editTrip);

	router.post('/owner/removePlace',ownerController.removePlace);
	router.post('/owner/removeTrip',ownerController.removeTrip);

	router.get('/logOut', ownerController.ownerLogsOut);

	router.get('/actor.json',function(req,res){
		let actor="";
		if(req.session==undefined){
			actor = "visitor";
		}else{
			if(req.session.data==undefined)
				actor = "visitor"
			else {
				if(req.session.data.UserID==undefined){
					actor = "visitor"
				}
				else{
					if(req.session.data.Profile.isRegisteredUser)
						actor = 'user'
					else {
						actor = 'owner'
					}
				}
			}
		}
		res.json({"actor":actor});
	})

	router.post('/viewsBusinessPage',function(req,res){
		if(req.session==undefined){
			actor = "visitor";
			req.session.data = req.body._id
		}else{
			if(req.session.data==undefined){
				actor = "visitor"
				req.session.data = req.body._id
			}
			else {
				if(req.session.data.UserID==undefined){
					actor = "visitor"
					req.session.data = req.body._id
				}
				else{
					actor = 'user'
					req.session.data.businessPageId = req.body._id
				}
			}
		}
		res.sendFile('viewBusinessPage.html', { root:"./views" });
	});

	router.get('/viewsBusinessPage.json',visitorController.viewsBusinessPage);

	router.post('/event.json',function(req,res){

	});

	router.post('/test', function(req,res){
		res.send(req.body);
	});

module.exports = router;
