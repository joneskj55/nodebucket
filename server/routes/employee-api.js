// Add attribution
// Attribution
// Attribution

const express = require("express");
const Employee = require("../models/employee");

const router = express.Router();

// get employee by id
router.get("/:empId", async (req, res) => {
  // add comments here
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      // add comments
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "MongoDB server error: " + err.message,
        });
      }
      // add comments
      else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    // comments
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

module.exports = router;
