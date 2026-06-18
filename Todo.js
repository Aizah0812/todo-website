import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      default: "Medium",
    },
    category: {
      type: String,
      default: "General",
    },
    notes: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
