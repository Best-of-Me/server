const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const userSchema = new Schema(
  {
    username: String,
    password: String,
    level: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    experienceNextLevel: { type: Number, default: 0 },
    items: [
      { type: ObjectId, ref: "Item" },
      {
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at"
        }
      }
    ],
    tasks: [{ type: ObjectId, ref: "Task" }],
    background: { type: ObjectId, ref: "Item" },
    pet: { type: ObjectId, ref: "Item" },
    accessory: { type: ObjectId, ref: "Item" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
