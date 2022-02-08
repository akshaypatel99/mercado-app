import { Schema, Types, model } from 'mongoose';
export interface Order {
	user: Types.ObjectId;
	orderItems: Types.ObjectId[];
	orderTotal: Number;
	deliveryCost: Number
	totalCost: Number
	deliveryAddress: {
		street: String
		city: String
		postcode: String
	}
	deliveryDate: Date
	paymentResult: {
		id: String
		status: String
		updatedAt: String
		emailAddress: String
	}
	isPaid: Boolean
	paidAt: Date
  created_at: Date;
  updated_at: Date;
}

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				product: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		orderTotal: {
			type: Number,
			required: true,
			default: 0.0,
		},
		deliveryCost: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalCost: {
			type: Number,
			required: true,
			default: 0.0,
		},
		deliveryAddress: {
			street: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			postcode: {
				type: String,
				required: true,
			},
		},
		deliveryDate: {
			type: Date,
			required: true,
		},
		paymentResult: {
			id: {
				type: String,
			},
			status: {
				type: String,
			},
			update_time: {
				type: String,
			},
			email_address: {
				type: String,
			},
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const OrderModel = model('Order', orderSchema);

export default OrderModel;
