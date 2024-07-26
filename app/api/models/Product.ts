import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  quantity?: string;
  price?: number;
  category?: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String},
  price: { type: Number },
  category: { type: String },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
