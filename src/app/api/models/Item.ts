// models/Item.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IItem extends Document {
  name: string;
  type: string;
  username: string;
  password: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema<IItem> = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this item."],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type for this item."],
  },
  username: {
    type: String,
    required: [true, "Please provide a username for this item."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password for this item."],
  },
  userId: {
    type: String,
    required: [true, "Please provide a password for this item."],
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide a password for this item."],
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: [true, "Please provide a password for this item."],
    default: new Date(),
  },
});

const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;
