import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, username, profilePic } = req.body;

    // Validation
    if (!fullName || !username) {
      return res.status(400).json({ error: "Full Name and Username are required" });
    }

    // Check if username is taken (if changed)
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        username,
        profilePic: profilePic || "", // Allow empty profile pic to revert to default
      },
      { new: true } // Return updated document
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUserProfile: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
