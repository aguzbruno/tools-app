'use client'
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose'
import Product from '../../models/Product'
import { useParams } from 'next/navigation';

export async function GET(req: NextRequest) {
  await dbConnect();
  const id = '66a354ac836c92be598ddbe3'
  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { id } = useParams();
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
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = useParams();
  try {
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (!deletedProduct.deletedCount) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
