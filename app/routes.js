var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
    res.render('home');
});

router.get('/pay', function(req, res) {
    res.render('pay');
});

router.get('/paysuccess', function(req, res) {
  //  res.render('paysuccess');
});

router.post('/charge', function(req, res) {

  var token= req.body.stripeToken;
  var chargeAmount= req.body.chargeAmount;

  var charge= stripe.charges.create({
    amount:chargeAmount,
    currency:"egp",
    source:token
  },function(err,charge){
    if(err & err.type==="StripeCardError") {
      console.log("Declined");
    }
    res.redirect(home);
  });



});


module.exports = router;
