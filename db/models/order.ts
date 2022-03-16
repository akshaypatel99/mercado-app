import { Schema, Types, model, models } from 'mongoose';
export interface Order {
	user: Types.ObjectId
	product: Types.ObjectId
	subTotal: Number
	deliveryCost: Number
	platformFee: Number
	totalCost: Number
	deliveryAddress: {
		name: String
		street: String
		city: String
		postcode: String
	}
	paymentResult: {
		id: String
		status: String
		emailAddress: String
	}
	isPaid: Boolean
	paidAt: Date
}

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		product: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Product',
		},
		subTotal: {
			type: Number,
			required: true,
			default: 0.0,
		},
		deliveryCost: {
			type: Number,
			required: true,
			default: 0.0,
		},
		platformFee: {
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
			name: {
				type: String,
				required: true,
			},
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
		paymentResult: {
			id: {
				type: String,
			},
			status: {
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

const OrderModel = models.Order || model<Order>('Order', orderSchema);

export default OrderModel;
