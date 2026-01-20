import { commentModel } from "../../DB/models/comments.model.js";
import { postModel } from "../../DB/models/posts.model.js";
import { userModel } from "../../DB/models/user.model.js";
import { sequelize } from "../../DB/connectionDB.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;

    // =================== store user in DB =============
    const newPost = postModel.build({
      title,
      content,
      userId,
    });
    await newPost.save();

    res.status(201).json({ message: "created a new post", newPost });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error creating new post",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // =========== cheack the post exist ==========
    const post = await postModel.findOne({ where: { id: postId } });

    if (post === null) {
      return res.status(404).json({ message: "post not found" });
    }

    // =========== cheack user has access to delete ==========
    if (post.userId != userId) {
      return res.status(403).json({ message: "You are not authorized" });
    } else {
      // =========== Delete Successfully ===========
      await postModel.destroy({
        where: {
          id: postId,
        },
      });

      return res.status(200).json({ message: "deleted post successfully" });
    }
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error deleting post",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getUsersWithPosts = async (req, res, next) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: userModel,
          attributes: [["full_name", "name"]],
        },
        {
          model: commentModel,
          attributes: ["id", ["context", "content"]],
        },
      ],
    });

    return res.status(200).json({
      posts,
      //   comment: { id: "1", content: "the content of comment" },
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retrive Users With Posts",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getPostsWithCommentsCount = async (req, res, next) => {
  try {
    const posts = await postModel.findAll({
      attributes: [
        "id",
        "title",
        [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentsCount"],
      ],
      include: [
        {
          model: commentModel,
          attributes: [],
        },
      ],
      group: ["id"],
    });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    // =================== Handle Errors =============
    return res.status(500).json({
      message: "Error retrive Users With Posts",
      error: error.message,
      stack: error.stack,
    });
  }
};
