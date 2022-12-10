const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const Info = require("../models/InfoModel");
// const User = require('../models/userModel')

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setInfo = asyncHandler(async (req, res) => {
  console.log("I got server 1", req.body);

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  console.log("I got server", req.user.id);

  const info = await Info.create({
    user: req.user.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    bank: req.body.bank,
    account: req.body.account,
    acc_name: req.body.acc_name,
  });

  res.status(200).json(info);
});

module.exports = {
  setInfo,
};
