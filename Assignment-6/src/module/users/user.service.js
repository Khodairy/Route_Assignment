import { userModel } from "../../DB/models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    const { fname, lname, email, password, gender, age } = req.body;

    const user = await userModel.create({
      fname,
      lname,
      email,
      password,
      gender,
      age,
    });
    res.status(201).json({ message: "created", user });
  } catch {}
};
