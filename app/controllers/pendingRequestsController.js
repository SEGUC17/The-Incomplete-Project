let PendingRequest = require("../models/PendingRequest");



let pendingRequestsController = {

    requestsPageCreation:function(req,res) {
      let body = req.body;
      let pendingRequest = new PendingRequest(req.body)
      pendingRequest.save(function(err, pendingRequest) {
        if (err) {
          res.send(err.message);
        }else {
          res.send("done");
        }
      })

    }
}

module.exports = pendingRequestsController;
