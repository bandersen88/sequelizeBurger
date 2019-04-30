
var db = require("../models");

module.exports = function(app) {

app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
        var hbsObject = {
            burger: dbBurger
          };
        res.render("index", hbsObject);
    })
});

// How do I get this to refresh the page?
app.post("/api/burgers", function(req,res) {
    db.Burger.create({
        burger_name: req.body.name
    }).then(function(result) {
        // For some reason this isn't working
        if (!result._options.isNewRecord) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
        }
    );
});


app.put("/api/burgers/:id", function(req,res) {
    db.Burger.update({
        devoured: req.body.devour
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(function(result) {
        res.json(result);
    });
});

};

