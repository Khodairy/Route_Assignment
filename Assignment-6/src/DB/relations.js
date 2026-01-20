import { commentModel } from "./models/comments.model.js";
import { postModel } from "./models/posts.model.js";
import { userModel } from "./models/user.model.js";

// ============ relation between user & posts ===========
userModel.hasMany(postModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

postModel.belongsTo(userModel, {
  foreignKey: "userId",
});

// ============ relation between user & comments ===========
userModel.hasMany(commentModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

commentModel.belongsTo(userModel, {
  foreignKey: "userId",
});

// ============ relation between comments & posts ===========
postModel.hasMany(commentModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "postId",
    allowNull: false,
  },
});

commentModel.belongsTo(postModel, {
  foreignKey: "postId",
});
