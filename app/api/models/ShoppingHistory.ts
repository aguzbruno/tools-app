import { Schema, model, models } from 'mongoose';

const ShoppingHistorySchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: false, // Si no es obligatorio, puedes omitir esta línea o dejarla como false.
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const ShoppingHistory = models.ShoppingHistory || model('ShoppingHistory', ShoppingHistorySchema);

export default ShoppingHistory;
