const { Schema, model } = require("mongoose");

const eventLikeSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  count: {
    type: Number,
  },
});

module.exports = model("EventLike", eventLikeSchema);
