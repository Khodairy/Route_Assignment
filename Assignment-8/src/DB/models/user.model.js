import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name not found"],
    },
    email: { type: String, unique: true, required: [true, "email not found"] },
    password: { type: String, required: [true, "Password not found"] },
    phone: { type: String, required: [true, "Phone not found"] },
    age: { type: Number, min: 18, max: 60 },
  },
  {
    strict: true,
    timestamps: true,
    strictQuery: true,
  },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
