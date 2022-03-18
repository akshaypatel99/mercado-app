import { Schema, Types, model, models } from 'mongoose';
export interface User {
  name: String;
  email: String;
  password: String;
  role: String;
  userProducts: [Types.ObjectId];
  userOrders: [Types.ObjectId];
  userWatchlist: [Types.ObjectId];
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
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  userOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  userWatchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
},
  {
    timestamps: true,
  }
)

// const UserModel = model<User>('User', userSchema);

const UserModel = models.User || model<User>('User', userSchema);

export default UserModel;