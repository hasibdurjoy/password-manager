// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide your name."],
  },
  age: {
    type: Number,
    required: [true, "Please provide your age."],
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
