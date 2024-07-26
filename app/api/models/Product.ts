import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  quantity: string;
  price?: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: Number },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
