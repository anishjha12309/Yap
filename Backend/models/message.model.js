import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    reactions: [{
      emoji: { type: String, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }],
    // createdAt, updatedAt
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
