'use client'
import { createOrder } from '@/actions/order-action'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addressSchema } from '@/lib/validation'
import {
	deleteAllBasket,
	selectBasketSummary,
} from '@/redux/reducers/basketState'
import { RootState } from '@/redux/store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import z from 'zod'

function CheckoutForm() {
	const [loading, setLoading] = useState(false)
	const { userId } = useAuth()
	const router = useRouter()
	const dispatch = useDispatch()
	const basketProducts = useSelector(
		(state: RootState) => state.basket.basketProducts
	)
	const { total } = useSelector(selectBasketSummary)
	console.log(total)

	const form = useForm<z.infer<typeof addressSchema>>({
		resolver: zodResolver(addressSchema),
		defaultValues: {},
	})

	async function onSubmit(values: z.infer<typeof addressSchema>) {
		const { fullName, tel, region, city } = values
		setLoading(true)

		const orderData = {
			fullName,
			tel,
			region,
			city,
			totalPrice: total,
			products: basketProducts.map(product => ({
				product: product._id,
				soni: product.soni,
			})),
		}

		const promise = createOrder(userId!, orderData).then(() => {
			dispatch(deleteAllBasket())
			router.push('/shopping-card/success')
		})
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Buyurtma amalga oshirildi, aloqaga chiqamiz ✅',
			error: 'Unfortunately, the product could not be loaded.',
		})

		setLoading(false)
	}

	return (
		<>
			{loading && 'loading..'}

			<div className='mt-2'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<div className='grid grid-cols-2 gap-2'>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											To`liq ismingiz <span className='text-red-600'>*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder='To`liq ismingiz?' />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='tel'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Telefo`n raqamingiz<span className='text-red-600'>*</span>
										</FormLabel>
										<FormControl>
											<InputMask
												mask='+\9\9\8 (99) 999-99-99'
												placeholder='+998 (__) ___-__-__'
												value={field.value}
												onChange={field.onChange}
											>
												{(
													inputProps: React.InputHTMLAttributes<HTMLInputElement>
												) => <Input {...inputProps} />}
											</InputMask>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-2'>
							<div>
								<FormField
									control={form.control}
									name='region'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Qaysi Viloyatdansiz{' '}
												<span className='text-red-600'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													className='placeholder:text-sm'
													{...field}
													placeholder='Viloyatingiz?'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div>
								<FormField
									control={form.control}
									name='city'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Shahringiz <span className='text-red-600'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='placeholder:text-sm'
													placeholder='Shahar yoki tuman?'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='pt-3'>
							<Button className='bg-blue-600 hover:bg-blue-700 w-full '>
								Buyurtma berish
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}
export default CheckoutForm
