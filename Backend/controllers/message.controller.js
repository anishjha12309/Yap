import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: image || "",
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    // Mark unread messages as read
    // Filter messages sent by the other user that are not read
    const unreadMessagesIds = messages
      .filter((msg) => msg.senderId.toString() !== senderId.toString() && !msg.isRead)
      .map((msg) => msg._id);

    if (unreadMessagesIds.length > 0) {
      await Message.updateMany(
        { _id: { $in: unreadMessagesIds } },
        { $set: { isRead: true } }
      );
      
      // Emit event to the other user that we read their messages
      const otherUserSocketId = getReceiverSocketId(userToChatId);
      if (otherUserSocketId) {
        io.to(otherUserSocketId).emit("messagesRead", unreadMessagesIds);
      }
    }

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only sender can delete their message
    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this message" });
    }

    // Get receiverId before deleting
    const receiverId = message.receiverId;

    // Remove from conversation
    await Conversation.updateMany(
      { messages: messageId },
      { $pull: { messages: messageId } }
    );

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    // Notify the receiver via socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addReaction = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id;

    if (!emoji) {
      return res.status(400).json({ error: "Emoji is required" });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if user already reacted with this emoji - toggle it
    const existingReactionIndex = message.reactions.findIndex(
      (r) => r.userId.toString() === userId.toString() && r.emoji === emoji
    );

    if (existingReactionIndex > -1) {
      // Remove reaction (toggle off)
      message.reactions.splice(existingReactionIndex, 1);
    } else {
      // Add reaction
      message.reactions.push({ emoji, userId });
    }

    await message.save();

    // Notify both sender and receiver
    const otherUserId = message.senderId.toString() === userId.toString() 
      ? message.receiverId 
      : message.senderId;
    
    const otherSocketId = getReceiverSocketId(otherUserId);
    if (otherSocketId) {
      io.to(otherSocketId).emit("messageReaction", {
        messageId,
        reactions: message.reactions
      });
    }

    res.status(200).json({ reactions: message.reactions });
  } catch (error) {
    console.log("Error in addReaction controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
