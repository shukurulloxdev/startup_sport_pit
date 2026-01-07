'use client'

import { z } from 'zod'

export const ContactSchema = z.object({
	message: z.string().min(20),
	email: z.string().email(),
	name: z.string().min(3),
})

export const createProductSchema = z
	.object({
		name: z.string().min(5),
		category: z.string(),
		description: z.string().min(10),
		brand: z.string(),
		price: z.string(),
		top: z.boolean().optional(),
		discount: z.boolean().optional(),
		percent: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (
			data.discount === true &&
			(!data.percent || data.percent.trim() === '')
		) {
			ctx.addIssue({
				code: 'custom',
				path: ['percent'], // xatoni qaysi fieldga yozish
				message: 'Discount tanlansa, percent majburiy',
			})
		}
	})

export const nameEndCategorySchema = z.object({
	name: z.string().min(5),
	category: z.string(),
})
export const descriptionSchema = z.object({
	description: z.string().min(20),
})
export const priceEndBrendSchema = z.object({
	brand: z.string(),
	price: z.string(),
})
export const topEndDiscountSchema = z.object({
	top: z.boolean().optional(),
	discount: z.boolean().optional(),
	percent: z.string().optional(),
})
export const reviewSchema = z.object({
	data: z.string().min(3),
})

export const addressSchema = z.object({
	fullName: z.string(),
	tel: z.string(),
	region: z.string(),
	city: z.string(),
})
