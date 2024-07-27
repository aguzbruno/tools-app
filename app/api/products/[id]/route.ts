import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose';
import Product from '../../models/Product';

// GET request handler
export async function GET(req: NextRequest, context: any) {
  await dbConnect();
  const { params } = context;
  const { id } = params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

// PUT request handler
export async function PUT(req: NextRequest, context: any) {
  await dbConnect();
  const { params } = context;
  const { id } = params;
  const body = await req.json();

  try {
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
  }
}

// DELETE request handler
export async function DELETE(req: NextRequest, context: any) {
  await dbConnect();
  const { params } = context;
  const { id } = params;
  
  try {
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (!deletedProduct.deletedCount) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
  }
}
