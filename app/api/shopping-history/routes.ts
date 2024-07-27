// app/api/shopping-history/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../lib/mongoose';
import ShoppingHistory from '../models/ShoppingHistory';

export async function GET() {
  await dbConnect();
  const history = await ShoppingHistory.find().populate('products');
  return NextResponse.json(history);
}
