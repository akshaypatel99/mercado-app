import { Schema, Types, model } from 'mongoose';
export interface User {
  name: String;
  email: String;
  password: String;
  role: String;
  userProducts: { product: Types.ObjectId }[];
  userOrders: { order: Types.ObjectId }[];
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
  },
  userProducts: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    }
  ],
  userOrders: [
    {
      order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    }
  ],
},
  {
    timestamps: true,
  }
)

const UserModel = model<User>('User', userSchema);

export default UserModel;