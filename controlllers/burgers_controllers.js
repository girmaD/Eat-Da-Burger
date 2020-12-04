const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
// get route that retrieves all the burgers in the database
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      const burgerObj = {
        burgers: data
      };
    //   console.log(burgerObj);
      res.render("index", burgerObj);
    });
});
// post route - for adding a burger in the database
router.post("/api/burgers", function(req, res) {
    burger.insertOne(['burger_name', 'devoured'], [req.body.name, 0], function(result) {
      // Send back the ID of the new quote
      console.log(result); //i added this out of curiosity
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
       
    burger.updateOne (
        {
            devoured: req.body.devoured
        }, 
        condition,
        function(result) {
            console.log(result)//added out of curiosity
            if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
            }
            res.status(200).end();  
        }
    );
});

// Export routes for server.js to use.
module.exports = router;