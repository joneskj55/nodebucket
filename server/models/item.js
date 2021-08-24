/*
============================================
; Title:  item.js
; Author: Professor Krasso
; Modified By: Kevin Jones
; Date: 23 Aug 2021
; Description: Item model
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the item schema
let itemSchema = new Schema({
  text: { type: String },
});

module.exports = itemSchema;
