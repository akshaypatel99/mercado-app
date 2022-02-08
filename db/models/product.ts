import { Schema, Types, model, models } from 'mongoose';

export interface Product {
  user: Types.ObjectId;
  name: String;
  description: String;
  image: String;
  category: String;
  price: Number;
  isSold: Boolean;
}

const productSchema = new Schema<Product>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: '/images/default.webp'
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isSold: {
    type: Boolean,
    required: true,
    default: false
  },
},
  {
    timestamps: true,
  }
)

const ProductModel = models.Product || model<Product>('Product', productSchema);

export default ProductModel;