import colors from "colors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// mongoose
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export default connectDB(async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ username }, { email: username.toLowerCase() }],
    }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    user = user.toObject();
    delete user.password;
    return res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
