import userModel from "../../DB/models/user.model.js";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, phone, age } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(409).json({ massage: "Email already exists" });
    }
    const user = await userModel.create({ name, email, password, phone, age });

    // ============== Unlocking the phone ==============
    // const encryptedPhone = user.phone;
    // const bytes = CryptoJS.AES.decrypt(encryptedPhone, "secret_key_123");
    // const originalPhone = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(originalPhone);
    // =================================================

    return res
      .status(201)
      .json({ massage: "New user has been created successfully", user });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating a new user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ======= search if the email exist =======
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // ======= search if the password matching =======
    const isMatch = bcrypt.compareSync(password, user.password);
    console.log("Is Match Result:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ======= Creating token =======
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secret_key", // Secret key
      { expiresIn: "1h" }, // for 1 hour
    );

    return res.status(200).json({ massage: "Login Successfully", token });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const update = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    if (email) {
      const isEmailExist = await userModel.findOne({
        email,
        _id: { $ne: userId },
      });
      if (isEmailExist) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, age },
      { new: true, runValidators: true }, // return data after updating
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User Updated successfully", user: updatedUser });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error updating the user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleting = async (req, res, next) => {
  try {
    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted",
      deletedUser,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error deleting the user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error deleting the user",
      error: error.message,
      stack: error.stack,
    });
  }
};
