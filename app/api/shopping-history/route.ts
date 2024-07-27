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
      select: 'name quantity price', // Selecciona solo los campos necesarios
    });

    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
// POST request handler to save the shopping list history
export async function POST(req: NextRequest) {
  await dbConnect();
  const { products } = await req.json(); // Expecting an array of product IDs

  try {
    // Check if all product IDs are valid and exist
    const existingProducts = await Product.find({ '_id': { $in: products } });

    if (existingProducts.length !== products.length) {
      throw new Error('One or more products do not exist');
    }

    const newHistory = new ShoppingHistory({ products: existingProducts });
    await newHistory.save();

    return NextResponse.json({ success: true, data: newHistory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
