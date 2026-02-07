import mongoose from "mongoose";
import notesModel from "../../DB/models/notes.model.js";
import userModel from "../../DB/models/user.model.js";

export const singleNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const userExist = await userModel.findById(userId);
    if (!userExist) {
      return res.status(404).json({ massage: "user not exist" });
    }
    const notes = await notesModel.create({ title, content, userId });

    return res
      .status(201)
      .json({ massage: "New note has been created successfully", notes });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating a new note",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const { noteId } = req.params;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not the owner" });
    }

    const newNote = await notesModel.findOneAndUpdate(
      { _id: noteId, userId: userId },
      { title, content },
      { new: true },
    );
    return res.status(200).json({ massage: "Updated", note });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error updating the note",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const replaceNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const { noteId } = req.params;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not the owner" });
    }

    const newNote = await notesModel.findOneAndReplace(
      { _id: noteId },
      { title, content, userId },
      { new: true },
    );
    return res.status(200).json({ massage: "replaced", note: newNote });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error replace the note",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateAllNotes = async (req, res, next) => {
  try {
    const { title } = req.body;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const newNotes = await notesModel.updateMany(
      { userId },
      { $set: { title: title } },
    );

    if (newNotes.matchedCount === 0) {
      return res.status(404).json({
        message: "No notes found for this user to update",
      });
    }

    return res.status(200).json({
      massage: "All titles updated successfully",
      updatedCount: newNotes.modifiedCount,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error updating the title of notes",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deletingNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not the owner" });
    }

    const newNote = await notesModel.findOneAndDelete(
      { _id: noteId, userId: userId },
      { new: true },
    );
    return res.status(200).json({ massage: "deleted", newNote });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error deleting the note",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const retriveNotes = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const notes = await notesModel
      .find({ userId })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json(notes);
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the notes",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const retriveNote_ById = async (req, res, next) => {
  try {
    let { noteId } = req.params;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const note = await notesModel.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not the owner" });
    }

    return res.status(200).json(note);
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the notes",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const retriveNotes_byContent = async (req, res, next) => {
  try {
    const { content } = req.query;

    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const notes = await notesModel.find({ userId, content });

    if (notes.length === 0) {
      return res.status(404).json({
        message: "No notes found",
      });
    }

    return res.status(200).json(notes);
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the notes",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const retriveNotes_withUser = async (req, res, next) => {
  try {
    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const notes = await notesModel
      .find({ userId })
      .select("title userId createdAt")
      .populate({
        path: "userId",
        select: "email -_id",
      });

    if (notes.length === 0) {
      return res.status(404).json({
        message: "No notes found",
      });
    }

    return res.status(200).json(notes);
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the notes",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const retriveNotes_withAggregate = async (req, res, next) => {
  try {
    const { title } = req.query;
    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const notes = await notesModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          title: title,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          title: 1,
          userId: 1,
          createdAt: 1,
          user: {
            name: "$userDetails.name",
            email: "$userDetails.email",
          },
        },
      },
    ]);

    if (notes.length === 0) {
      return res.status(404).json({
        message: "No notes found",
      });
    }

    return res.status(200).json(notes);
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the notes",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleting_AllNotes = async (req, res, next) => {
  try {
    // destract from the token that entered in Headers
    const userId = req.user.userId;

    const notes = await notesModel.deleteMany({ userId });

    if (notes.deletedCount === 0) {
      return res.status(404).json({
        message: "No notes found to delete",
        deletedCount: 0,
      });
    }

    return res
      .status(200)
      .json({ massage: "deleted", deletedCount: notes.deletedCount });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error deleting the notes",
      error: error.message,
      stack: error.stack,
    });
  }
};
