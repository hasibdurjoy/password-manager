// app/api/user/details.ts
import { authenticate } from "../middleware/authenticate";
import { NextResponse } from "next/server";
import User from "../models/User";
import dbConnect from "../lib/dbConnect";

const getUserDetails = async (request: any) => {
  await dbConnect();

  try {
    const userId = request.userId;

    const user = await User.findById(userId).select("-password"); // Assuming password field exists, exclude it

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const GET = authenticate(getUserDetails);

const updateUserProfile = async (request: any) => {
  await dbConnect();

  try {
    const userId = request.userId;
    const { username, email, name, age } = await request.json();

    if (!username || !email) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, name, age, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const PUT = authenticate(updateUserProfile);
