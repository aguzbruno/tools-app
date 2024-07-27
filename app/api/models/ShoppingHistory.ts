// models/ShoppingHistory.ts
import mongoose, { Document, Schema } from 'mongoose';

// models/ShoppingHistory.ts
export interface IShoppingHistory {
    _id: string;
    timestamp: string; // o Date si lo conviertes a tipo Date
    products: string[]; // Asegúrate de que esto sea un array de IDs de productos
  }
  

const ShoppingHistorySchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingListProduct' }]
});

export default mongoose.models.ShoppingHistory || mongoose.model<IShoppingHistory>('ShoppingHistory', ShoppingHistorySchema);
