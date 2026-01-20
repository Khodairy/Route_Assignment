import { commentModel } from "../../DB/models/comments.model.js";
import { postModel } from "../../DB/models/posts.model.js";
import { userModel } from "../../DB/models/user.model.js";
import { Op } from "sequelize";

export const createComments = async (req, res, next) => {
  try {
    const commentsArray = req.body;

    // ============== loop for posts & users id ====================
    const postIds = [...new Set(commentsArray.map((c) => c.postId))];
    const userIds = [...new Set(commentsArray.map((c) => c.userId))];

    // ========== check if any post id from commentsArray not found ==========
    const foundPosts = await postModel.count({ where: { id: postIds } });
    if (foundPosts !== postIds.length)
      return res.status(404).json({ message: "Some posts were not found" });

    // ========== check if any user id from commentsArray not found ==========
    const foundUser = await userModel.count({ where: { id: userIds } });
    if (foundUser !== userIds.length)
      return res.status(404).json({ message: "Some User were not found" });

    // ========== check that commentsArray isArray ==========
    if (!Array.isArray(commentsArray) || commentsArray.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of comments" });
    }

    const newComments = await commentModel.bulkCreate(commentsArray);

    res.status(201).json({
      message: "Bulk comments created successfully",
      count: newComments.length,
      newComments,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating new comments",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { userId, context } = req.body;

    const comment = await commentModel.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    const userIsExist = await userModel.findByPk(userId);
    // ======================= comment not found =======================
    if (!userIsExist) {
      return res.status(404).json({ message: "user not found" });
    }

    if (comment.userId === userId) {
      // ======================= comment already exist =======================
      await comment.update({ context });

      return res
        .status(200)
        .json({ message: "comment updated Successfully", comment });
    } else {
      return res.status(403).json({ message: "You are not authorized" });
    }
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error updating the comment",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const find_or_create = async (req, res, next) => {
  try {
    const { postId, userId, context } = req.body;

    // ========== check if any post id from commentsArray not found ==========
    const isPostExist = await postModel.findOne({ where: { id: postId } });

    if (isPostExist === null) {
      return res.status(404).json({ message: "this post not found" });
    }

    // ========== check if any user id from commentsArray not found ==========
    const isUserExist = await userModel.findOne({
      where: { id: userId },
    });

    if (isUserExist === null) {
      return res.status(404).json({ message: "user not found" });
    }

    // ============== find or create method ================
    const [comment, created] = await commentModel.findOrCreate({
      where: {
        context,
        postId,
        userId,
      },
      defaults: {
        context,
        postId,
        userId,
      },
    });

    return res.status(created ? 201 : 200).json({
      message: created
        ? "comment created successfully"
        : "comment retrived suucessfully",
      comment,
      created,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error update or create comment",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getBySearch = async (req, res, next) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res.status(400).json({ message: "Search word is required" });
    }

    const { count, rows } = await commentModel.findAndCountAll({
      where: { context: { [Op.like]: `%${word}%` } },
    });

    if (count === 0) {
      return res.status(200).json({ message: "no comments found" });
    }

    return res.status(200).json({
      count,
      comments: rows,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retrive search in comments",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getNewestPosts = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(Number(postId));

    if (isNaN(Number(postId))) {
      return res.status(400).json({ message: "please required postId" });
    }

    const comments = await commentModel.findAll({
      order: [["createdAt", "desc"]],
      limit: 3,
    });

    return res.status(200).json({
      comments,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retrive newest comments",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getCommentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await commentModel.findByPk(id, {
      attributes: ["id", ["context", "content"]],
      include: [
        {
          model: userModel,
          attributes: [["full_name", "name"], "email"],
        },
        {
          model: postModel,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: "no comment found" });
    }

    return res.status(200).json({ message: "done", comment });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retrive comment details",
      error: error.message,
      stack: error.stack,
    });
  }
};
