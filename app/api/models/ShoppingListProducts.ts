// models/ShoppingListProduct.js

import mongoose from 'mongoose';

const ShoppingListProductSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ID del producto en la lista de compras
  name: { type: String, required: true }, // Nombre del producto
  unit: { type: String, required: false }, // Unidad del producto (ej: '1 Kg', '1 L')
  amount: { type: String, required: false }, // Peso o volumen, por ejemplo, '200g'
  price: { type: Number, required: false }, // Precio del producto
  category: { type: String, required: false }, // Categoría del producto
  brand: { type: String, required: false }, // Marca del producto
  isPurchased: { type: Boolean, default: false }, // Estado de compra
  purchaseDetails: { type: String, required: false,default: ''  }, // Detalles sobre la compra
}, { timestamps: true }); // Agrega timestamps para crear y actualizar fechas

export default mongoose.models.ShoppingListProduct || mongoose.model('ShoppingListProduct', ShoppingListProductSchema);
