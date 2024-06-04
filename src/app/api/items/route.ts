// app/api/items/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import Item from "../models/Item";

export async function GET() {
  await dbConnect();
  try {
    const items = await Item.find({});
    console.log(items);

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
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
      userId: "user id",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await item.save();
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
