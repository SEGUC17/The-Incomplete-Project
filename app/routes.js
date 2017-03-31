module.exports = function(app,mongoose) {


	var express = require('express');
    var http = require('http');






	app.get('/api/me', passport.authenticate('basic', { session: false }), function(req, res) {
		res.json(req.user);
	});








































};