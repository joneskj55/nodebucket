/*
  Add attribution
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our employee schema
let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", employeeSchema);
