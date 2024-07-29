import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  unit?: string; // Cantidad de unidades, ejemplo: '200g'
  amount?: number; // Peso o volumen en número
  price?: number;
  category?: string;
  brand?: string; // Marca del producto
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  unit: { type: String }, // Cantidad de unidades, ejemplo: '200g'
  amount: { type: Number }, // Peso o volumen en número
  price: { type: Number },
  category: { type: String },
  brand: { type: String }, // Marca del producto
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
