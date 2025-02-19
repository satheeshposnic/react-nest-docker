import { Schema, Document } from 'mongoose';

export const SaleSchema = new Schema({
  time: { type: Date, required: true }, // Timestamp of the sale
  description: { type: String, required: true }, // Sale description
  items: [
    {
      name: { type: String, required: true }, // Name of the item sold
      quantity: { type: Number, required: true }, // Quantity sold
      total: { type: Number, required: true }, // Total price for this item
    },
  ],
  total: { type: Number, required: true }, // Total sale amount
});

export interface Sale extends Document {
  time: Date;
  description: string;
  items: {
    name: string;
    quantity: number;
    total: number;
  }[];
  total: number;
}
