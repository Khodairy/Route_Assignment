import logsModel from "../../DB/models/logs.model.js";

export const createLogs = async (req, res, next) => {
  try {
    const { book_id, action } = req.body;
    const result = await logsModel.insertOne({ book_id, action });

    return res
      .status(201)
      .json({ massage: "New user has been logged in successfully", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error log successfully",
      error: error.message,
      stack: error.stack,
    });
  }
};
