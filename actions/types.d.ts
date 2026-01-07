export interface ICreateUser {
	clerkId: string
	fullName: string
	email: string
	picture: string
}
export interface IUpdateUser {
	clerkId: string
	updatedData: {
		fullName: string
		email: string
		picture: string
	}
}

export interface ICreateProduct {
	name: string
	category: string
	description: string
	brand: string
	price: number
	top?: boolean
	discount?: boolean
	percent?: number
	images: string[]
}

export interface getAllProductsParams {
	page?: number
	pageSize?: number
	filter?: string
	searchQuery?: string
}
export interface getReviewsAdminTip {
	clerkId: string
	page?: number
	pageSize?: number
}
export interface getAdminProductsParams {
	clerkId: string
	page?: number
	pageSize?: number
	filter?: string
}

export interface createOrderProps {
	fullName: string
	tel: string
	region: string
	city: string
	totalPrice: number
	products: { product: string; soni: number }[]
}
