const asyncHandler = require("../middlewares/asyncHandler");
const Event = require("../models/Event");

const createEvent = asyncHandler(async (req, res) => {
  let { comments } = req.body;

  comments = comments ?? [];

  if (
    comments.length &&
    comments.some(({ comment, email }) => !email || !comment)
  ) {
    res.json({
      message: "Email Or Comment Message Is Missing In Atleast One Comment",
      status: "Error",
    });
  }

  const uniqueComments =
    comments &&
    comments.map(({ comment, email }) => {
      return { comment, email, uuid: crypto.randomUUID() };
    });

  const event = await Event.create({
    ...req.body,
    comments: [...uniqueComments],
  });

  res.json({ message: event, status: "success" });
});

module.exports = { createEvent };
