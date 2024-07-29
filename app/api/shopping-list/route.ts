// app/api/shopping-list/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../lib/mongoose';
import ShoppingListProduct from '../models/ShoppingListProducts'

export async function GET() {
  await dbConnect();
  const shoppingList = await ShoppingListProduct.find();
  return NextResponse.json(shoppingList);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { product } = await req.json();
    console.log('Received product:', product);

    const existingProduct = await ShoppingListProduct.findById(product._id);
    if (existingProduct) {
      console.log('Product already in shopping list:', product._id);
      return NextResponse.json({ message: 'Product already in shopping list' }, { status: 400 });
    } else {
      const newProduct = new ShoppingListProduct({ 
        ...product, 
        purchaseDetails: product.purchaseDetails || '', // Cambia esto si necesitas la propiedad correcta
        isPurchased: false 
      });
      
      console.log('New product to save:', newProduct);
      await newProduct.save();
      console.log('Product saved successfully:', newProduct);
      return NextResponse.json(newProduct, { status: 201 });
    }
  } catch (error) {
    console.error('Error adding product to shopping list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { productId, isPurchased } = await req.json();
    const product = await ShoppingListProduct.findById(productId);
    
    if (product) {
      // Cambiar el estado de isPurchased
      product.isPurchased = isPurchased;
      await product.save();
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating purchase status:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const deletedProduct = await ShoppingListProduct.findByIdAndDelete(productId);
    if (deletedProduct) {
      return NextResponse.json({ message: 'Product deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
