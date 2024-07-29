// app/api/shopping-list/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose';
import ShoppingListProduct from '../../models/ShoppingListProducts'


export async function PATCH(req: NextRequest) {
    await dbConnect();
  
    try {
      const { productId, amount } = await req.json();
      const product = await ShoppingListProduct.findById(productId);
      
      if (product) {
        // Actualizar la cantidad (amount)
        product.amount = amount;
        await product.save();
        return NextResponse.json(product);
      } else {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error updating product amount:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
  