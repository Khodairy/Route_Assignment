import { db } from "../../DB/connectionDB.js";
import bookModel from "../../DB/models/book.model.js";
import logsModel from "../../DB/models/logs.model.js";

export const createBook = async (req, res, next) => {
  try {
    const { title, author, year, genres } = req.body;
    const book = await bookModel.insertOne({ title, author, year, genres });

    const Book = {
      title,
      author,
      year,
      genres,
      createdAt: new Date(),
    };

    return res
      .status(201)
      .json({ massage: "Book has been created successfully", Book });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating a new book",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createIndex = async (req, res, next) => {
  try {
    await db.collection("books").createIndex({ title: 1 });

    return res
      .status(201)
      .json({ massage: "Index 'title_1' created successfully" });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating index",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createManyBook = async (req, res, next) => {
  try {
    const books = req.body;

    const result = await bookModel.insertMany(books);

    return res.status(201).json({ result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating new many book",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { title } = req.params;
    const { year } = req.body;

    const result = await bookModel.updateOne(
      { title: title },
      { $set: { year } },
    );

    return res.status(201).json({ result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error updating the year of this book",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBook = async (req, res, next) => {
  try {
    const { title } = req.params;

    const result = await bookModel.find({ title }).toArray();

    return res.status(201).json({ message: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving the book",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithRangeOfYear = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    console.log(from, to);

    const result = await bookModel
      .find({ year: { $gte: from, $lte: to } })
      .toArray();

    return res.status(201).json({ message: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;
    console.log(genre);

    if (!genre) {
      return res.status(400).json({ message: "Genre is required" });
    }

    const genreArray = genre.split(",");

    const result = await bookModel
      .find({ genres: { $in: [genreArray] } })
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithLimit = async (req, res, next) => {
  try {
    const result = await bookModel
      .aggregate([
        { $sort: { year: -1 } },
        { $skip: 2 },
        { $limit: 3 },
        //{ $project: { title: 1, year: 1, author: 1, genres: 1, _id: 0 } },
      ])
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithInteger = async (req, res, next) => {
  try {
    const result = await bookModel
      .aggregate([
        {
          $match: { year: { $type: "int" } },
        },
      ])
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWith_excludeGenresr = async (req, res, next) => {
  try {
    const result = await bookModel
      .find({
        genres: { $nin: ["Horror", "Science Fiction"] },
      })
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const DeleteBookWithYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const result = await bookModel.deleteOne({ year: { $eq: year } });

    return res.status(201).json({ messageee: "Deleted", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error deleting the book",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithAggregate_1 = async (req, res, next) => {
  try {
    const result = await bookModel
      .aggregate([
        { $match: { year: { $gt: "2000" } } },
        { $sort: { year: -1 } },
      ])
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithAggregate_2 = async (req, res, next) => {
  try {
    const result = await bookModel
      .aggregate([
        { $match: { year: { $gt: "2000" } } },
        { $project: { title: 1, author: 1, year: 1, _id: 0 } },
      ])
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithAggregate_3 = async (req, res, next) => {
  try {
    const result = await bookModel
      .aggregate([
        { $unwind: "$genres" },
        { $project: { title: 1, genres: 1, _id: 0 } },
      ])
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBookWithAggregate_4 = async (req, res, next) => {
  try {
    const result = await logsModel
      .aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details",
          },
        },
        {
          $project: {
            _id: 0,
            book_id: 0,
          },
        },
      ])
      .toArray();

    return res.status(201).json({ messageee: "Done", result });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retriving there books",
      error: error.message,
      stack: error.stack,
    });
  }
};
