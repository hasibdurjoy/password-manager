// app/api/items/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Item from "../../models/Item";
import { authenticate } from "../../middleware/authenticate";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const item = await Item.findById(params.id);
    if (!item) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    // const userId = request.userId;
    const { username, password, type, name } = await request.json();

    if (!username || !password || !type || !name) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // Find the item and ensure it belongs to the authenticated user
    const item = await Item.findOneAndUpdate(
      { _id: params.id, },
      { username, password, type, name, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
/* const EditItemHandler = async (
  request: any,
  { params }: { params: { id: string } }
) => {
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

    // Find the item and ensure it belongs to the authenticated user
    const item = await Item.findOneAndUpdate(
      { _id: params.id, userId },
      { username, password, type, name, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};

export const PUT = authenticate(EditItemHandler); */

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedItem = await Item.deleteOne({ _id: params.id });
    if (!deletedItem) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
