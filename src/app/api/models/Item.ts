// models/Item.ts
import mongoose, { Model } from "mongoose";

export interface IItem extends mongoose.Document {
  name: string;
  type: string;
  username: string;
  password: string;
}

const ItemSchema = new mongoose.Schema<IItem>({
  name: {
    type: String,
    required: [true, "Please provide a name for this item."],
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  type: {
    type: String,
    required: [true, "Please provide a name for this item."],
  },
  username: {
    type: String,
    required: [true, "Please provide a name for this item."],
  },
  password: {
    type: String,
    required: [true, "Please provide a name for this item."],
  },
});

const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;
