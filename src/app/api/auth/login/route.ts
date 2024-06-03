// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function POST(request: Request) {
  console.log("calling");

  await dbConnect();

  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user._id },
    "dhdhdhdhdhjjhdjdfdjfdjfdfdfdhf",
    {
      expiresIn: "1h",
    }
  );

  return NextResponse.json({ success: true, token });
}
