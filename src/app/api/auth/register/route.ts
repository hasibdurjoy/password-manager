// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, password, email, name, age } = await request.json();

  if (!username || !password || !email || !name || !age) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    email,
    name,
    age,
  });

  await user.save();

  return NextResponse.json({ success: true, data: user });
}
