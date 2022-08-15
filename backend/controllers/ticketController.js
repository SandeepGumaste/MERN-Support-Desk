const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ticket = require("../models/ticketModel");

// @desc get user tickets
//  @route GET /api/tickets
// @access private

const getTickets = asyncHandler(async (req, res) => {
  // get User using id and jwt
  res.status(200).json({
    message: "getTickets",
  });
});

// @desc get user tickets
//  @route POST /api/tickets
// @access private

const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "createTickets",
  });
});

module.exports = { getTickets, createTicket };
