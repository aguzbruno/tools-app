
// app/api/shopping-list/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose';
import ShoppingListProduct from '../../models/ShoppingListProducts'

export async function PATCH(req: NextRequest) {
    await dbConnect();
    const { productId, purchaseDetails } = await req.json();
  
    const product = await ShoppingListProduct.findById(productId);
    if (product) {
      product.purchaseDetails = purchaseDetails; // Actualizar el detalle de compra
      await product.save();
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  }