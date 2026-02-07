import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title not found"],
      validate: {
        validator: function (v) {
          return v !== v.toUpperCase();
        },
        message: (props) => `${props.value} must not be entirely uppercase!`,
      },
    },
    content: { type: String, required: [true, "the content not found"] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "UserId not found"],
    },
  },
  {
    strict: true,
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const notesModel =
  mongoose.models.notes || mongoose.model("notes", notesSchema);

export default notesModel;
