// 'use client'
// import { createOrder } from '@/actions/order-action'
// import { payment } from '@/actions/stripe-action'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Button } from '@/components/ui/button'
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { dollorKurs, uzsToUsd } from '@/lib/utils'
// import { addressSchema } from '@/lib/validation'
// import {
// 	deleteAllBasket,
// 	selectBasketSummary,
// } from '@/redux/reducers/basketState'
// import { RootState } from '@/redux/store'
// import { useAuth } from '@clerk/nextjs'
// import { zodResolver } from '@hookform/resolvers/zod'
// import {
// 	CardCvcElement,
// 	CardExpiryElement,
// 	CardNumberElement,
// 	useElements,
// 	useStripe,
// } from '@stripe/react-stripe-js'
// import { AlertCircle } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import InputMask from 'react-input-mask'
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'sonner'
// import z from 'zod'

// function CheckoutForm() {
// 	const [loading, setLoading] = useState(false)
// 	const [error, setError] = useState('')
// 	const elements = useElements()
// 	const stripe = useStripe()
// 	const { userId } = useAuth()
// 	const router = useRouter()
// 	const dispatch = useDispatch()
// 	const basketProducts = useSelector(
// 		(state: RootState) => state.basket.basketProducts
// 	)
// 	const { total } = useSelector(selectBasketSummary)
// 	console.log(total)

// 	const cardStyles = {
// 		base: {
// 			color: '#000',
// 			fontSmoothing: 'antialiased',
// 			fontSize: '16px',
// 			'::placeholder': {
// 				color: 'rgba(0,0,0,.5)',
// 				opacity: '0.7',
// 			},
// 		},
// 		invalid: {
// 			color: '#fa755a',
// 			iconColor: '#fa755a',
// 		},
// 	}

// 	const form = useForm<z.infer<typeof addressSchema>>({
// 		resolver: zodResolver(addressSchema),
// 		defaultValues: {},
// 	})

// 	async function onSubmit(values: z.infer<typeof addressSchema>) {
// 		console.log(values)
// 		if (!elements || !stripe) return null
// 		const { fullName, tel, region, city, zip = '100000' } = values
// 		setLoading(true)

// 		const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
// 			type: 'card',
// 			card: elements.getElement(CardNumberElement)!,
// 			billing_details: {
// 				name: fullName,
// 				address: { line1: region, city, postal_code: zip },
// 			},
// 		})
// 		if (pmError) {
// 			setError(pmError.message || 'Payment method error')
// 			setLoading(false)
// 			return
// 		} else {
// 			tolovMaqsadi(paymentMethod.id)
// 		}

// 		async function tolovMaqsadi(paymentMethodId: string) {
// 			if (!elements || !stripe) return null
// 			const price = uzsToUsd(total, dollorKurs)
// 			const client_secret = await payment(userId!, price, paymentMethodId)

// 			const { error, paymentIntent } = await stripe.confirmCardPayment(
// 				client_secret!
// 			) // tolovni rostakasim amalga oshirish uchun'

// 			if (error) {
// 				setError(error.message || 'Payment failed')
// 			} else {
// 				router.push(`/shopping-card/success?pi=${paymentIntent.id}`)
// 				const orderData = {
// 					fullName,
// 					tel,
// 					region,
// 					city,
// 					zip,
// 					totalPrice: total,
// 					products: basketProducts.map(product => ({
// 						product: product._id,
// 						soni: product.soni,
// 					})),
// 				}

// 				const promise = createOrder(userId!, orderData).then(() =>
// 					dispatch(deleteAllBasket())
// 				)
// 				toast.promise(promise, {
// 					loading: 'Loading...',
// 					success: 'Buyurtma amalga oshirildi, aloqaga chiqamiz ✅',
// 					error: 'Unfortunately, the product could not be loaded.',
// 				})
// 			}

