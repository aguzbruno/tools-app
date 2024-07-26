// app/api/shopping-list/clear/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose';
import ShoppingListProduct from '../../models/ShoppingListProducts';

export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    await ShoppingListProduct.deleteMany({});
    return NextResponse.json({ message: 'All products deleted successfully' });
  } catch (error) {
    console.error('Error deleting all products:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
