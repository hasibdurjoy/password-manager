// app/api/items/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import Item from "../models/Item";
import { authenticate } from "../middleware/authenticate";

const handler = async (request: any) => {
  await dbConnect();
  try {
    const userId = request.userId; // Get the userId from the request object
    const items = await Item.find({ userId: userId }); // Query items by userId

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
};

export const GET = authenticate(handler);

const PostHandler = async (request: any) => {
  await dbConnect();
  try {
    const userId = request.userId;
    const { username, password, type, name } = await request.json();
    if (!username || !password || !type || !name) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const item = new Item({
      username,
      password,
      type,
      name,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await item.save();
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
};

export const POST = authenticate(PostHandler);
