import authorModel from "../../DB/models/author.model.js";

export const createAuthor = async (req, res, next) => {
  try {
    const { name, nationality } = req.body;
    const author = await authorModel.insertOne({ name, nationality });

    const newAuthor = {
      name,
      nationality,
    };

    return res
      .status(201)
      .json({ massage: "New Author has been created successfully", newAuthor });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating a new Author",
      error: error.message,
      stack: error.stack,
    });
  }
};
