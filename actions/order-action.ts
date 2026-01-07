'use server'

import Order from '@/datebase/order-model'
import Product from '@/datebase/product-model'
import User from '@/datebase/user-model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { createOrderProps } from './types'

export async function createOrder(clerkId: string, info: createOrderProps) {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId })
		await Order.create({ user: user._id, ...info })
	} catch (err) {
		console.log(err)
	}
}

export async function getOrders() {
	try {
		await connectToDatabase()

		const orders = await Order.find()
			.populate({
				path: 'products.product',
				model: Product, // products ichidagi product ni populate qilamiz
				select: 'name images price percent', // faqat kerakli fieldlar
			})
			.populate({
				path: 'user',
				model: User, // agar user ma’lumotlari ham kerak bo‘lsa
				select: 'picture email',
			})

		return JSON.parse(JSON.stringify(orders))
	} catch (error) {
		console.log('❌ getOrders error:', error)
		throw new Error('Ordersni olishda xato')
	}
}

export async function getOrdersByStatistik() {
	try {
		await connectToDatabase()

		const orders = await Order.find()
			.populate({
				path: 'products.product',
				model: Product, // products ichidagi product ni populate qilamiz
			})
			.populate({
				path: 'user',
				model: User, // agar user ma’lumotlari ham kerak bo‘lsa
				select: 'picture email',
			})

		return JSON.parse(JSON.stringify(orders))
	} catch (error) {
		console.log('❌ getOrders error:', error)
		throw new Error('Ordersni olishda xato')
	}
}

export async function orderSented(_id: string, path: string) {
	try {
		await connectToDatabase()
		await Order.findByIdAndUpdate(_id, { sent: true })
		revalidatePath(path)
	} catch (error) {
		console.log('❌ getOrders error:', error)
		throw new Error('Ordersni olishda xato')
	}
}

export async function getTotalOrders() {
	try {
		await connectToDatabase()
		const orders = await Order.find().select('totalPrice')
		const total = await Order.find().countDocuments()
		return { total, orders }
	} catch (error) {
		console.log('❌ getOrders error:', error)
		throw new Error('Ordersni olishda xato')
	}
}
