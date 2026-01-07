import { model, models, Schema } from 'mongoose'

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		fullName: String,
		tel: String,
		region: String,
		city: String,
		totalPrice: Number,
		sent: { type: Boolean, default: false },
		products: [
			{
				product: { type: Schema.Types.ObjectId, ref: 'Product' },
				soni: Number,
			},
		],
	},
	{ timestamps: true }
)

const Order = models?.Order || model('Order', orderSchema)

export default Order
