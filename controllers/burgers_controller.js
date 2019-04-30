var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function(req, res) {
    // console.log(req);
    burger.all(function(data) {
      var hbsObject = {
        burger: data
      };
      console.log("*************************");
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

router.put("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;
    burger.devour(
        {
            devourVal: req.body.devour
        },
        condition,
        function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
        }
    );
});

router.post("/api/burgers", function(req, res) {
    burger.create(req.body.name,req.body.devoured, function(result) {
        res.json({id: result.insertId});
    })
});

// Export routes for server.js to use.
module.exports = router;