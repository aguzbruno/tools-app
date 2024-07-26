// pages/api/shopping-list/index.ts
import dbConnect from '../lib/mongoose';
import Product from '../models/Product';
import { NextRequest, NextResponse } from 'next/server';

let shoppingList: any[] = [];

export async function GET() {
  await dbConnect();

  return NextResponse.json({ success: true, data: shoppingList });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { productId } = await req.json();
    const product = await Product.findById(productId);
    if (product) {
      shoppingList.push(product);
      return NextResponse.json({ success: true, data: shoppingList });
    } else {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { productId } = await req.json();
    shoppingList = shoppingList.filter((item) => item._id.toString() !== productId);
    return NextResponse.json({ success: true, data: shoppingList });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
