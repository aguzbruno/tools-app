// models/ShoppingListProduct.js

import mongoose from 'mongoose';

const ShoppingListProductSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Asegúrate de que el _id sea del tipo correcto
    name: { type: String, required: true },
    quantity: { type: String, default: 1 },
    price: { type: Number, required: false },
    category: { type: String, required: false },
    isPurchased: { type: Boolean, default: false },
  });

export default mongoose.models.ShoppingListProduct || mongoose.model('ShoppingListProduct', ShoppingListProductSchema);
