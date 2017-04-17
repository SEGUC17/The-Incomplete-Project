let PendingRequest = require("../models/PendingRequest");



let pendingRequestsController = {

    requestsPageCreation:function(req,res) {
      let body = req.body;
      // console.log(req);
      let pendingRequest = new PendingRequest(req.body)
      pendingRequest.save(function(err, pendingRequest) {
        if (err) {
          // console.log("no");
          // console.log(err);
          res.send(err.message);
        }else {
          // console.log("bla");
          res.send("done");
          // tell the visitor (not an owner yet) that the request has been sent
        }
      })

    }
}

module.exports = pendingRequestsController;
