import { userModel } from "../../DB/models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    const { full_name, email, password, role, age } = req.body;

    // =================== cheack the email  not exist before =============
    const isExist = await userModel.findOne({
      where: { email: email },
    });

    if (isExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // =================== store user in DB =============
    const user = userModel.build({
      full_name,
      email,
      password,
      role,
      age,
    });
    await user.save();

    res.status(201).json({ message: "created", user });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const update_or_created_user_by_id = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, email, password, role, age } = req.body;

    const user = await userModel.findByPk(id);
    if (user === null) {
      // user not exist
      // ======================= create new user ============================

      // =========== cheack the email  not exist before ==========
      const isExist = await userModel.findOne({
        where: { email: email },
      });

      if (isExist) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const newUser = userModel.build({
        full_name,
        email,
        password,
        role,
        age,
      });
      await newUser.save({ validate: false });

      return res.status(201).json({ message: "created", newUser });
    } else {
      // ======================= user already exist =======================
      await user.update({ full_name, email, role, age }, { validate: false });
      return res
        .status(200)
        .json({ message: "User updated Successfully", user });
    }
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error Updating user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    console.log(email);

    const user = await userModel.findOne({ where: { email } });
    if (user === null) {
      return res
        .status(404)
        .json({ message: `no user found by email: ${email}` });
    } else {
      return res.status(200).json({ message: "done", user });
    }
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error finding user",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByPk(id);
    if (user === null) {
      console.log("User Not found!");
      return res
        .status(404)
        .json({ message: `User not found by this id: ${id}` });
    } else {
      return res.status(200).json({ message: "done", user });
    }
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error finding user",
      error: error.message,
      stack: error.stack,
    });
  }
};
