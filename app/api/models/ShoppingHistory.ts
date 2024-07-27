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
});

const ShoppingHistory = models.ShoppingHistory || model('ShoppingHistory', ShoppingHistorySchema);

export default ShoppingHistory;
