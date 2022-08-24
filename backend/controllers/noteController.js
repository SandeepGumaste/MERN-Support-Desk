const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// @desc get notes for a ticket
//  @route GET /api/tickets/:ticketId/notes
// @access private

const getNotes = asyncHandler(async (req, res) => {
  // get User using id and jwt

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticketId = req.params.ticketId;
  const ticket = await Ticket.findById(ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const notes = await Note.find({ ticket: ticketId });
  res.status(200).json(notes);
});

// @desc create ticket note
//  @route POST /api/tickets/:ticketId/notes
// @access private

const addNote = asyncHandler(async (req, res) => {
  // get User using id and jwt

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticketId = req.params.ticketId;
  const ticket = await Ticket.findById(ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const note = await Note.create({
    ticket: ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
