const {
  ADMIN_ROLE,
  FIELD_ONLY_UPDATEABLE_BY_ADMIN_EVENTS,
} = require("../common/Constants");
const { createSeedEventLike } = require("../common/generalHelpers");
const asyncHandler = require("../middlewares/asyncHandler");
const Event = require("../models/Event");

const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create({
    ...req.body,
    comments: [],
  });

  if (event) {
    createSeedEventLike(event);
  }

  res.json({ message: event, status: "success" });
});

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentEvent = await Event.findById({ _id: id });

  let { comment } = req.body;

  comment = comment ?? {};

  if (
    Object.keys(req.body).some((elem) =>
      FIELD_ONLY_UPDATEABLE_BY_ADMIN_EVENTS.includes(elem)
    ) &&
    req.user.role !== ADMIN_ROLE
  ) {
    res.json({
      message: "Only Admin Can Perform This Action",
      status: "Error",
    });
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
      comments: [
        ...currentEvent?.comments,
        { ...comment, uuid: crypto.randomUUID() },
      ],
    },
    { new: true, runValidators: true }
  );

  res.json({ message: updatedEvent, status: "success" });
});

module.exports = { createEvent, updateEvent };
