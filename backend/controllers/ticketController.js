const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get user tickets
//  @route GET /api/tickets
// @access private

const getTickets = asyncHandler(async (req, res) => {
  // get User using id and jwt

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc get single ticket
//  @route GET /api/tickets/:id
// @access private

const getSingleTicket = asyncHandler(async (req, res) => {
  // get User using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  res.status(200).json(ticket);
});

// @desc get user tickets
//  @route POST /api/tickets
// @access private

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add product and description");
  }

  // get User using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc delete user ticket
//  @route Delete /api/tickets
// @access private

const deleteTicket = asyncHandler(async (req, res) => {
  // get User using id and jwt

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

// @desc patch user ticket
//  @route PUT /api/tickets
// @access private

const updateTicket = asyncHandler(async (req, res) => {
  // get User using id and jwt

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getSingleTicket,
  deleteTicket,
  updateTicket,
};
