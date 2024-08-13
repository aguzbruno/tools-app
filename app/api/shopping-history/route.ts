import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../lib/mongoose'; // Ajusta la ruta según sea necesario
import ShoppingHistory from '../models/ShoppingHistory';
import Product from '../models/Product';

export async function GET() {
  await dbConnect();
  try {
    const history = await ShoppingHistory.find().populate({
      path: 'products',
      model: Product,
      select: 'name quantity price',
    });

    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {
    const { products, image } = await req.json();
    const existingProducts = await Product.find({ '_id': { $in: products } });

    if (existingProducts.length !== products.length) {
      throw new Error('One or more products do not exist');
    }

    const newHistory = new ShoppingHistory({
      products: existingProducts,
      image, // Base64 string
    });

    await newHistory.save();

    return NextResponse.json({ success: true, data: newHistory });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}