const asyncHandler = require("../middlewares/asyncHandler");
const Event = require("../models/Event");
const EventLikeModel = require("../models/EventLikeModel");
const { ObjectID } = require("mongodb");

const createALike = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const _id = new ObjectID(eventId);

  const event = await Event.findOne({ _id });

  if (!event) {
    res.json({ message: "No Such Event", status: "Error" });
  }

  const updatedEvent = await EventLikeModel.findByIdAndUpdate(
    { eventId },
    { count: event.count + 1 },
    { new: true }
  );

  res.json({ message: updatedEvent, status: "Error" });
});

module.exports = { createALike };
