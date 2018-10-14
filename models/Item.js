const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema(
  {
    name: String,
    description: String,
    price: String,
    currency: String,
    type: { type: String, enum: ["Accessories", "Pets", "Backgrounds"] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