// 			setLoading(false)
// 		}
// 	}
// 	return (
// 		<>
// 			{loading && 'loading..'}
// 			{error && (
// 				<Alert variant='destructive' className='mb-4'>
// 					<AlertCircle className='!size-5' />
// 					<AlertTitle>Error</AlertTitle>
// 					<AlertDescription>{error}</AlertDescription>
// 				</Alert>
// 			)}
// 			<div className='flex flex-col mt-4 gap-1'>
// 				<h1 className='font-bold text-sm'>
// 					Kartangizni Kiriting <span className='text-red-600'>*</span>
// 				</h1>

// 				<div className='flex gap-2'>
// 					<div className='w-[60%] rounded-md border bg-secondary px-2 py-3'>
// 						<CardNumberElement
// 							options={{
// 								style: cardStyles,
// 								placeholder: 'XXXX XXXX XXXX XXXX',
// 								showIcon: true,
// 							}}
// 						/>
// 					</div>

// 					<div className='w-[20%] rounded-md border bg-secondary px-2 py-3'>
// 						<CardExpiryElement options={{ style: cardStyles }} />
// 					</div>

// 					<div className='w-[20%] rounded-md border bg-secondary px-2 py-3'>
// 						<CardCvcElement
// 							options={{
// 								style: cardStyles,
// 								placeholder: 'CVC',
// 							}}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 			<div className='mt-2'>
// 				<Form {...form}>
// 					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
// 						<div className='grid grid-cols-2 gap-2'>
// 							<FormField
// 								control={form.control}
// 								name='fullName'
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>
// 											To`liq ismingiz <span className='text-red-600'>*</span>
// 										</FormLabel>
// 										<FormControl>
// 											<Input {...field} placeholder='To`liq ismingiz?' />
// 										</FormControl>
// 									</FormItem>
// 								)}
// 							/>
// 							<FormField
// 								control={form.control}
// 								name='tel'
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>
// 											Telefo`n raqamingiz<span className='text-red-600'>*</span>
// 										</FormLabel>
// 										<FormControl>
// 											<InputMask
// 												mask='+\9\9\8 (99) 999-99-99'
// 												placeholder='+998 (__) ___-__-__'
// 												value={field.value}
// 												onChange={field.onChange}
// 											>
// 												{(
// 													inputProps: React.InputHTMLAttributes<HTMLInputElement>
// 												) => <Input {...inputProps} />}
// 											</InputMask>
// 										</FormControl>
// 									</FormItem>
// 								)}
// 							/>
// 						</div>
// 						<FormField
// 							control={form.control}
// 							name='region'
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>
// 										Qaysi Viloyatdansiz <span className='text-red-600'>*</span>
// 									</FormLabel>
// 									<FormControl>
// 										<Input {...field} placeholder='Qaysi viloyatdansiz?' />
// 									</FormControl>
// 								</FormItem>
// 							)}
// 						/>
// 						<div className='grid grid-cols-2 gap-2'>
// 							<div>
// 								<FormField
// 									control={form.control}
// 									name='city'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>
// 												Shahringiz <span className='text-red-600'>*</span>
// 											</FormLabel>
// 											<FormControl>
// 												<Input
// 													{...field}
// 													placeholder='Qaysi shahardan yoki qaysi qishloqdansiz?'
// 												/>
// 											</FormControl>
// 										</FormItem>
// 									)}
// 								/>
// 							</div>
// 							<div>
// 								<FormField
// 									control={form.control}
// 									name='zip'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>
// 												Po`chta indeksi<span className='text-red-600'>*</span>
// 											</FormLabel>
// 											<FormControl>
// 												<Input {...field} placeholder='Zip parol?' />
// 											</FormControl>
// 										</FormItem>
// 									)}
// 								/>
// 							</div>
// 						</div>
// 						<div className='flex justify-end'>
// 							<Button className='bg-blue-600 hover:bg-blue-700'>To`lash</Button>
// 						</div>
// 					</form>
// 				</Form>
// 			</div>
// 		</>
// 	)
// }

// export default CheckoutForm
